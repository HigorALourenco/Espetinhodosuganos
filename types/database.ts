export interface Database {
  public: {
    Tables: {
      settings: {
        Row: {
          id: number
          logo_url: string | null
          whatsapp_number: string
          store_name: string
          store_description: string
          is_open: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          logo_url?: string | null
          whatsapp_number?: string
          store_name?: string
          store_description?: string
          is_open?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          logo_url?: string | null
          whatsapp_number?: string
          store_name?: string
          store_description?: string
          is_open?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      appearance: {
        Row: {
          id: number
          background_image: string | null
          background_opacity: number
          primary_color: string
          secondary_color: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          background_image?: string | null
          background_opacity?: number
          primary_color?: string
          secondary_color?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          background_image?: string | null
          background_opacity?: number
          primary_color?: string
          secondary_color?: string
          created_at?: string
          updated_at?: string
        }
      }
      categories: {
        Row: {
          id: number
          name: string
          description: string | null
          display_order: number
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          name: string
          description?: string | null
          display_order?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          name?: string
          description?: string | null
          display_order?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      products: {
        Row: {
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
        Insert: {
          id?: number
          category_id: number
          name: string
          description?: string | null
          price: number
          image_url?: string | null
          is_available?: boolean
          stock_quantity?: number
          display_order?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          category_id?: number
          name?: string
          description?: string | null
          price?: number
          image_url?: string | null
          is_available?: boolean
          stock_quantity?: number
          display_order?: number
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}
