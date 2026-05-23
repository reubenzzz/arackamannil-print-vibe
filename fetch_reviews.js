import { createClient } from '@supabase/supabase-js';

const URL = "https://memvhcpbckevqmwsjuxd.supabase.co";
const KEY = "sb_publishable_NLXFCMcRkjpjaF74R2rqJw_LFxBfDJa";

const supabase = createClient(URL, KEY);

async function main() {
  console.log("Querying reviews from live Supabase...");
  try {
    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .eq('is_approved', true);
      
    if (error) throw error;
    
    console.log("Fetched approved reviews:", JSON.stringify(data, null, 2));
  } catch (err) {
    console.error("Error querying reviews:", err);
  }
}

main();
