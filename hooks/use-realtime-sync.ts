"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import type { Product, Settings } from "@/types"
import type { AppearanceSettings } from "@/lib/local-storage"

interface UseRealtimeSyncOptions {
  onProductsUpdate?: (products: Product[]) => void
  onSettingsUpdate?: (settings: Settings) => void
  onAppearanceUpdate?: (appearance: AppearanceSettings) => void
}

interface UseRealtimeSyncReturn {
  connected: boolean
  lastUpdate: Date | null
  syncProducts: (products: Product[]) => Promise<void>
  syncSettings: (settings: Settings) => Promise<void>
  syncAppearance: (appearance: AppearanceSettings) => Promise<void>
}

export function useRealtimeSync(options: UseRealtimeSyncOptions = {}): UseRealtimeSyncReturn {
  const [connected, setConnected] = useState(false)
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null)
  const pollRef = useRef<NodeJS.Timeout>()
  const lastKnownTimestamp = useRef<number>(0)

  const poll = useCallback(async () => {
    try {
      const res = await fetch("/api/realtime", {
        cache: "no-store",
        headers: { "Cache-Control": "no-cache" },
      })

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`)
      }

      const json = await res.json()

      // Marca como conectado na primeira resposta bem-sucedida
      if (!connected) {
        setConnected(true)
        console.log("🟢 Sistema de tempo real conectado")
      }

      // Verifica se há dados novos
      if (json.data && json.lastUpdate > lastKnownTimestamp.current) {
        lastKnownTimestamp.current = json.lastUpdate
        setLastUpdate(new Date(json.lastUpdate))

        console.log("📡 Recebendo atualização:", json.data.type)

        switch (json.data.type) {
          case "products":
            options.onProductsUpdate?.(json.data.products)
            break
          case "settings":
            options.onSettingsUpdate?.(json.data.settings)
            break
          case "appearance":
            options.onAppearanceUpdate?.(json.data.appearance)
            break
        }
      }
    } catch (error) {
      if (connected) {
        setConnected(false)
        console.log("🔴 Sistema de tempo real desconectado")
      }
    }
  }, [connected, options])

  // Inicia o polling
  useEffect(() => {
    poll() // Chamada imediata
    pollRef.current = setInterval(poll, 2000) // A cada 2 segundos

    return () => {
      if (pollRef.current) {
        clearInterval(pollRef.current)
      }
    }
  }, [poll])

  // Funções de sincronização
  const syncProducts = useCallback(async (products: Product[]) => {
    try {
      console.log("📤 Sincronizando produtos...")
      await fetch("/api/realtime", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "products",
          products: products,
        }),
      })
      console.log("✅ Produtos sincronizados")
    } catch (error) {
      console.error("❌ Erro ao sincronizar produtos:", error)
    }
  }, [])

  const syncSettings = useCallback(async (settings: Settings) => {
    try {
      console.log("📤 Sincronizando configurações...")
      await fetch("/api/realtime", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "settings",
          settings: settings,
        }),
      })
      console.log("✅ Configurações sincronizadas")
    } catch (error) {
      console.error("❌ Erro ao sincronizar configurações:", error)
    }
  }, [])

  const syncAppearance = useCallback(async (appearance: AppearanceSettings) => {
    try {
      console.log("📤 Sincronizando aparência...")
      await fetch("/api/realtime", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "appearance",
          appearance: appearance,
        }),
      })
      console.log("✅ Aparência sincronizada")
    } catch (error) {
      console.error("❌ Erro ao sincronizar aparência:", error)
    }
  }, [])

  return {
    connected,
    lastUpdate,
    syncProducts,
    syncSettings,
    syncAppearance,
  }
}
