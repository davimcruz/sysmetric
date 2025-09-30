import { StoredMonitorData } from './types'

let monitors: StoredMonitorData[] = []

const CONNECTION_TIMEOUT = 15 * 1000 // 15 segundos em millisegundos

export function getAllMonitors(): StoredMonitorData[] {
  const now = Date.now()
  
  // Filtrar apenas máquinas que enviaram dados nos últimos 15 segundos
  const connectedMonitors = monitors.filter(monitor => {
    const lastUpdateTime = new Date(monitor.lastUpdate).getTime()
    return (now - lastUpdateTime) <= CONNECTION_TIMEOUT
  })
  
  return connectedMonitors
}

export function addOrUpdateMonitor(data: StoredMonitorData): void {
  const existingIndex = monitors.findIndex(monitor => monitor.id === data.id)
  
  if (existingIndex >= 0) {
    monitors[existingIndex] = data
  } else {
    monitors.push(data)
  }
}

export function cleanupMonitors(): void {
  const MAX_MONITORS = 100
  if (monitors.length > MAX_MONITORS) {
    monitors = monitors.slice(-MAX_MONITORS)
  }
}

export function getAllMonitorsIncludingDisconnected(): StoredMonitorData[] {
  return [...monitors]
}

export function getMonitorsCount(): number {
  return getAllMonitors().length
}

export function getTotalMonitorsCount(): number {
  return monitors.length
}

export function clearMonitors(): void {
  monitors = []
}
