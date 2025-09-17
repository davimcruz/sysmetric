"use client"

import { NetworkInterfacesProvider } from './context'
import { NetworkInterfacesContent } from './components/NetworkInterfacesContent'
import { NetworkInterfacesProps } from './types'

export function NetworkInterfaces({ interfaces }: NetworkInterfacesProps) {
  return (
    <NetworkInterfacesProvider interfaces={interfaces}>
      <NetworkInterfacesContent />
    </NetworkInterfacesProvider>
  )
}
