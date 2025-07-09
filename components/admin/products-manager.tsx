"use client"

import type React from "react"

import { useState } from "react"
import { LocalStorageService } from "@/lib/local-storage"
import type { Category, Product } from "@/types"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Plus, Edit, Trash2, Package, Upload, Loader2 } from "lucide-react"
import { GoogleUploadService } from "@/lib/google-upload"
import Image from "next/image"

interface ProductsManagerProps {
  categories: Category[]
  products: Product[]
  onUpdate: () => void
}

export default function ProductsManager({ categories, products, onUpdate }: ProductsManagerProps) {
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category_id: "",
    stock_quantity: "",
    is_available: true,
    image_url: "/placeholder.svg?height=200&width=300",
  })
  const [uploadingProduct, setUploadingProduct] = useState<number | null>(null)

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      price: "",
      category_id: "",
      stock_quantity: "",
      is_available: true,
      image_url: "/placeholder.svg?height=200&width=300",
    })
    setEditingProduct(null)
    setShowForm(false)
  }

  const handleEdit = (product: Product) => {
    setEditingProduct(product)
    setFormData({
      name: product.name,
      description: product.description || "",
      price: product.price.toString(),
      category_id: product.category_id.toString(),
      stock_quantity: product.stock_quantity.toString(),
      is_available: product.is_available,
      image_url: product.image_url || "/placeholder.svg?height=200&width=300",
    })
    setShowForm(true)
  }

  const handleProductImageUpload = async (file: File, productId?: number) => {
    const validation = GoogleUploadService.validateImageFile(file)
    if (!validation.valid) {
      alert(validation.error)
      return null
    }

    setUploadingProduct(productId || 0)

    try {
      const imageUrl = await GoogleUploadService.uploadImage(file, "products")
      setUploadingProduct(null)
      return imageUrl
    } catch (error) {
      console.error("Erro no upload:", error)
      alert("Erro ao fazer upload da imagem")
      setUploadingProduct(null)
      return null
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const productData = {
      name: formData.name,
      description: formData.description || null,
      price: Number.parseFloat(formData.price),
      category_id: Number.parseInt(formData.category_id),
      stock_quantity: Number.parseInt(formData.stock_quantity),
      is_available: formData.is_available,
      image_url: formData.image_url,
      display_order: 0,
    }

    try {
      if (editingProduct) {
        LocalStorageService.saveProduct({
          ...productData,
          id: editingProduct.id,
          created_at: editingProduct.created_at,
          updated_at: new Date().toISOString(),
        })
      } else {
        LocalStorageService.saveProduct(productData)
      }

      onUpdate()
      resetForm()
    } catch (error) {
      console.error("Erro ao salvar produto:", error)
      alert("Erro ao salvar produto!")
    }
  }

  const handleDelete = async (id: number) => {
    if (confirm("Tem certeza que deseja excluir este produto?")) {
      try {
        LocalStorageService.deleteProduct(id)
        onUpdate()
      } catch (error) {
        console.error("Erro ao excluir produto:", error)
        alert("Erro ao excluir produto!")
      }
    }
  }

  const totalProducts = products.length
  const availableProducts = products.filter((p) => p.is_available).length
  const totalStock = products.reduce((sum, p) => sum + p.stock_quantity, 0)

  return (
    <div className="space-y-6">
      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gray-900 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Package className="w-5 h-5 text-yellow-400" />
              <div>
                <p className="text-sm text-gray-400">Total de Produtos</p>
                <p className="text-2xl font-bold text-white">{totalProducts}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Package className="w-5 h-5 text-green-400" />
              <div>
                <p className="text-sm text-gray-400">Disponíveis</p>
                <p className="text-2xl font-bold text-white">{availableProducts}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Package className="w-5 h-5 text-blue-400" />
              <div>
                <p className="text-sm text-gray-400">Estoque Total</p>
                <p className="text-2xl font-bold text-white">{totalStock}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-yellow-400">Gerenciar Produtos</h2>
        <Button onClick={() => setShowForm(true)} className="bg-yellow-500 hover:bg-yellow-600 text-black">
          <Plus className="w-4 h-4 mr-2" />
          Novo Produto
        </Button>
      </div>

      {showForm && (
        <Card className="bg-gray-900 border-gray-700">
          <CardHeader>
            <CardTitle className="text-yellow-400">{editingProduct ? "Editar Produto" : "Novo Produto"}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Nome *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="bg-gray-800 border-gray-600"
                    placeholder="Ex: Espetinho de Carne"
                  />
                </div>

                <div>
                  <Label htmlFor="category">Categoria *</Label>
                  <Select
                    value={formData.category_id}
                    onValueChange={(value) => setFormData({ ...formData, category_id: value })}
                  >
                    <SelectTrigger className="bg-gray-800 border-gray-600">
                      <SelectValue placeholder="Selecione uma categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id.toString()}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="price">Preço (R$) *</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    required
                    className="bg-gray-800 border-gray-600"
                    placeholder="0.00"
                  />
                </div>

                <div>
                  <Label htmlFor="stock">Estoque *</Label>
                  <Input
                    id="stock"
                    type="number"
                    min="0"
                    value={formData.stock_quantity}
                    onChange={(e) => setFormData({ ...formData, stock_quantity: e.target.value })}
                    required
                    className="bg-gray-800 border-gray-600"
                    placeholder="0"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="product-image">Foto do Produto</Label>
                <div className="flex items-center space-x-2">
                  <input
                    id="product-image"
                    type="file"
                    accept="image/*"
                    onChange={async (e) => {
                      const file = e.target.files?.[0]
                      if (file) {
                        const imageUrl = await handleProductImageUpload(file)
                        if (imageUrl) {
                          setFormData({ ...formData, image_url: imageUrl })
                        }
                      }
                      e.target.value = ""
                    }}
                    className="hidden"
                  />
                  <Button
                    type="button"
                    onClick={() => document.getElementById("product-image")?.click()}
                    disabled={uploadingProduct === 0}
                    variant="outline"
                    className="border-gray-600"
                  >
                    {uploadingProduct === 0 ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Enviando...
                      </>
                    ) : (
                      <>
                        <Upload className="w-4 h-4 mr-2" />
                        Escolher Foto
                      </>
                    )}
                  </Button>
                </div>
                {formData.image_url && (
                  <div className="mt-2">
                    <Image
                      src={formData.image_url || "/placeholder.svg"}
                      alt="Preview"
                      width={100}
                      height={100}
                      className="rounded border border-gray-600 object-cover"
                    />
                  </div>
                )}
              </div>

              <div>
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="bg-gray-800 border-gray-600"
                  placeholder="Descreva o produto..."
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="available"
                  checked={formData.is_available}
                  onCheckedChange={(checked) => setFormData({ ...formData, is_available: checked })}
                />
                <Label htmlFor="available">Produto disponível</Label>
              </div>

              <div className="flex space-x-2">
                <Button type="submit" className="bg-green-600 hover:bg-green-700">
                  {editingProduct ? "Atualizar" : "Criar"}
                </Button>
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancelar
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => {
          const category = categories.find((c) => c.id === product.category_id)
          return (
            <Card key={product.id} className="bg-gray-900 border-gray-700">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-yellow-400 text-lg">{product.name}</CardTitle>
                    <p className="text-sm text-gray-400">{category?.name}</p>
                  </div>
                  <div className="flex space-x-1">
                    <Button variant="ghost" size="sm" onClick={() => handleEdit(product)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(product.id)}
                      className="text-red-400 hover:text-red-300"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-2xl font-bold text-green-400">R$ {product.price.toFixed(2)}</p>
                  <p className="text-sm text-gray-300">Estoque: {product.stock_quantity}</p>
                  <p className="text-sm">
                    Status:{" "}
                    {product.is_available ? (
                      <span className="text-green-400">Disponível</span>
                    ) : (
                      <span className="text-red-400">Indisponível</span>
                    )}
                  </p>
                  {product.description && <p className="text-sm text-gray-400">{product.description}</p>}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
