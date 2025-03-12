import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://ijabupxwubybtwjlbmea.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlqYWJ1cHh3dWJ5YnR3amxibWVhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA3MzQwMjAsImV4cCI6MjA1NjMxMDAyMH0.PMeZzA5JaY6uoK-0Y9ygE--Zl35xtN69EesU3pS3YGY";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
