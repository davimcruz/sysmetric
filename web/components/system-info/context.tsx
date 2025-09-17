"use client"

import { createContext, useContext, ReactNode } from 'react'
import { SystemInfoData, SystemInfoContextType } from './types'

const SystemInfoContext = createContext<SystemInfoContextType | undefined>(undefined)

type SystemInfoProviderProps = {
  children: ReactNode
  data: SystemInfoData | null
  isLoading?: boolean
  error?: string | null
  refreshData?: () => void
}

export function SystemInfoProvider({ 
  children, 
  data, 
  isLoading = false, 
  error = null, 
  refreshData = () => {} 
}: SystemInfoProviderProps) {
  const value: SystemInfoContextType = {
    data,
    isLoading,
    error,
    refreshData
  }

  return (
    <SystemInfoContext.Provider value={value}>
      {children}
    </SystemInfoContext.Provider>
  )
}

export function useSystemInfoContext(): SystemInfoContextType {
  const context = useContext(SystemInfoContext)
  
  if (context === undefined) {
    throw new Error('useSystemInfoContext must be used within a SystemInfoProvider')
  }
  
  return context
}
