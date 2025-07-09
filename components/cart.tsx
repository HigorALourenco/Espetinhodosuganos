"use client"

import { useCart } from "@/contexts/cart-context"
import type { Settings } from "@/types"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { X, Plus, Minus, MessageCircle } from "lucide-react"
import Image from "next/image"

interface CartProps {
  onClose: () => void
  settings: Settings | null
}

export default function Cart({ onClose, settings }: CartProps) {
  const { state, dispatch } = useCart()

  const updateQuantity = (productId: number, quantity: number) => {
    dispatch({ type: "UPDATE_QUANTITY", productId, quantity })
  }

  const removeItem = (productId: number) => {
    dispatch({ type: "REMOVE_ITEM", productId })
  }

  const sendToWhatsApp = () => {
    if (state.items.length === 0) return

    let message = `🍖 *Pedido - ${settings?.store_name}*\n\n`

    state.items.forEach((item) => {
      message += `• ${item.product.name}\n`
      message += `  Qtd: ${item.quantity}x\n`
      message += `  Preço: R$ ${(item.product.price * item.quantity).toFixed(2)}\n\n`
    })

    message += `💰 *Total: R$ ${state.total.toFixed(2)}*\n\n`
    message += `Obrigado pela preferência! 🙏`

    const whatsappUrl = `https://wa.me/${settings?.whatsapp_number}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")

    dispatch({ type: "CLEAR_CART" })
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="bg-gray-900 border-gray-700 w-full max-w-md max-h-[80vh] overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="text-yellow-400">Seu Pedido</CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>

        <CardContent className="overflow-y-auto max-h-96">
          {state.items.length === 0 ? (
            <p className="text-gray-400 text-center py-8">Seu carrinho está vazio</p>
          ) : (
            <div className="space-y-4">
              {state.items.map((item) => (
                <div key={item.product.id} className="flex items-center space-x-3 bg-gray-800 p-3 rounded-lg">
                  {item.product.image_url && (
                    <Image
                      src={item.product.image_url || "/placeholder.svg"}
                      alt={item.product.name}
                      width={50}
                      height={50}
                      className="rounded object-cover"
                    />
                  )}

                  <div className="flex-1">
                    <h4 className="font-semibold text-white">{item.product.name}</h4>
                    <p className="text-green-400 font-bold">R$ {(item.product.price * item.quantity).toFixed(2)}</p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      className="w-8 h-8 p-0"
                    >
                      <Minus className="w-3 h-3" />
                    </Button>

                    <span className="w-8 text-center text-white">{item.quantity}</span>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="w-8 h-8 p-0"
                    >
                      <Plus className="w-3 h-3" />
                    </Button>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeItem(item.product.id)}
                      className="text-red-400 hover:text-red-300 ml-2"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>

        {state.items.length > 0 && (
          <div className="p-6 border-t border-gray-700">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold text-white">Total:</span>
              <span className="text-2xl font-bold text-green-400">R$ {state.total.toFixed(2)}</span>
            </div>

            <Button
              onClick={sendToWhatsApp}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Finalizar Pedido via WhatsApp
            </Button>
          </div>
        )}
      </Card>
    </div>
  )
}
