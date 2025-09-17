import { MonitorData } from '../monitor/types'
import { StoredMonitorData, MonitorsResponse } from './types'

const MAX_MONITORS = 100

export function createStoredMonitorData(data: MonitorData): StoredMonitorData {
  return {
    ...data,
    lastUpdate: new Date().toISOString()
  }
}

export function updateOrAddMonitor(
  monitors: StoredMonitorData[], 
  newData: MonitorData
): StoredMonitorData[] {
  const existingIndex = monitors.findIndex(monitor => monitor.id === newData.id)
  const storedData = createStoredMonitorData(newData)
  
  if (existingIndex >= 0) {
    monitors[existingIndex] = storedData
  } else {
    monitors.push(storedData)
  }
  
  return monitors
}

export function cleanupOldMonitors(monitors: StoredMonitorData[]): StoredMonitorData[] {
  if (monitors.length > MAX_MONITORS) {
    return monitors.slice(-MAX_MONITORS)
  }
  return monitors
}

export function createSuccessResponse(
  message: string, 
  totalMonitors: number
): MonitorsResponse {
  return {
    success: true,
    message,
    totalMonitors
  }
}

export function createErrorResponse(
  message: string, 
  error?: string
): MonitorsResponse {
  return {
    success: false,
    message,
    error: error || 'Erro desconhecido'
  }
}
