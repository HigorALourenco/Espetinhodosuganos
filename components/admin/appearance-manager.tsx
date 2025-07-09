"use client"

import type React from "react"

import { useState } from "react"
import { GoogleUploadService } from "@/lib/google-upload"
import type { Settings } from "@/types"
import type { AppearanceSettings } from "@/lib/local-storage"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Upload, ImageIcon, Palette, Monitor, Trash2, Loader2 } from "lucide-react"
import Image from "next/image"
import { DatabaseService } from "@/lib/database-service"

interface AppearanceManagerProps {
  settings: Settings | null
  appearance: AppearanceSettings | null
  onUpdate: () => void
}

export default function AppearanceManager({ settings, appearance, onUpdate }: AppearanceManagerProps) {
  const [uploading, setUploading] = useState<string | null>(null)
  const [uploadProgress, setUploadProgress] = useState(0)

  const handleImageUpload = async (file: File, type: "logo" | "background") => {
    const validation = GoogleUploadService.validateImageFile(file)
    if (!validation.valid) {
      alert(validation.error)
      return
    }

    setUploading(type)
    setUploadProgress(0)

    try {
      // Simular progresso de upload
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => Math.min(prev + 10, 90))
      }, 150)

      const imageUrl = await GoogleUploadService.uploadImage(file, type === "logo" ? "logo" : "background")

      clearInterval(progressInterval)
      setUploadProgress(100)

      if (type === "logo") {
        await DatabaseService.saveSettings({ logo_url: imageUrl })
      } else {
        await DatabaseService.saveAppearance({ background_image: imageUrl })
      }

      onUpdate()

      setTimeout(() => {
        setUploading(null)
        setUploadProgress(0)
      }, 500)
    } catch (error) {
      console.error("Erro no upload:", error)
      alert("Erro ao fazer upload da imagem")
      setUploading(null)
      setUploadProgress(0)
    }
  }

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>, type: "logo" | "background") => {
    const file = event.target.files?.[0]
    if (file) {
      handleImageUpload(file, type)
    }
    // Limpar input para permitir re-upload do mesmo arquivo
    event.target.value = ""
  }

  const handleOpacityChange = async (value: number[]) => {
    await DatabaseService.saveAppearance({ background_opacity: value[0] })
    onUpdate()
  }

  const removeImage = async (type: "logo" | "background") => {
    if (confirm(`Tem certeza que deseja remover ${type === "logo" ? "o logo" : "a imagem de fundo"}?`)) {
      if (type === "logo") {
        await DatabaseService.saveSettings({ logo_url: null })
      } else {
        await DatabaseService.saveAppearance({ background_image: null })
      }
      onUpdate()
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Palette className="w-6 h-6 text-yellow-400" />
        <h2 className="text-2xl font-bold text-yellow-400">Aparência da Loja</h2>
      </div>

      {/* Logo da Loja */}
      <Card className="bg-gray-900 border-gray-700">
        <CardHeader>
          <CardTitle className="text-yellow-400 flex items-center space-x-2">
            <ImageIcon className="w-5 h-5" />
            <span>Logo da Loja</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-4">
            {settings?.logo_url && (
              <div className="relative">
                <Image
                  src={settings.logo_url || "/placeholder.svg"}
                  alt="Logo atual"
                  width={100}
                  height={100}
                  className="rounded-lg border border-gray-600"
                />
                <Button
                  onClick={() => removeImage("logo")}
                  size="sm"
                  variant="destructive"
                  className="absolute -top-2 -right-2 w-6 h-6 p-0"
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            )}

            <div className="flex-1">
              <Label htmlFor="logo-upload" className="block mb-2">
                {settings?.logo_url ? "Alterar Logo" : "Adicionar Logo"}
              </Label>
              <div className="flex items-center space-x-2">
                <input
                  id="logo-upload"
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileSelect(e, "logo")}
                  className="hidden"
                />
                <Button
                  onClick={() => document.getElementById("logo-upload")?.click()}
                  disabled={uploading === "logo"}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {uploading === "logo" ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Enviando... {uploadProgress}%
                    </>
                  ) : (
                    <>
                      <Upload className="w-4 h-4 mr-2" />
                      Escolher Arquivo
                    </>
                  )}
                </Button>
              </div>
              <p className="text-xs text-gray-400 mt-1">
                Formatos: JPG, PNG, WebP | Máximo: 5MB | Recomendado: 200x200px
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Imagem de Fundo */}
      <Card className="bg-gray-900 border-gray-700">
        <CardHeader>
          <CardTitle className="text-yellow-400 flex items-center space-x-2">
            <Monitor className="w-5 h-5" />
            <span>Imagem de Fundo</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start space-x-4">
            {appearance?.background_image && (
              <div className="relative">
                <Image
                  src={appearance.background_image || "/placeholder.svg"}
                  alt="Fundo atual"
                  width={200}
                  height={120}
                  className="rounded-lg border border-gray-600 object-cover"
                />
                <Button
                  onClick={() => removeImage("background")}
                  size="sm"
                  variant="destructive"
                  className="absolute -top-2 -right-2 w-6 h-6 p-0"
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            )}

            <div className="flex-1">
              <Label htmlFor="background-upload" className="block mb-2">
                {appearance?.background_image ? "Alterar Fundo" : "Adicionar Fundo"}
              </Label>
              <div className="flex items-center space-x-2">
                <input
                  id="background-upload"
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileSelect(e, "background")}
                  className="hidden"
                />
                <Button
                  onClick={() => document.getElementById("background-upload")?.click()}
                  disabled={uploading === "background"}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  {uploading === "background" ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Enviando... {uploadProgress}%
                    </>
                  ) : (
                    <>
                      <Upload className="w-4 h-4 mr-2" />
                      Escolher Arquivo
                    </>
                  )}
                </Button>
              </div>
              <p className="text-xs text-gray-400 mt-1">
                Formatos: JPG, PNG, WebP | Máximo: 5MB | Recomendado: 1920x1080px
              </p>
            </div>
          </div>

          {/* Controle de Opacidade */}
          <div className="space-y-2">
            <Label>Opacidade do Fundo: {Math.round((appearance?.background_opacity || 0.1) * 100)}%</Label>
            <Slider
              value={[appearance?.background_opacity || 0.1]}
              onValueChange={handleOpacityChange}
              max={1}
              min={0.05}
              step={0.05}
              className="w-full"
            />
            <p className="text-xs text-gray-400">Ajuste a opacidade para melhor legibilidade do texto</p>
          </div>
        </CardContent>
      </Card>

      {/* Preview */}
      <Card className="bg-gray-900 border-gray-700">
        <CardHeader>
          <CardTitle className="text-yellow-400">Preview da Loja</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative bg-black rounded-lg overflow-hidden h-64">
            {/* Fundo com opacidade */}
            {appearance?.background_image && (
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url(${appearance.background_image})`,
                  opacity: appearance.background_opacity || 0.1,
                }}
              />
            )}

            {/* Conteúdo do preview */}
            <div className="relative z-10 p-6 h-full flex flex-col justify-center items-center text-center">
              {settings?.logo_url && (
                <Image
                  src={settings.logo_url || "/placeholder.svg"}
                  alt="Logo"
                  width={80}
                  height={80}
                  className="rounded-full mb-4"
                />
              )}
              <h1 className="text-2xl font-bold text-yellow-400 mb-2">
                {settings?.store_name || "Espetinho do Sugano's"}
              </h1>
              <p className="text-gray-300 text-sm">
                {settings?.store_description || "Os melhores espetinhos da região!"}
              </p>
            </div>
          </div>

          <div className="mt-4 flex justify-center">
            <Button
              onClick={() => window.open("/", "_blank")}
              variant="outline"
              className="border-yellow-500 text-yellow-400 hover:bg-yellow-500 hover:text-black"
            >
              <Monitor className="w-4 h-4 mr-2" />
              Ver Loja Completa
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Dicas de Upload */}
      <Card className="bg-blue-900/20 border-blue-500/30">
        <CardHeader>
          <CardTitle className="text-blue-400 text-lg">💡 Dicas para Melhores Resultados</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-blue-200">
          <p>
            • <strong>Logo:</strong> Use imagens quadradas (200x200px) com fundo transparente
          </p>
          <p>
            • <strong>Fundo:</strong> Prefira imagens horizontais (1920x1080px) com boa qualidade
          </p>
          <p>
            • <strong>Formato:</strong> PNG para logos com transparência, JPG para fotos
          </p>
          <p>
            • <strong>Tamanho:</strong> Mantenha arquivos abaixo de 5MB para carregamento rápido
          </p>
          <p>
            • <strong>Opacidade:</strong> Use entre 10-30% para não prejudicar a legibilidade
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
