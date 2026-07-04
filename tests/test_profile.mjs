import * as dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../.env') });
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function testFetchProfile() {
  console.log("Attempting login...");
  const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
    email: process.env.ADMIN_EMAIL,
    password: process.env.ADMIN_PASSWORD
  });
  
  if (authError) {
    console.error("Auth failed:", authError);
    return;
  }
  
  console.log("Logged in. User ID:", authData.user.id);
  
  console.log("Fetching profile...");
  const { data: profileData, error: profileError } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', authData.user.id)
    .single();
    
  if (profileError) {
    console.error("Profile fetch failed:", profileError);
  } else {
    console.log("Profile data:", profileData);
  }
}

testFetchProfile();
