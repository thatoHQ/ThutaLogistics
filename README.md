# Thuta Logistics

Thuta Logistics is a comprehensive fleet management and logistics tracking platform. It provides an end-to-end digital workflow for requesting quotes, assigning drivers, reporting vehicle maintenance, and tracking active shipments via real-time map integration.

## Architecture

The application is built using a modern React frontend and a Supabase backend. It relies on standard CSS for styling rather than utility frameworks, ensuring high performance for complex layouts and glassmorphic UI elements.

- Frontend Framework: React (Vite)
- State Management: React Context API
- Routing: React Router v6 (Role-based access control)
- Backend & Auth: Supabase (PostgreSQL, Realtime subscriptions)
- Mapping: Mapbox GL JS

## Features

- Public Portals: Landing page with responsive bento-grid layouts and a vertical parallax services showcase.
- Role-based Dashboards: Dedicated interfaces for Administrators, Clients, and Drivers.
- Real-time Tracking: Mapbox integration displaying active routes, driver coordinates, and shipment statuses.
- Automated Cascading Statuses: Integrated fault reporting that automatically cascades delays to associated shipments and grounds vehicles until maintenance is resolved.
- Instant Quoting: Haversine distance-based quote estimator with dynamic pricing algorithms.

## Local Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Environment Variables:
   Create a `.env` file in the root directory and add your keys:
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   VITE_MAPBOX_TOKEN=your_mapbox_token
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## Database Initialization

The platform requires a specific Supabase PostgreSQL schema to operate correctly. The initialization scripts and Row Level Security (RLS) policies are provided in the documentation and must be executed in the Supabase SQL editor prior to production deployment.
