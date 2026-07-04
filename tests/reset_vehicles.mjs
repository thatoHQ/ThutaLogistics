import * as dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../.env') });
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function resetVehicles() {
  const { data, error } = await supabase.from('vehicles').update({ status: 'Available' }).neq('status', 'Available');
  console.log("Reset vehicles result:", data);
  if (error) console.error(error);
}

resetVehicles();
