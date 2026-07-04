import * as dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../.env') });
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function testAuth() {
  console.log("Attempting login...");
  const { data, error } = await supabase.auth.signInWithPassword({
    email: process.env.ADMIN_EMAIL,
    password: process.env.ADMIN_PASSWORD
  });
  
  if (error) {
    console.log("Error object:", error);
    console.log("Error message:", error.message);
    console.log("Error name:", error.name);
    console.log("Error status:", error.status);
    console.log("Stringified:", JSON.stringify(error));
  } else {
    console.log("Success! Data:", data);
  }
}

testAuth();
