"use client"

import { useEffect, useState } from "react"
import type { Category, Product, Settings } from "@/types"
import type { AppearanceSettings } from "@/lib/database-service"
import { DatabaseService } from "@/lib/database-service"
import { useSupabaseRealtime } from "@/hooks/use-supabase-realtime"
import { isSupabaseEnabled } from "@/lib/supabase"
import MenuClient from "@/components/menu-client"
import { Badge } from "@/components/ui/badge"
import { WifiOff, Database, HardDrive } from "lucide-react"

export default function HomePage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [settings, setSettings] = useState<Settings | null>(null)
  const [appearance, setAppearance] = useState<AppearanceSettings | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Hook de tempo real com Supabase
  const { connected, lastUpdate } = useSupabaseRealtime({
    onProductsUpdate: (updatedProducts) => {
      console.log("🔄 Atualizando produtos na loja...")
      setProducts(updatedProducts.filter((p) => p.is_available))
    },
    onSettingsUpdate: (updatedSettings) => {
      console.log("🔄 Atualizando configurações na loja...")
      setSettings(updatedSettings)
    },
    onAppearanceUpdate: (updatedAppearance) => {
      console.log("🔄 Atualizando aparência na loja...")
      setAppearance(updatedAppearance)
    },
  })

  useEffect(() => {
    // Carregamento inicial dos dados
    const loadInitialData = async () => {
      try {
        console.log("📊 Carregando dados iniciais...")

        const [categoriesData, productsData, settingsData, appearanceData] = await Promise.all([
          DatabaseService.getCategories(),
          DatabaseService.getProducts(),
          DatabaseService.getSettings(),
          DatabaseService.getAppearance(),
        ])

        setCategories(categoriesData.filter((c) => c.is_active))
        setProducts(productsData.filter((p) => p.is_available))
        setSettings(settingsData)
        setAppearance(appearanceData)
        setLoading(false)

        console.log("✅ Dados iniciais carregados")
      } catch (error) {
        console.error("❌ Erro ao carregar dados:", error)
        setError("Erro ao carregar dados da loja")
        setLoading(false)
      }
    }

    loadInitialData()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-yellow-400 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-yellow-400 mx-auto mb-4"></div>
          <h1 className="text-2xl font-bold">Carregando cardápio...</h1>
          <p className="text-sm text-gray-400 mt-2">
            {isSupabaseEnabled ? "Conectando ao banco de dados..." : "Carregando dados locais..."}
          </p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black text-red-400 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Erro ao carregar</h1>
          <p className="text-gray-400">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-yellow-500 text-black rounded hover:bg-yellow-600"
          >
            Tentar novamente
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="relative">
      {/* Indicador de Conexão */}
      <div className="fixed top-4 right-4 z-50">
        <Badge
          variant={connected ? "default" : "secondary"}
          className={`${
            connected
              ? "bg-green-600 hover:bg-green-700 animate-pulse"
              : isSupabaseEnabled
                ? "bg-red-600 hover:bg-red-700"
                : "bg-blue-600 hover:bg-blue-700"
          } text-white transition-all duration-300`}
        >
          {connected ? (
            <>
              <Database className="w-3 h-3 mr-1" />
              Supabase Online
            </>
          ) : isSupabaseEnabled ? (
            <>
              <WifiOff className="w-3 h-3 mr-1" />
              Desconectado
            </>
          ) : (
            <>
              <HardDrive className="w-3 h-3 mr-1" />
              Modo Local
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
