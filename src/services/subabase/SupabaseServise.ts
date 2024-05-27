import {createClient} from "@supabase/supabase-js";


const supabaseUrl:string = "https://vfntlggzzitdrbeusznx.supabase.co"
const supabaseKey:string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZmbnRsZ2d6eml0ZHJiZXVzem54Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQxNjY5MzIsImV4cCI6MjAyOTc0MjkzMn0.qkN7Q0R87J-6HJO-GUu6cfqC-poluP89nEGGkrm5Dbw"
export const supabase = createClient(supabaseUrl,supabaseKey)