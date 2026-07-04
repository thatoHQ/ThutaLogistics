import * as dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const url = `${process.env.VITE_SUPABASE_URL}/auth/v1/token?grant_type=password`;
const apiKey = process.env.VITE_SUPABASE_ANON_KEY;

async function run() {
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'apikey': apiKey,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASSWORD
    })
  });
  
  console.log("Status:", res.status);
  console.log("Headers:", JSON.stringify(Object.fromEntries(res.headers.entries()), null, 2));
  const text = await res.text();
  console.log("Body:", text);
}

run();
