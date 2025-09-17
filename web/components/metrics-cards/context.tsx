"use client"

import { createContext, useContext, ReactNode } from 'react'
import { MonitorData, MetricsContextType } from './types'

const MetricsContext = createContext<MetricsContextType | undefined>(undefined)

type MetricsProviderProps = {
  children: ReactNode
  data: MonitorData | null
  isLoading?: boolean
  error?: string | null
  refreshData?: () => void
}

export function MetricsProvider({ 
  children, 
  data, 
  isLoading = false, 
  error = null, 
  refreshData = () => {} 
}: MetricsProviderProps) {
  const value: MetricsContextType = {
    data,
    isLoading,
    error,
    refreshData
  }

  return (
    <MetricsContext.Provider value={value}>
      {children}
    </MetricsContext.Provider>
  )
}

export function useMetricsContext(): MetricsContextType {
  const context = useContext(MetricsContext)
  
  if (context === undefined) {
    throw new Error('useMetricsContext must be used within a MetricsProvider')
  }
  
  return context
}
