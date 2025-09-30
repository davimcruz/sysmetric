"use client"

import { useMemo } from 'react'
import { useNetworkInterfaces } from '../hooks/use-network-interfaces'
import { EmptyInterfacesCard } from './EmptyInterfacesCard'
import { NetworkInterfaceCard } from './NetworkInterfaceCard'

export function NetworkInterfacesContent() {
  const { interfaces, hasInterfaces } = useNetworkInterfaces()

  const interfaceCards = useMemo(() => {
    return interfaces.map((iface) => (
      <NetworkInterfaceCard 
        key={iface.index} 
        interface={iface} 
        index={iface.index} 
      />
    ))
  }, [interfaces])

  if (!hasInterfaces) {
    return <EmptyInterfacesCard />
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {interfaceCards}
    </div>
  )
}
