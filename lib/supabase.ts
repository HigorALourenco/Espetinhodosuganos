import { createClient } from "@supabase/supabase-js"
import type { Database } from "@/types/database"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Verificar se as variáveis existem
const hasSupabaseConfig = supabaseUrl && supabaseAnonKey

export const supabase = hasSupabaseConfig
  ? createClient<Database>(supabaseUrl, supabaseAnonKey, {
      realtime: {
        params: {
          eventsPerSecond: 10,
        },
      },
    })
  : null

// Flag para verificar se Supabase está disponível
export const isSupabaseEnabled = !!supabase

if (!hasSupabaseConfig) {
  console.warn(
    "🟡 Supabase não configurado. Usando localStorage como fallback.\n" +
      "Para habilitar sincronização global, defina:\n" +
      "- NEXT_PUBLIC_SUPABASE_URL\n" +
      "- NEXT_PUBLIC_SUPABASE_ANON_KEY",
  )
}

// Cliente para uso no servidor
export const createServerClient = () => {
  if (!hasSupabaseConfig) {
    throw new Error("Supabase não configurado")
  }
  return createClient<Database>(supabaseUrl, supabaseAnonKey)
}
