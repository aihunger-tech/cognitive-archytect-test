// lib/supabase.ts
import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// This is a "Mock Client" that prevents the app from crashing if keys are missing.
// It mimics the structure of the real Supabase client.
const mockClient = {
    from: () => ({
        insert: async () => ({ error: { message: "Supabase URL/Key missing. Data not saved." } }),
        select: async () => ({ error: { message: "Supabase URL/Key missing." } }),
    }),
} as unknown as SupabaseClient;

// We initialize the client only if both variables exist.
// Otherwise, we return the mockClient.
export const supabase = (supabaseUrl && supabaseAnonKey) 
    ? createClient(supabaseUrl, supabaseAnonKey) 
    : mockClient;

if (!supabaseUrl || !supabaseAnonKey) {
    console.error(
        "⚠️ WARNING: Supabase environment variables are missing. " +
        "The app will not crash, but data will not be saved to the database. " +
        "Check your .env.local file."
    );
}
