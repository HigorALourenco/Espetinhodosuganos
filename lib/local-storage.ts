import type { Category, Product, Settings } from "@/types"

// Dados padrão
const defaultCategories: Category[] = [
  {
    id: 1,
    name: "Espetinhos",
    description: "Deliciosos espetinhos grelhados na hora",
    display_order: 1,
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 2,
    name: "Pães",
    description: "Pães de alho crocantes e saborosos",
    display_order: 2,
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 3,
    name: "Lanches",
    description: "Lanches especiais da casa",
    display_order: 3,
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 4,
    name: "Bebidas",
    description: "Bebidas geladas para acompanhar",
    display_order: 4,
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 5,
    name: "Refrigerantes",
    description: "Refrigerantes diversos",
    display_order: 5,
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 6,
    name: "Cervejas",
    description: "Cervejas geladas",
    display_order: 6,
    is_active: true,
    created_at: new Date().toISOString(),
  },
]

const defaultProducts: Product[] = [
  // Espetinhos
  {
    id: 1,
    category_id: 1,
    name: "Espetinho de Carne",
    description: "Carne bovina temperada e grelhada",
    price: 8.0,
    image_url: "/placeholder.svg?height=200&width=300",
    is_available: true,
    stock_quantity: 50,
    display_order: 1,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 2,
    category_id: 1,
    name: "Espetinho de Sobrecoxa",
    description: "Sobrecoxa de frango suculenta",
    price: 7.0,
    image_url: "/placeholder.svg?height=200&width=300",
    is_available: true,
    stock_quantity: 45,
    display_order: 2,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 3,
    category_id: 1,
    name: "Espetinho de Coração",
    description: "Coração de frango temperado",
    price: 6.5,
    image_url: "/placeholder.svg?height=200&width=300",
    is_available: true,
    stock_quantity: 30,
    display_order: 3,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 4,
    category_id: 1,
    name: "Espetinho de Linguiça",
    description: "Linguiça artesanal grelhada",
    price: 7.5,
    image_url: "/placeholder.svg?height=200&width=300",
    is_available: true,
    stock_quantity: 40,
    display_order: 4,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 5,
    category_id: 1,
    name: "Espetinho Misto",
    description: "Mix de carne, frango e linguiça",
    price: 9.0,
    image_url: "/placeholder.svg?height=200&width=300",
    is_available: true,
    stock_quantity: 25,
    display_order: 5,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },

  // Pães
  {
    id: 6,
    category_id: 2,
    name: "Pão de Alho",
    description: "Pão francês com manteiga de alho",
    price: 5.0,
    image_url: "/placeholder.svg?height=200&width=300",
    is_available: true,
    stock_quantity: 20,
    display_order: 1,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },

  // Lanches
  {
    id: 7,
    category_id: 3,
    name: "Lanche Pão Francês",
    description: "Lanche completo no pão francês",
    price: 12.0,
    image_url: "/placeholder.svg?height=200&width=300",
    is_available: true,
    stock_quantity: 15,
    display_order: 1,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 8,
    category_id: 3,
    name: "Lanche Pão de Alho",
    description: "Lanche especial no pão de alho",
    price: 14.0,
    image_url: "/placeholder.svg?height=200&width=300",
    is_available: true,
    stock_quantity: 12,
    display_order: 2,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },

  // Bebidas
  {
    id: 9,
    category_id: 4,
    name: "Água Mineral",
    description: "Água mineral 500ml",
    price: 3.0,
    image_url: "/placeholder.svg?height=200&width=300",
    is_available: true,
    stock_quantity: 100,
    display_order: 1,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 10,
    category_id: 4,
    name: "Suco Natural",
    description: "Suco natural da fruta",
    price: 6.0,
    image_url: "/placeholder.svg?height=200&width=300",
    is_available: true,
    stock_quantity: 30,
    display_order: 2,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },

  // Refrigerantes
  {
    id: 11,
    category_id: 5,
    name: "Coca-Cola",
    description: "Coca-Cola 350ml",
    price: 5.0,
    image_url: "/placeholder.svg?height=200&width=300",
    is_available: true,
    stock_quantity: 60,
    display_order: 1,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 12,
    category_id: 5,
    name: "Guaraná",
    description: "Guaraná Antarctica 350ml",
    price: 5.0,
    image_url: "/placeholder.svg?height=200&width=300",
    is_available: true,
    stock_quantity: 55,
    display_order: 2,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 13,
    category_id: 5,
    name: "Fanta",
    description: "Fanta Laranja 350ml",
    price: 5.0,
    image_url: "/placeholder.svg?height=200&width=300",
    is_available: true,
    stock_quantity: 50,
    display_order: 3,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },

  // Cervejas
  {
    id: 14,
    category_id: 6,
    name: "Brahma",
    description: "Brahma 350ml",
    price: 6.0,
    image_url: "/placeholder.svg?height=200&width=300",
    is_available: true,
    stock_quantity: 40,
    display_order: 1,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 15,
    category_id: 6,
    name: "Skol",
    description: "Skol 350ml",
    price: 6.0,
    image_url: "/placeholder.svg?height=200&width=300",
    is_available: true,
    stock_quantity: 35,
    display_order: 2,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 16,
    category_id: 6,
    name: "Heineken",
    description: "Heineken 350ml",
    price: 8.0,
    image_url: "/placeholder.svg?height=200&width=300",
    is_available: true,
    stock_quantity: 25,
    display_order: 3,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
]

const defaultSettings: Settings = {
  id: 1,
  logo_url: "/placeholder.svg?height=100&width=100",
  whatsapp_number: "5511999999999",
  store_name: "Espetinho do Sugano's",
  store_description: "Os melhores espetinhos da região! Feitos na hora com ingredientes frescos e tempero especial.",
  is_open: true,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
}

// Funções para gerenciar dados no localStorage
export class LocalStorageService {
  private static initializeData() {
    if (typeof window === "undefined") return

    if (!localStorage.getItem("categories")) {
      localStorage.setItem("categories", JSON.stringify(defaultCategories))
    }
    if (!localStorage.getItem("products")) {
      localStorage.setItem("products", JSON.stringify(defaultProducts))
    }
    if (!localStorage.getItem("settings")) {
      localStorage.setItem("settings", JSON.stringify(defaultSettings))
    }
  }

  static getCategories(): Category[] {
    this.initializeData()
    if (typeof window === "undefined") return defaultCategories

    const data = localStorage.getItem("categories")
    return data ? JSON.parse(data) : defaultCategories
  }

  static getProducts(): Product[] {
    this.initializeData()
    if (typeof window === "undefined") return defaultProducts

    const data = localStorage.getItem("products")
    return data ? JSON.parse(data) : defaultProducts
  }

  static getSettings(): Settings {
    this.initializeData()
    if (typeof window === "undefined") return defaultSettings

    const data = localStorage.getItem("settings")
    return data ? JSON.parse(data) : defaultSettings
  }

  static saveProduct(product: Omit<Product, "id" | "created_at" | "updated_at"> | Product): Product {
    const products = this.getProducts()
    const now = new Date().toISOString()

    if ("id" in product && product.id) {
      // Atualizar produto existente
      const index = products.findIndex((p) => p.id === product.id)
      if (index !== -1) {
        products[index] = { ...product, updated_at: now }
        localStorage.setItem("products", JSON.stringify(products))
        return products[index]
      }
    }

    // Criar novo produto
    const newId = Math.max(...products.map((p) => p.id), 0) + 1
    const newProduct: Product = {
      ...product,
      id: newId,
      created_at: now,
      updated_at: now,
    }

    products.push(newProduct)
    localStorage.setItem("products", JSON.stringify(products))
    return newProduct
  }

  static deleteProduct(id: number): boolean {
    const products = this.getProducts()
    const filteredProducts = products.filter((p) => p.id !== id)

    if (filteredProducts.length !== products.length) {
      localStorage.setItem("products", JSON.stringify(filteredProducts))
      return true
    }
    return false
  }

  static saveSettings(settings: Partial<Settings>): Settings {
    const currentSettings = this.getSettings()
    const updatedSettings = {
      ...currentSettings,
      ...settings,
      updated_at: new Date().toISOString(),
    }

    localStorage.setItem("settings", JSON.stringify(updatedSettings))
    return updatedSettings
  }

  static updateProductStock(id: number, quantity: number): boolean {
    const products = this.getProducts()
    const productIndex = products.findIndex((p) => p.id === id)

    if (productIndex !== -1) {
      products[productIndex].stock_quantity = Math.max(0, products[productIndex].stock_quantity - quantity)
      products[productIndex].updated_at = new Date().toISOString()
      localStorage.setItem("products", JSON.stringify(products))
      return true
    }
    return false
  }
}
