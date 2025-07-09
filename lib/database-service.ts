import { supabase, isSupabaseEnabled } from "./supabase"
import { LocalStorageService } from "./local-storage"
import type { Product, Category, Settings } from "@/types"

export interface AppearanceSettings {
  id: number
  background_image: string | null
  background_opacity: number
  primary_color: string
  secondary_color: string
  created_at: string
  updated_at: string
}

export class DatabaseService {
  // PRODUTOS
  static async getProducts(): Promise<Product[]> {
    if (!isSupabaseEnabled) {
      return LocalStorageService.getProducts()
    }

    try {
      const { data, error } = await supabase!.from("products").select("*").order("display_order", { ascending: true })

      if (error) {
        console.error("Erro ao buscar produtos:", error)
        return LocalStorageService.getProducts()
      }

      return data || []
    } catch (error) {
      console.error("Erro na conexão com Supabase:", error)
      return LocalStorageService.getProducts()
    }
  }

  static async saveProduct(
    product: Omit<Product, "id" | "created_at" | "updated_at"> | Product,
  ): Promise<Product | null> {
    if (!isSupabaseEnabled) {
      return LocalStorageService.saveProduct(product)
    }

    try {
      if ("id" in product && product.id) {
        // Atualizar produto existente
        const { data, error } = await supabase!
          .from("products")
          .update({
            ...product,
            updated_at: new Date().toISOString(),
          })
          .eq("id", product.id)
          .select()
          .single()

        if (error) {
          console.error("Erro ao atualizar produto:", error)
          return LocalStorageService.saveProduct(product)
        }

        return data
      } else {
        // Criar novo produto
        const { data, error } = await supabase!.from("products").insert([product]).select().single()

        if (error) {
          console.error("Erro ao criar produto:", error)
          return LocalStorageService.saveProduct(product)
        }

        return data
      }
    } catch (error) {
      console.error("Erro na conexão com Supabase:", error)
      return LocalStorageService.saveProduct(product)
    }
  }

  static async deleteProduct(id: number): Promise<boolean> {
    if (!isSupabaseEnabled) {
      return LocalStorageService.deleteProduct(id)
    }

    try {
      const { error } = await supabase!.from("products").delete().eq("id", id)

      if (error) {
        console.error("Erro ao deletar produto:", error)
        return LocalStorageService.deleteProduct(id)
      }

      return true
    } catch (error) {
      console.error("Erro na conexão com Supabase:", error)
      return LocalStorageService.deleteProduct(id)
    }
  }

  // CATEGORIAS
  static async getCategories(): Promise<Category[]> {
    if (!isSupabaseEnabled) {
      return LocalStorageService.getCategories()
    }

    try {
      const { data, error } = await supabase!.from("categories").select("*").order("display_order", { ascending: true })

      if (error) {
        console.error("Erro ao buscar categorias:", error)
        return LocalStorageService.getCategories()
      }

      return data || []
    } catch (error) {
      console.error("Erro na conexão com Supabase:", error)
      return LocalStorageService.getCategories()
    }
  }

  // CONFIGURAÇÕES
  static async getSettings(): Promise<Settings | null> {
    if (!isSupabaseEnabled) {
      return LocalStorageService.getSettings()
    }

    try {
      const { data, error } = await supabase!.from("settings").select("*").limit(1).single()

      if (error) {
        console.error("Erro ao buscar configurações:", error)
        return LocalStorageService.getSettings()
      }

      return data
    } catch (error) {
      console.error("Erro na conexão com Supabase:", error)
      return LocalStorageService.getSettings()
    }
  }

  static async saveSettings(settings: Partial<Settings>): Promise<Settings | null> {
    if (!isSupabaseEnabled) {
      return LocalStorageService.saveSettings(settings)
    }

    try {
      // Primeiro, verificar se já existe um registro
      const { data: existing } = await supabase!.from("settings").select("id").limit(1).single()

      if (existing) {
        // Atualizar registro existente
        const { data, error } = await supabase!
          .from("settings")
          .update({
            ...settings,
            updated_at: new Date().toISOString(),
          })
          .eq("id", existing.id)
          .select()
          .single()

        if (error) {
          console.error("Erro ao atualizar configurações:", error)
          return LocalStorageService.saveSettings(settings)
        }

        return data
      } else {
        // Criar novo registro
        const { data, error } = await supabase!.from("settings").insert([settings]).select().single()

        if (error) {
          console.error("Erro ao criar configurações:", error)
          return LocalStorageService.saveSettings(settings)
        }

        return data
      }
    } catch (error) {
      console.error("Erro na conexão com Supabase:", error)
      return LocalStorageService.saveSettings(settings)
    }
  }

  // APARÊNCIA
  static async getAppearance(): Promise<AppearanceSettings | null> {
    if (!isSupabaseEnabled) {
      const localAppearance = LocalStorageService.getAppearance()
      return {
        id: 1,
        background_image: localAppearance.background_image,
        background_opacity: localAppearance.background_opacity,
        primary_color: localAppearance.primary_color,
        secondary_color: localAppearance.secondary_color,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }
    }

    try {
      const { data, error } = await supabase!.from("appearance").select("*").limit(1).single()

      if (error) {
        console.error("Erro ao buscar aparência:", error)
        const localAppearance = LocalStorageService.getAppearance()
        return {
          id: 1,
          background_image: localAppearance.background_image,
          background_opacity: localAppearance.background_opacity,
          primary_color: localAppearance.primary_color,
          secondary_color: localAppearance.secondary_color,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }
      }

      return data
    } catch (error) {
      console.error("Erro na conexão com Supabase:", error)
      const localAppearance = LocalStorageService.getAppearance()
      return {
        id: 1,
        background_image: localAppearance.background_image,
        background_opacity: localAppearance.background_opacity,
        primary_color: localAppearance.primary_color,
        secondary_color: localAppearance.secondary_color,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }
    }
  }

  static async saveAppearance(appearance: Partial<AppearanceSettings>): Promise<AppearanceSettings | null> {
    if (!isSupabaseEnabled) {
      LocalStorageService.saveAppearance(appearance)
      const localAppearance = LocalStorageService.getAppearance()
      return {
        id: 1,
        background_image: localAppearance.background_image,
        background_opacity: localAppearance.background_opacity,
        primary_color: localAppearance.primary_color,
        secondary_color: localAppearance.secondary_color,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }
    }

    try {
      // Primeiro, verificar se já existe um registro
      const { data: existing } = await supabase!.from("appearance").select("id").limit(1).single()

      if (existing) {
        // Atualizar registro existente
        const { data, error } = await supabase!
          .from("appearance")
          .update({
            ...appearance,
            updated_at: new Date().toISOString(),
          })
          .eq("id", existing.id)
          .select()
          .single()

        if (error) {
          console.error("Erro ao atualizar aparência:", error)
          LocalStorageService.saveAppearance(appearance)
          const localAppearance = LocalStorageService.getAppearance()
          return {
            id: 1,
            background_image: localAppearance.background_image,
            background_opacity: localAppearance.background_opacity,
            primary_color: localAppearance.primary_color,
            secondary_color: localAppearance.secondary_color,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          }
        }

        return data
      } else {
        // Criar novo registro
        const { data, error } = await supabase!.from("appearance").insert([appearance]).select().single()

        if (error) {
          console.error("Erro ao criar aparência:", error)
          LocalStorageService.saveAppearance(appearance)
          const localAppearance = LocalStorageService.getAppearance()
          return {
            id: 1,
            background_image: localAppearance.background_image,
            background_opacity: localAppearance.background_opacity,
            primary_color: localAppearance.primary_color,
            secondary_color: localAppearance.secondary_color,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          }
        }

        return data
      }
    } catch (error) {
      console.error("Erro na conexão com Supabase:", error)
      LocalStorageService.saveAppearance(appearance)
      const localAppearance = LocalStorageService.getAppearance()
      return {
        id: 1,
        background_image: localAppearance.background_image,
        background_opacity: localAppearance.background_opacity,
        primary_color: localAppearance.primary_color,
        secondary_color: localAppearance.secondary_color,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }
    }
  }
}
