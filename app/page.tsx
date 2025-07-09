"use client"

import { useEffect, useState } from "react"
import type { Category, Product, Settings } from "@/types"
import type { AppearanceSettings } from "@/lib/local-storage"
import { LocalStorageService } from "@/lib/local-storage"
import { useRealtimeSync } from "@/hooks/use-realtime-sync"
import MenuClient from "@/components/menu-client"
import { Badge } from "@/components/ui/badge"
import { Wifi, WifiOff } from "lucide-react"

export default function HomePage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [settings, setSettings] = useState<Settings | null>(null)
  const [appearance, setAppearance] = useState<AppearanceSettings | null>(null)
  const [loading, setLoading] = useState(true)

  // Hook de sincronização em tempo real
  const { connected, lastUpdate } = useRealtimeSync({
    onProductsUpdate: (updatedProducts) => {
      console.log("🔄 Atualizando produtos na loja...")
      setProducts(updatedProducts.filter((p) => p.is_available))
      // Sincronizar com localStorage
      localStorage.setItem("products", JSON.stringify(updatedProducts))
    },
    onSettingsUpdate: (updatedSettings) => {
      console.log("🔄 Atualizando configurações na loja...")
      setSettings(updatedSettings)
      localStorage.setItem("settings", JSON.stringify(updatedSettings))
    },
    onAppearanceUpdate: (updatedAppearance) => {
      console.log("🔄 Atualizando aparência na loja...")
      setAppearance(updatedAppearance)
      localStorage.setItem("appearance", JSON.stringify(updatedAppearance))
    },
  })

  useEffect(() => {
    // Carregamento inicial dos dados
    const loadInitialData = () => {
      try {
        setCategories(LocalStorageService.getCategories().filter((c) => c.is_active))
        setProducts(LocalStorageService.getProducts().filter((p) => p.is_available))
        setSettings(LocalStorageService.getSettings())
        setAppearance(LocalStorageService.getAppearance())
        setLoading(false)
        console.log("✅ Dados iniciais carregados")
      } catch (error) {
        console.error("❌ Erro ao carregar dados:", error)
        setLoading(false)
      }
    }

    // Pequeno delay para simular carregamento
    const timer = setTimeout(loadInitialData, 500)
    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-yellow-400 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-yellow-400 mx-auto mb-4"></div>
          <h1 className="text-2xl font-bold">Carregando cardápio...</h1>
          <p className="text-sm text-gray-400 mt-2">Conectando ao sistema em tempo real...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="relative">
      {/* Indicador de Conexão em Tempo Real */}
      <div className="fixed top-4 right-4 z-50">
        <Badge
          variant={connected ? "default" : "destructive"}
          className={`${
            connected ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"
          } text-white transition-all duration-300`}
        >
          {connected ? (
            <>
              <Wifi className="w-3 h-3 mr-1" />
              Online
            </>
          ) : (
            <>
              <WifiOff className="w-3 h-3 mr-1" />
              Offline
            </>
          )}
        </Badge>
        {lastUpdate && (
          <p className="text-xs text-gray-400 mt-1 text-right">Última atualização: {lastUpdate.toLocaleTimeString()}</p>
        )}
      </div>

      <MenuClient categories={categories} products={products} settings={settings} appearance={appearance} />
    </div>
  )
}
