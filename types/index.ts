export interface Product {
  id: number
  category_id: number
  name: string
  description: string | null
  price: number
  image_url: string | null
  is_available: boolean
  stock_quantity: number
  display_order: number
  created_at: string
  updated_at: string
}

export interface Category {
  id: number
  name: string
  description: string | null
  display_order: number
  is_active: boolean
  created_at: string
}

export interface Settings {
  id: number
  logo_url: string | null
  whatsapp_number: string
  store_name: string
  store_description: string
  is_open: boolean
  created_at: string
  updated_at: string
}

export interface CartItem {
  product: Product
  quantity: number
}
