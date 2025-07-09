// Simulação de upload para Google Drive/Photos
// Em produção, você integraria com a API real do Google
export class GoogleUploadService {
  private static readonly GOOGLE_DRIVE_API = "https://www.googleapis.com/drive/v3/files"

  // Simula upload para demonstração - substitua pela implementação real
  static async uploadImage(file: File, folder: "products" | "logo" | "background"): Promise<string> {
    return new Promise((resolve) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string

        // Simula delay de upload
        setTimeout(() => {
          // Em produção, aqui você faria o upload real para Google Drive
          // e retornaria a URL pública da imagem
          resolve(result)
        }, 1500)
      }
      reader.readAsDataURL(file)
    })
  }

  static async deleteImage(imageUrl: string): Promise<boolean> {
    // Simula exclusão da imagem
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true)
      }, 500)
    })
  }

  // Função para validar tipos de arquivo
  static validateImageFile(file: File): { valid: boolean; error?: string } {
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"]
    const maxSize = 5 * 1024 * 1024 // 5MB

    if (!allowedTypes.includes(file.type)) {
      return {
        valid: false,
        error: "Tipo de arquivo não suportado. Use JPG, PNG ou WebP.",
      }
    }

    if (file.size > maxSize) {
      return {
        valid: false,
        error: "Arquivo muito grande. Máximo 5MB.",
      }
    }

    return { valid: true }
  }
}
