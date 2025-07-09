"use client"

import { useState, useEffect } from "react"
import { LocalStorageService } from "@/lib/local-storage"
import type { Category, Product, Settings } from "@/types"
import type { AppearanceSettings } from "@/lib/local-storage"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ProductsManager from "@/components/admin/products-manager"
import SettingsManager from "@/components/admin/settings-manager"
import AppearanceManager from "@/components/admin/appearance-manager"
import { Shield, Eye, EyeOff } from "lucide-react"

export default function AdminPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [settings, setSettings] = useState<Settings | null>(null)
  const [appearance, setAppearance] = useState<AppearanceSettings | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loginError, setLoginError] = useState("")

  useEffect(() => {
    if (isAuthenticated) {
      loadData()
    }
  }, [isAuthenticated])

  const loadData = () => {
    setCategories(LocalStorageService.getCategories())
    setProducts(LocalStorageService.getProducts())
    setSettings(LocalStorageService.getSettings())
    setAppearance(LocalStorageService.getAppearance())
  }

  const handleLogin = () => {
    setLoginError("")

    // Credenciais solicitadas
    if (username === "admin" && password === "312890") {
      setIsAuthenticated(true)
    } else {
      setLoginError("Usuário ou senha incorretos!")
      // Limpar campos após erro
      setTimeout(() => {
        setUsername("")
        setPassword("")
        setLoginError("")
      }, 2000)
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setUsername("")
    setPassword("")
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
        <Card className="bg-gray-900 border-gray-700 w-full max-w-md">
          <CardHeader className="text-center">
            <Shield className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
            <CardTitle className="text-yellow-400 text-2xl">Painel Administrativo</CardTitle>
            <p className="text-gray-400 text-sm">Espetinho do Sugano's</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-2">
                Usuário
              </label>
              <input
                id="username"
                type="text"
                placeholder="Digite o usuário"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-3 bg-gray-800 border border-gray-600 rounded text-white focus:border-yellow-500 focus:outline-none"
                onKeyPress={(e) => e.key === "Enter" && document.getElementById("password")?.focus()}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                Senha
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Digite a senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 bg-gray-800 border border-gray-600 rounded text-white focus:border-yellow-500 focus:outline-none pr-12"
                  onKeyPress={(e) => e.key === "Enter" && handleLogin()}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {loginError && (
              <div className="bg-red-900/50 border border-red-500 text-red-200 px-4 py-2 rounded text-sm">
                {loginError}
              </div>
            )}

            <Button onClick={handleLogin} className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold">
              Entrar
            </Button>

            <div className="text-center text-xs text-gray-500 mt-4">
              <p>Credenciais de demonstração:</p>
              <p>Usuário: admin | Senha: 312890</p>
            </div>
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
            <p className="text-gray-300">Gerencie seu cardápio, aparência e configurações</p>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-400">
              Logado como: <span className="text-yellow-400">admin</span>
            </span>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent"
            >
              Sair
            </Button>
          </div>
        </div>

        <Tabs defaultValue="products" className="space-y-6">
          <TabsList className="bg-gray-800 border-gray-700">
            <TabsTrigger value="products" className="data-[state=active]:bg-yellow-500 data-[state=active]:text-black">
              Produtos
            </TabsTrigger>
            <TabsTrigger
              value="appearance"
              className="data-[state=active]:bg-yellow-500 data-[state=active]:text-black"
            >
              Aparência
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-yellow-500 data-[state=active]:text-black">
              Configurações
            </TabsTrigger>
          </TabsList>

          <TabsContent value="products">
            <ProductsManager categories={categories} products={products} onUpdate={loadData} />
          </TabsContent>

          <TabsContent value="appearance">
            <AppearanceManager settings={settings} appearance={appearance} onUpdate={loadData} />
          </TabsContent>

          <TabsContent value="settings">
            <SettingsManager settings={settings} onUpdate={loadData} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
