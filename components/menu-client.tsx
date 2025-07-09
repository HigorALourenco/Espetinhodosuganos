"use client"

import { useState, useEffect } from "react"
import type { Category, Product, Settings } from "@/types"
import { CartProvider } from "@/contexts/cart-context"
import Header from "@/components/header"
import CategorySection from "@/components/category-section"
import Cart from "@/components/cart"
import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"
import { LocalStorageService } from "@/lib/local-storage"
import type { AppearanceSettings } from "@/lib/local-storage"

interface MenuClientProps {
  categories: Category[]
  products: Product[]
  settings: Settings | null
}

export default function MenuClient({ categories, products, settings }: MenuClientProps) {
  const [showCart, setShowCart] = useState(false)
  const [appearance, setAppearance] = useState<AppearanceSettings | null>(null)

  useEffect(() => {
    setAppearance(LocalStorageService.getAppearance())
  }, [])

  if (!settings?.is_open) {
    return (
      <div className="min-h-screen bg-black text-yellow-400 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Estamos Fechados</h1>
          <p className="text-xl">Voltamos em breve!</p>
        </div>
      </div>
    )
  }

  return (
    <CartProvider>
      <div className="min-h-screen bg-black text-white relative">
        {/* Background Image */}
        {appearance?.background_image && (
          <div
            className="fixed inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${appearance.background_image})`,
              opacity: appearance.background_opacity || 0.1,
            }}
          />
        )}

        <div className="relative z-10">
          <Header settings={settings} />

          <main className="container mx-auto px-4 py-8">
            {categories.map((category) => {
              const categoryProducts = products.filter((p) => p.category_id === category.id)
              if (categoryProducts.length === 0) return null

              return <CategorySection key={category.id} category={category} products={categoryProducts} />
            })}
          </main>

          {/* Floating Cart Button */}
          <Button
            onClick={() => setShowCart(true)}
            className="fixed bottom-6 right-6 bg-yellow-500 hover:bg-yellow-600 text-black rounded-full w-16 h-16 shadow-lg z-50"
            size="lg"
          >
            <ShoppingCart className="w-6 h-6" />
          </Button>

          {/* Cart Modal */}
          {showCart && <Cart onClose={() => setShowCart(false)} settings={settings} />}
        </div>
      </div>
    </CartProvider>
  )
}
