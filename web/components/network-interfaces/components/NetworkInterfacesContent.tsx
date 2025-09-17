"use client"

import { useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
    <Card>
      <CardHeader>
        <CardTitle className="text-sm">Interfaces de Rede</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {interfaceCards}
        </div>
      </CardContent>
    </Card>
  )
}
