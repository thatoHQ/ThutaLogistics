import { useState, useMemo, useEffect } from 'react';
import Map, { Marker, NavigationControl, Popup, Source, Layer } from 'react-map-gl/mapbox';
import { Truck } from 'lucide-react';
import { useAuth } from '../../AuthContext';
import { useLogistics } from '../../LogisticsContext';
import { HUB_COORDINATES } from '../../utils/coordinates';
import 'mapbox-gl/dist/mapbox-gl.css';

// Token provided by user via env
const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

export default function MapView() {
  const { user } = useAuth();
  const { quotes } = useLogistics();
  
  const [viewState, setViewState] = useState({
    longitude: 26.5,
    latitude: -29.0,
    zoom: 5,
    pitch: 45,
    bearing: -10
  });
  
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [routesData, setRoutesData] = useState({});

  // Get active shipments
  const activeShipments = useMemo(() => {
    let relevantQuotes = quotes.filter(q => q.status === 'In Transit' || q.status === 'Delayed (Maintenance)'); // Default Admin view
    if (user?.role === 'user') {
      relevantQuotes = quotes.filter(q => (q.status === 'In Transit' || q.status === 'Delayed (Maintenance)' || q.status === 'Approved & Assigned') && q.user_id === user.id);
    } else if (user?.role === 'driver') {
      relevantQuotes = quotes.filter(q => (q.status === 'In Transit' || q.status === 'Delayed (Maintenance)' || q.status === 'Approved & Assigned') && q.driver_id === user.id);
    }
    return relevantQuotes.map(q => {
      const originCoords = HUB_COORDINATES[q.origin] || [28.0473, -26.2041];
      const destCoords = HUB_COORDINATES[q.destination] || [31.0218, -29.8587];
      return {
        ...q,
        originCoords,
        destCoords
      };
    });
  }, [quotes, user]);

  useEffect(() => {
    const fetchRoutes = async () => {
      const newRoutesData = { ...routesData };
      let updated = false;

      for (let shipment of activeShipments) {
        if (newRoutesData[shipment.id]) continue; // Already fetched
        
        try {
          const res = await fetch(`https://api.mapbox.com/directions/v5/mapbox/driving/${shipment.originCoords[0]},${shipment.originCoords[1]};${shipment.destCoords[0]},${shipment.destCoords[1]}?geometries=geojson&access_token=${MAPBOX_TOKEN}`);
          const data = await res.json();
          if (data.routes && data.routes.length > 0) {
            newRoutesData[shipment.id] = data.routes[0].geometry;
            updated = true;
          }
        } catch (e) {
           console.error("Mapbox routing error:", e);
        }
      }
      if (updated) {
        setRoutesData(newRoutesData);
      }
    };

    if (activeShipments.length > 0) fetchRoutes();
  }, [activeShipments]);

  return (
    <div style={{ flex: 1, height: 'calc(100vh - 65px)', position: 'relative' }}>
      <Map
        {...viewState}
        onMove={evt => setViewState(evt.viewState)}
        mapStyle="mapbox://styles/mapbox/dark-v11"
        mapboxAccessToken={MAPBOX_TOKEN}
        terrain={{ source: 'mapbox-dem', exaggeration: 1.5 }}
      >
        {activeShipments.map(shipment => (
          <Source 
            key={`route-${shipment.id}`}
            id={`route-${shipment.id}`} 
            type="geojson" 
            data={{
              type: 'Feature',
              properties: {},
              geometry: routesData[shipment.id] || {
                type: 'LineString',
                coordinates: [shipment.originCoords, shipment.destCoords]
              }
            }}
          >
            <Layer 
              id={`route-line-${shipment.id}`} 
              type="line" 
              source={`route-${shipment.id}`}
              layout={{
                'line-join': 'round',
                'line-cap': 'round'
              }}
              paint={{
                'line-color': shipment.status === 'Delayed (Maintenance)' ? '#ef4444' : '#3b82f6',
                'line-width': 5,
                'line-dasharray': routesData[shipment.id] ? undefined : [2, 2] // Solid if real route
              }} 
            />
          </Source>
        ))}

        {activeShipments.map(shipment => (
          <Marker 
            key={`marker-${shipment.id}`} 
            longitude={shipment.originCoords[0]} 
            latitude={shipment.originCoords[1]}
            anchor="center"
          >
            <div 
              onClick={(e) => {
                e.stopPropagation();
                setSelectedMarker(shipment);
              }}
              style={{ 
                background: 'white',
                padding: '0.4rem', 
                borderRadius: '50%',
                border: `2px solid var(--primary)`,
                boxShadow: '0 4px 6px rgba(0,0,0,0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                width: '48px',
                height: '48px'
              }} 
              title={shipment.vehicle_id}
            >
              <img src="/boxtruck.png" alt="Truck" style={{ width: '100%', height: '100%', objectFit: 'contain', transform: 'rotate(-20deg)' }} />
            </div>
          </Marker>
        ))}

        {selectedMarker && (
          <Popup
            anchor="top"
            longitude={selectedMarker.originCoords[0]}
            latitude={selectedMarker.originCoords[1]}
            onClose={() => setSelectedMarker(null)}
            closeOnClick={false}
            style={{ padding: '0.5rem' }}
          >
            <div style={{ color: 'var(--black)' }}>
              <h4 className="font-bold border-b pb-2 mb-2">{selectedMarker.vehicle_id || 'Pending Assignment'}</h4>
              <div className="text-sm">
                <span className="font-bold">ID:</span> {selectedMarker.tracking_id}
              </div>
              <div className="text-sm">
                <span className="font-bold">Driver ID:</span> {selectedMarker.driver_id || 'Pending'}
              </div>
              <div className="text-sm">
                <span className="font-bold">Dest:</span> {selectedMarker.destination}
              </div>
              <div className="text-sm">
                <span className="font-bold">Status:</span> {selectedMarker.status}
              </div>
            </div>
          </Popup>
        )}

        <NavigationControl position="bottom-right" />
      </Map>
      
      <div style={{ 
        position: 'absolute', 
        top: '1rem', 
        left: '1rem', 
        background: 'rgba(0,0,0,0.8)', 
        color: 'white', 
        padding: '1rem', 
        borderRadius: '8px',
        zIndex: 10
      }}>
        <h3 className="font-bold text-lg">{user?.role === 'admin' ? 'Active Fleet Tracker' : 'My Shipments Tracker'}</h3>
        <p className="text-sm text-secondary">
          {activeShipments.length} Active Route(s)
        </p>
      </div>
    </div>
  );
}
