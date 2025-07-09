"use client"

import { useEffect, useState } from "react"
import { supabase, isSupabaseEnabled } from "@/lib/supabase"
import { DatabaseService } from "@/lib/database-service"
import type { Product, Settings } from "@/types"
import type { AppearanceSettings } from "@/lib/database-service"

interface UseSupabaseRealtimeOptions {
  onProductsUpdate?: (products: Product[]) => void
  onSettingsUpdate?: (settings: Settings) => void
  onAppearanceUpdate?: (appearance: AppearanceSettings) => void
}

export function useSupabaseRealtime(options: UseSupabaseRealtimeOptions = {}) {
  const [connected, setConnected] = useState(false)
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null)

  useEffect(() => {
    // Se Supabase não estiver disponível, não fazer nada
    if (!isSupabaseEnabled || !supabase) {
      console.log("🟡 Supabase Realtime não disponível - usando localStorage")
      return
    }

    console.log("🔌 Conectando ao Supabase Realtime...")

    // Subscription para produtos
    const productsSubscription = supabase
      .channel("products-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "products",
        },
        async (payload) => {
          console.log("🔄 Produtos atualizados via Realtime:", payload)
          setLastUpdate(new Date())

          // Recarregar todos os produtos
          const products = await DatabaseService.getProducts()
          options.onProductsUpdate?.(products)
        },
      )
      .subscribe((status) => {
        console.log("📡 Status da subscription de produtos:", status)
        setConnected(status === "SUBSCRIBED")
      })

    // Subscription para configurações
    const settingsSubscription = supabase
      .channel("settings-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "settings",
        },
        async (payload) => {
          console.log("🔄 Configurações atualizadas via Realtime:", payload)
          setLastUpdate(new Date())

          // Recarregar configurações
          const settings = await DatabaseService.getSettings()
          if (settings) {
            options.onSettingsUpdate?.(settings)
          }
        },
      )
      .subscribe()

    // Subscription para aparência
    const appearanceSubscription = supabase
      .channel("appearance-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "appearance",
        },
        async (payload) => {
          console.log("🔄 Aparência atualizada via Realtime:", payload)
          setLastUpdate(new Date())

          // Recarregar aparência
          const appearance = await DatabaseService.getAppearance()
          if (appearance) {
            options.onAppearanceUpdate?.(appearance)
          }
        },
      )
      .subscribe()

    // Cleanup
    return () => {
      console.log("🔌 Desconectando do Supabase Realtime...")
      if (supabase) {
        supabase.removeChannel(productsSubscription)
        supabase.removeChannel(settingsSubscription)
        supabase.removeChannel(appearanceSubscription)
      }
      setConnected(false)
    }
  }, [options])

  return {
    connected: isSupabaseEnabled ? connected : false,
    lastUpdate,
  }
}
