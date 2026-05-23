import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const OLD_URL = "https://dcpiaxthklwkoaukycdp.supabase.co";
const exactKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRjcGlheHRoa2x3a29hdWt5Y2RwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk2ODE2NzcsImV4cCI6MjA3NTI1NzY3N30.GaFdt7zb1ZLRHZzqsXJWSZAxEuiZTPnAOvJjElH8X3w";

const supabase = createClient(OLD_URL, exactKey);

async function main() {
  console.log("Fetching data from old Supabase...");
  
  let sql = "";

  // 1. Fetch gallery_images
  try {
    const { data, error } = await supabase.from('gallery_images').select('*');
    if (error) throw error;
    
    if (data && data.length > 0) {
      sql += `-- Seeding gallery_images (${data.length} records)\n`;
      sql += `INSERT INTO public.gallery_images (id, category, image_url, title, description, uploaded_by, created_at, updated_at)\nVALUES\n`;
      const rows = data.map(row => {
        return `  ('${row.id}', '${row.category.replace(/'/g, "''")}', '${row.image_url}', ${row.title ? `'${row.title.replace(/'/g, "''")}'` : 'NULL'}, ${row.description ? `'${row.description.replace(/'/g, "''")}'` : 'NULL'}, ${row.uploaded_by ? `'${row.uploaded_by}'` : 'NULL'}, '${row.created_at}', '${row.updated_at}')`;
      });
      sql += rows.join(",\n") + "\nON CONFLICT (id) DO UPDATE SET\n  category = EXCLUDED.category,\n  image_url = EXCLUDED.image_url,\n  title = EXCLUDED.title,\n  description = EXCLUDED.description;\n\n";
    }
  } catch (err) {
    console.error("Error fetching gallery images:", err);
  }

  // 2. Fetch reviews
  try {
    const { data, error } = await supabase.from('reviews').select('*');
    if (error) throw error;
    
    if (data && data.length > 0) {
      sql += `-- Seeding reviews (${data.length} records)\n`;
      sql += `INSERT INTO public.reviews (id, customer_name, rating, comment, is_featured, is_approved, created_at, updated_at)\nVALUES\n`;
      const rows = data.map(row => {
        return `  ('${row.id}', '${row.customer_name.replace(/'/g, "''")}', ${row.rating}, '${row.comment.replace(/'/g, "''")}', ${row.is_featured}, ${row.is_approved}, '${row.created_at}', '${row.updated_at}')`;
      });
      sql += rows.join(",\n") + "\nON CONFLICT (id) DO UPDATE SET\n  customer_name = EXCLUDED.customer_name,\n  rating = EXCLUDED.rating,\n  comment = EXCLUDED.comment,\n  is_featured = EXCLUDED.is_featured,\n  is_approved = EXCLUDED.is_approved;\n\n";
    }
  } catch (err) {
    console.error("Error fetching reviews:", err);
  }

  // 3. Fetch contact_inquiries
  try {
    const { data, error } = await supabase.from('contact_inquiries').select('*');
    if (error) throw error;
    
    if (data && data.length > 0) {
      sql += `-- Seeding contact_inquiries (${data.length} records)\n`;
      sql += `INSERT INTO public.contact_inquiries (id, name, email, message, status, created_at)\nVALUES\n`;
      const rows = data.map(row => {
        return `  ('${row.id}', '${row.name.replace(/'/g, "''")}', '${row.email.replace(/'/g, "''")}', '${row.message.replace(/'/g, "''")}', '${row.status}', '${row.created_at}')`;
      });
      sql += rows.join(",\n") + "\nON CONFLICT (id) DO UPDATE SET\n  name = EXCLUDED.name,\n  email = EXCLUDED.email,\n  message = EXCLUDED.message,\n  status = EXCLUDED.status;\n\n";
    }
  } catch (err) {
    console.error("Error fetching inquiries:", err);
  }

  fs.writeFileSync("old_data_seed.sql", sql);
  console.log("SQL script written to old_data_seed.sql successfully!");
}

main();
