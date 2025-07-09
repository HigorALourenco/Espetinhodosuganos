"use client"

import type React from "react"

import { useState } from "react"
import { LocalStorageService } from "@/lib/local-storage"
import type { Settings } from "@/types"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Store, Phone, FileText, Power } from "lucide-react"

interface SettingsManagerProps {
  settings: Settings | null
  onUpdate: () => void
}

export default function SettingsManager({ settings, onUpdate }: SettingsManagerProps) {
  const [formData, setFormData] = useState({
    store_name: settings?.store_name || "",
    store_description: settings?.store_description || "",
    whatsapp_number: settings?.whatsapp_number || "",
    is_open: settings?.is_open || true,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      LocalStorageService.saveSettings(formData)
      onUpdate()
      alert("Configurações salvas com sucesso!")
    } catch (error) {
      console.error("Erro ao salvar configurações:", error)
      alert("Erro ao salvar configurações")
    }
  }

  const resetToDefaults = () => {
    if (confirm("Tem certeza que deseja restaurar as configurações padrão?")) {
      const defaultData = {
        store_name: "Espetinho do Sugano's",
        store_description:
          "Os melhores espetinhos da região! Feitos na hora com ingredientes frescos e tempero especial.",
        whatsapp_number: "5511999999999",
        is_open: true,
      }
      setFormData(defaultData)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-yellow-400">Configurações da Loja</h2>
        <Button onClick={resetToDefaults} variant="outline" className="border-gray-600 bg-transparent">
          Restaurar Padrão
        </Button>
      </div>

      <Card className="bg-gray-900 border-gray-700">
        <CardHeader>
          <CardTitle className="text-yellow-400 flex items-center space-x-2">
            <Store className="w-5 h-5" />
            <span>Informações da Loja</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="store_name" className="flex items-center space-x-2">
                    <Store className="w-4 h-4" />
                    <span>Nome da Loja</span>
                  </Label>
                  <Input
                    id="store_name"
                    value={formData.store_name}
                    onChange={(e) => setFormData({ ...formData, store_name: e.target.value })}
                    className="bg-gray-800 border-gray-600"
                    placeholder="Nome do seu estabelecimento"
                  />
                </div>

                <div>
                  <Label htmlFor="whatsapp_number" className="flex items-center space-x-2">
                    <Phone className="w-4 h-4" />
                    <span>Número do WhatsApp</span>
                  </Label>
                  <Input
                    id="whatsapp_number"
                    value={formData.whatsapp_number}
                    onChange={(e) => setFormData({ ...formData, whatsapp_number: e.target.value })}
                    placeholder="5511999999999"
                    className="bg-gray-800 border-gray-600"
                  />
                  <p className="text-sm text-gray-400 mt-1">
                    Formato: código do país + DDD + número (ex: 5511999999999)
                  </p>
                </div>

                <div className="flex items-center space-x-2 p-4 bg-gray-800 rounded-lg">
                  <Power className={`w-5 h-5 ${formData.is_open ? "text-green-400" : "text-red-400"}`} />
                  <div className="flex-1">
                    <Label htmlFor="is_open" className="text-base">
                      Status da Loja
                    </Label>
                    <p className="text-sm text-gray-400">
                      {formData.is_open ? "Loja aberta - recebendo pedidos" : "Loja fechada - não recebe pedidos"}
                    </p>
                  </div>
                  <Switch
                    id="is_open"
                    checked={formData.is_open}
                    onCheckedChange={(checked) => setFormData({ ...formData, is_open: checked })}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="store_description" className="flex items-center space-x-2">
                  <FileText className="w-4 h-4" />
                  <span>Descrição da Loja</span>
                </Label>
                <Textarea
                  id="store_description"
                  value={formData.store_description}
                  onChange={(e) => setFormData({ ...formData, store_description: e.target.value })}
                  className="bg-gray-800 border-gray-600 h-32"
                  placeholder="Descreva sua loja, especialidades, diferenciais..."
                />
              </div>
            </div>

            <div className="flex space-x-4">
              <Button type="submit" className="bg-yellow-500 hover:bg-yellow-600 text-black">
                Salvar Configurações
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => window.open("/", "_blank")}
                className="border-gray-600"
              >
                Visualizar Loja
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Preview das configurações */}
      <Card className="bg-gray-900 border-gray-700">
        <CardHeader>
          <CardTitle className="text-yellow-400">Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-bold text-yellow-400">{formData.store_name}</h3>
              <p className="text-gray-300">{formData.store_description}</p>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4 text-green-400" />
              <span className="text-sm text-gray-300">WhatsApp: {formData.whatsapp_number}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Power className={`w-4 h-4 ${formData.is_open ? "text-green-400" : "text-red-400"}`} />
              <span className={`text-sm ${formData.is_open ? "text-green-400" : "text-red-400"}`}>
                {formData.is_open ? "Aberto" : "Fechado"}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
