
// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://lqfwwmvzopbmmoyoxcih.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxxZnd3bXZ6b3BibW1veW94Y2loIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI4NjA2NzIsImV4cCI6MjA1ODQzNjY3Mn0.RxSN14jj659qA9J65xFs6M5rhfTDYXdzZo2B8Lwe98w";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
