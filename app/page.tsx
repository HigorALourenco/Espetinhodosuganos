"use client"

import { useEffect, useState } from "react"
import type { Category, Product, Settings } from "@/types"
import { LocalStorageService } from "@/lib/local-storage"
import MenuClient from "@/components/menu-client"

export default function HomePage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [settings, setSettings] = useState<Settings | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simular carregamento para melhor UX
    const timer = setTimeout(() => {
      setCategories(LocalStorageService.getCategories().filter((c) => c.is_active))
      setProducts(LocalStorageService.getProducts().filter((p) => p.is_available))
      setSettings(LocalStorageService.getSettings())
      setLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-yellow-400 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-yellow-400 mx-auto mb-4"></div>
          <h1 className="text-2xl font-bold">Carregando cardápio...</h1>
        </div>
      </div>
    )
  }

  return <MenuClient categories={categories} products={products} settings={settings} />
}
