import { NextRequest, NextResponse } from 'next/server'
import { MonitorData, ApiResponse } from './types'
import { saveMonitorData, createSuccessResponse, createErrorResponse } from './utils'

export async function POST(request: NextRequest) {
  try {
    const data: MonitorData = await request.json()
    
    await saveMonitorData(data, request.nextUrl.origin)
    
    const response = createSuccessResponse('Dados de monitoramento recebidos com sucesso')
    return NextResponse.json(response, { status: 200 })
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido'
    const response = createErrorResponse('Erro ao processar dados de monitoramento', errorMessage)
    return NextResponse.json(response, { status: 400 })
  }
}

export async function GET() {
  const response: ApiResponse = {
    success: true,
    message: 'API de monitoramento ativa',
    data: {
      endpoint: '/api/monitor',
      methods: ['POST'],
      description: 'Envie dados de monitoramento do sistema via POST'
    }
  }
  
  return NextResponse.json(response, { status: 200 })
}
