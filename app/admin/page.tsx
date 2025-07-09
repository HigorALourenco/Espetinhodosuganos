"use client"

import { useState, useEffect } from "react"
import { LocalStorageService } from "@/lib/local-storage"
import type { Category, Product, Settings } from "@/types"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ProductsManager from "@/components/admin/products-manager"
import SettingsManager from "@/components/admin/settings-manager"
import { Shield } from "lucide-react"

export default function AdminPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [settings, setSettings] = useState<Settings | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState("")

  useEffect(() => {
    if (isAuthenticated) {
      loadData()
    }
  }, [isAuthenticated])

  const loadData = () => {
    setCategories(LocalStorageService.getCategories())
    setProducts(LocalStorageService.getProducts())
    setSettings(LocalStorageService.getSettings())
  }

  const handleLogin = () => {
    // Senha simples para demonstração
    if (password === "admin123") {
      setIsAuthenticated(true)
    } else {
      alert("Senha incorreta! Use: admin123")
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <Card className="bg-gray-900 border-gray-700 w-full max-w-md">
          <CardHeader className="text-center">
            <Shield className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
            <CardTitle className="text-yellow-400">Painel Administrativo</CardTitle>
            <p className="text-gray-400 text-sm">Senha: admin123</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <input
              type="password"
              placeholder="Digite a senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 bg-gray-800 border border-gray-600 rounded text-white"
              onKeyPress={(e) => e.key === "Enter" && handleLogin()}
            />
            <Button onClick={handleLogin} className="w-full bg-yellow-500 hover:bg-yellow-600 text-black">
              Entrar
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-yellow-400 mb-2">Painel Administrativo</h1>
            <p className="text-gray-300">Gerencie seu cardápio e configurações</p>
          </div>
          <Button
            onClick={() => setIsAuthenticated(false)}
            variant="outline"
            className="border-gray-600 text-gray-300 hover:bg-gray-800"
          >
            Sair
          </Button>
        </div>

        <Tabs defaultValue="products" className="space-y-6">
          <TabsList className="bg-gray-800 border-gray-700">
            <TabsTrigger value="products" className="data-[state=active]:bg-yellow-500 data-[state=active]:text-black">
              Produtos
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-yellow-500 data-[state=active]:text-black">
              Configurações
            </TabsTrigger>
          </TabsList>

          <TabsContent value="products">
            <ProductsManager categories={categories} products={products} onUpdate={loadData} />
          </TabsContent>

          <TabsContent value="settings">
            <SettingsManager settings={settings} onUpdate={loadData} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
