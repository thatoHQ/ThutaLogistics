import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { supabase } from './lib/supabaseClient';
import { useAuth } from './AuthContext';

const LogisticsContext = createContext();

export function LogisticsProvider({ children }) {
  const { user } = useAuth();
  const [quotes, setQuotes] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [clients, setClients] = useState([]);
  const [faults, setFaults] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all initial data
  const fetchData = async () => {
    setLoading(true);
    
    // Only fetch full user lists and faults if admin
    if (user?.role === 'admin') {
      const { data: driversData } = await supabase.from('profiles').select('*').eq('role', 'driver');
      const { data: clientsData } = await supabase.from('profiles').select('*').eq('role', 'user');
      const { data: faultsData } = await supabase.from('faults').select('*').order('created_at', { ascending: false });
      
      if (driversData) setDrivers(driversData);
      if (clientsData) setClients(clientsData);
      if (faultsData) setFaults(faultsData);
    }
    
    const { data: vehiclesData } = await supabase.from('vehicles').select('*');
    
    // Limit quotes to prevent over-fetching
    const { data: quotesData } = await supabase.from('quotes').select('*').order('created_at', { ascending: false }).limit(100);

    if (vehiclesData) setVehicles(vehiclesData);
    if (quotesData) setQuotes(quotesData);
    
    setLoading(false);
  };

  useEffect(() => {
    fetchData();

    // Subscribe to realtime changes
    const quotesSub = supabase.channel('quotes_channel')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'quotes' }, fetchData)
      .subscribe();
      
    const vehiclesSub = supabase.channel('vehicles_channel')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'vehicles' }, fetchData)
      .subscribe();
      
    const faultsSub = supabase.channel('faults_channel')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'faults' }, fetchData)
      .subscribe();

    return () => {
      supabase.removeChannel(quotesSub);
      supabase.removeChannel(vehiclesSub);
      supabase.removeChannel(faultsSub);
    };
  }, [user?.role]); // Re-fetch when user role changes (e.g. login)

  const generateId = (prefix) => prefix + '-' + Math.random().toString(36).substr(2, 6).toUpperCase();

  const requestQuote = async (quoteDetails) => {
    const trackingId = generateId('Q');
    const newQuote = {
      tracking_id: trackingId,
      user_id: quoteDetails.userId,
      origin: quoteDetails.origin,
      destination: quoteDetails.destination,
      truck_type: quoteDetails.truckType,
      cargo_weight: quoteDetails.cargoWeight,
      price: quoteDetails.price,
      status: 'Awaiting Admin Approval'
    };
    
    // Optimistic UI Update
    setQuotes(prev => [{ ...newQuote, id: 'temp-'+trackingId }, ...prev]);

    const { error } = await supabase.from('quotes').insert([newQuote]);
    if (error) {
      toast.error('Failed to request quote');
    } else {
      toast.success('Quote requested successfully');
    }
    
    await fetchData();
    return trackingId;
  };

  const approveQuote = async (id, driverId, vehicleId) => {
    const { error } = await supabase.rpc('approve_quote', {
      p_quote_id: id,
      p_driver_id: driverId,
      p_vehicle_id: vehicleId
    });
    
    if (error) {
      console.error("Failed to approve quote:", error);
      toast.error(error.message || "Failed to approve quote.");
      return;
    }
    
    toast.success('Quote approved and driver assigned!');
    await fetchData();
  };

  const rejectQuote = async (id) => {
    await supabase.from('quotes').update({ status: 'Rejected' }).eq('id', id);
    await fetchData();
  };

  const updateQuoteStatus = async (id, newStatus) => {
    const quote = quotes.find(q => q.id === id);
    if (!quote) return;

    const { error } = await supabase.from('quotes').update({ status: newStatus }).eq('id', id);
    
    if (error) {
      toast.error(`Failed to update status to ${newStatus}`);
      return;
    } else {
      toast.success(`Quote status updated to ${newStatus}`);
    }

    if (newStatus === 'Delivered' && quote.vehicle_id) {
      const hasActiveFault = faults.some(f => f.vehicle_id === quote.vehicle_id && f.status === 'Active');
      await supabase.from('vehicles').update({ 
        status: hasActiveFault ? 'Maintenance' : 'Available' 
      }).eq('id', quote.vehicle_id);
    }
    
    await fetchData();
  };

  const reportFault = async (vehicleId, severity, description) => {
    const newFault = {
      vehicle_id: vehicleId,
      severity,
      description,
      status: 'Active'
    };
    
    const { error } = await supabase.from('faults').insert([newFault]);
    if (error) {
      toast.error('Failed to report fault');
      return;
    }
    
    await supabase.from('vehicles').update({ status: 'Maintenance' }).eq('id', vehicleId);
    toast.success('Vehicle reported for maintenance');
    
    // Status Cascading: Pause the active trip
    const activeQuote = quotes.find(q => q.vehicle_id === vehicleId && (q.status === 'In Transit' || q.status === 'Approved & Assigned'));
    if (activeQuote) {
      await supabase.from('quotes').update({ status: 'Delayed (Maintenance)' }).eq('id', activeQuote.id);
    }
    
    await fetchData();
  };

  const resolveFault = async (faultId, vehicleId) => {
     await supabase.from('faults').update({ status: 'Resolved' }).eq('id', faultId);
     
     // Check if there are other active faults for this vehicle
     const otherFaults = faults.filter(f => f.vehicle_id === vehicleId && f.status === 'Active' && f.id !== faultId);
     if (otherFaults.length === 0) {
       await supabase.from('vehicles').update({ status: 'Available' }).eq('id', vehicleId);
       
       // Status Cascading: Resume the delayed trip
       const delayedQuote = quotes.find(q => q.vehicle_id === vehicleId && q.status === 'Delayed (Maintenance)');
       if (delayedQuote) {
         await supabase.from('quotes').update({ status: 'In Transit' }).eq('id', delayedQuote.id);
       }
     }
     
     await fetchData();
  };

  return (
    <LogisticsContext.Provider value={{ 
      quotes, vehicles, drivers, clients, faults, 
      requestQuote, approveQuote, rejectQuote, updateQuoteStatus, 
      reportFault, resolveFault, loading 
    }}>
      {children}
    </LogisticsContext.Provider>
  );
}

export const useLogistics = () => useContext(LogisticsContext);
