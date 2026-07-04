import * as dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../.env') });
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function fixProfile() {
  console.log("Fixing admin profile...");
  const { data, error } = await supabase.from('profiles').upsert([
    { id: '073d9a9a-a29c-48a5-a158-6e5910547dc9', role: 'admin', full_name: 'Thuta Admin' }
  ]);
  
  if (error) {
    console.error("Upsert failed:", error);
  } else {
    console.log("Admin profile fixed!", data);
  }
}

fixProfile();
