import { MonitorData, ApiResponse } from './types'

export async function saveMonitorData(data: MonitorData, origin: string): Promise<void> {
  const monitorsResponse = await fetch(`${origin}/api/monitors`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  
  if (!monitorsResponse.ok) {
    throw new Error('Erro ao salvar dados na API')
  }
}

export function createSuccessResponse<T = unknown>(message: string, data?: T): ApiResponse<T> {
  return {
    success: true,
    message,
    data,
    receivedAt: new Date().toISOString()
  }
}

export function createErrorResponse(message: string, error?: string): ApiResponse {
  return {
    success: false,
    message,
    error: error || 'Erro desconhecido'
  }
}
