"use client"

import { createContext, useContext, ReactNode } from 'react'
import { NetworkInterface, NetworkInterfacesContextType } from './types'

const NetworkInterfacesContext = createContext<NetworkInterfacesContextType | undefined>(undefined)

type NetworkInterfacesProviderProps = {
  children: ReactNode
  interfaces: NetworkInterface[]
  isLoading?: boolean
  error?: string | null
  refreshInterfaces?: () => void
}

export function NetworkInterfacesProvider({ 
  children, 
  interfaces, 
  isLoading = false, 
  error = null, 
  refreshInterfaces = () => {} 
}: NetworkInterfacesProviderProps) {
  const value: NetworkInterfacesContextType = {
    interfaces,
    isLoading,
    error,
    refreshInterfaces
  }

  return (
    <NetworkInterfacesContext.Provider value={value}>
      {children}
    </NetworkInterfacesContext.Provider>
  )
}

export function useNetworkInterfacesContext(): NetworkInterfacesContextType {
  const context = useContext(NetworkInterfacesContext)
  
  if (context === undefined) {
    throw new Error('useNetworkInterfacesContext must be used within a NetworkInterfacesProvider')
  }
  
  return context
}
