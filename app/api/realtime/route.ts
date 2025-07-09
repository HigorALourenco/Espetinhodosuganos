import { type NextRequest, NextResponse } from "next/server"

// Estado em memória para armazenar os dados
let globalState = {
  lastUpdate: Date.now(),
  data: null as any,
}

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      lastUpdate: globalState.lastUpdate,
      data: globalState.data,
    })
  } catch (error) {
    console.error("Erro no GET /api/realtime:", error)
    return NextResponse.json({ success: false, error: "Erro interno do servidor" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Atualiza o estado global
    globalState = {
      lastUpdate: Date.now(),
      data: body,
    }

    console.log("📡 Dados atualizados:", body.type)

    return NextResponse.json({
      success: true,
      message: "Dados sincronizados com sucesso",
      timestamp: globalState.lastUpdate,
    })
  } catch (error) {
    console.error("Erro no POST /api/realtime:", error)
    return NextResponse.json({ success: false, error: "Erro ao processar dados" }, { status: 500 })
  }
}
