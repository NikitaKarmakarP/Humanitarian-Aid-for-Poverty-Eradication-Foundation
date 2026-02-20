import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// If we're missing keys, we shouldn't crash at build time (prerendering)
// But we should throw a clear error if they're actually needed at runtime
if (!supabaseUrl || !supabaseAnonKey) {
    if (process.env.NODE_ENV === 'production' && !process.env.NEXT_PHASE) {
        // Only warn during build
        console.warn('⚠️ Supabase environment variables are missing. Prerendering may be affected.')
    }
}

export const supabase = createClient(
    supabaseUrl || 'https://placeholder.supabase.co',
    supabaseAnonKey || 'placeholder-key'
)
