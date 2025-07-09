import type { Settings } from "@/types"
import Image from "next/image"

interface HeaderProps {
  settings: Settings | null
}

export default function Header({ settings }: HeaderProps) {
  return (
    <header className="bg-gradient-to-r from-black to-gray-900 border-b-2 border-yellow-500">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-center space-x-4">
          {settings?.logo_url && (
            <Image
              src={settings.logo_url || "/placeholder.svg"}
              alt="Logo"
              width={60}
              height={60}
              className="rounded-full"
            />
          )}
          <div className="text-center">
            <h1 className="text-4xl font-bold text-yellow-400">{settings?.store_name || "Espetinho do Sugano's"}</h1>
            <p className="text-gray-300 mt-2">{settings?.store_description || "Os melhores espetinhos da região!"}</p>
          </div>
        </div>
      </div>
    </header>
  )
}
