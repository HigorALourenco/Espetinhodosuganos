"use client"

import type { Product } from "@/types"
import { useCart } from "@/contexts/cart-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus } from "lucide-react"
import Image from "next/image"

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { dispatch } = useCart()

  const handleAddToCart = () => {
    dispatch({ type: "ADD_ITEM", product })
  }

  return (
    <Card className="bg-gray-900 border-gray-700 hover:border-yellow-500 transition-colors">
      <CardHeader className="pb-3">
        {product.image_url && (
          <div className="relative h-48 mb-3 rounded-lg overflow-hidden">
            <Image src={product.image_url || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
          </div>
        )}
        <CardTitle className="text-yellow-400">{product.name}</CardTitle>
      </CardHeader>

      <CardContent>
        {product.description && <p className="text-gray-300 text-sm mb-3">{product.description}</p>}
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-green-400">R$ {product.price.toFixed(2)}</span>
          {product.stock_quantity > 0 && (
            <span className="text-xs text-gray-400">Estoque: {product.stock_quantity}</span>
          )}
        </div>
      </CardContent>

      <CardFooter>
        <Button
          onClick={handleAddToCart}
          disabled={product.stock_quantity === 0}
          className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold"
        >
          <Plus className="w-4 h-4 mr-2" />
          {product.stock_quantity === 0 ? "Indisponível" : "Adicionar"}
        </Button>
      </CardFooter>
    </Card>
  )
}
