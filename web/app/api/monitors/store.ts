import { StoredMonitorData } from './types'

let monitors: StoredMonitorData[] = []

export function getAllMonitors(): StoredMonitorData[] {
  return [...monitors]
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

export function getMonitorsCount(): number {
  return monitors.length
}

export function clearMonitors(): void {
  monitors = []
}
