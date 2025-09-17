import { MonitorData } from '../monitor/types'

export type StoredMonitorData = MonitorData & {
  lastUpdate: string
}

export type MonitorsResponse = {
  success: boolean
  message: string
  totalMonitors?: number
  error?: string
}

export type MonitorsData = {
  monitors: StoredMonitorData[]
  totalCount: number
  lastCleanup?: string
}
