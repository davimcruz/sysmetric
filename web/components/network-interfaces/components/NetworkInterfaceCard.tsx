import { useMemo } from 'react'
import { Network, Wifi, Cable, Globe } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { InterfaceBadge } from './InterfaceBadge'
import { getInterfaceType } from '../utils'
import { NetworkInterfaceCardProps } from '../types'

export function NetworkInterfaceCard({ interface: iface }: NetworkInterfaceCardProps) {
  const interfaceType = useMemo(() => getInterfaceType(iface.name), [iface.name])

  const getTranslatedName = (name: string) => {
    const lowerName = name.toLowerCase()
    if (lowerName.includes('lo') || lowerName.includes('loopback')) {
      return 'Interface Local'
    }
    if (lowerName.includes('en0') || lowerName.includes('eth0')) {
      return 'Ethernet Principal'
    }
    if (lowerName.includes('en1') || lowerName.includes('eth1')) {
      return 'Ethernet Secundária'
    }
    if (lowerName.includes('wifi') || lowerName.includes('wireless')) {
      return 'WiFi'
    }
    if (lowerName.includes('en')) {
      return 'Ethernet'
    }
    return name
  }

  const getInterfaceIcon = (name: string) => {
    const lowerName = name.toLowerCase()
    if (lowerName.includes('wifi') || lowerName.includes('wireless')) {
      return <Wifi className="h-4 w-4 text-blue-500" />
    }
    if (lowerName.includes('ethernet') || lowerName.includes('eth')) {
      return <Cable className="h-4 w-4 text-green-500" />
    }
    if (lowerName.includes('lo') || lowerName.includes('loopback')) {
      return <Globe className="h-4 w-4 text-purple-500" />
    }
    return <Network className="h-4 w-4 text-gray-500" />
  }

  const getInterfaceBgColor = (name: string) => {
    const lowerName = name.toLowerCase()
    if (lowerName.includes('wifi') || lowerName.includes('wireless')) {
      return 'bg-blue-50'
    }
    if (lowerName.includes('ethernet') || lowerName.includes('eth')) {
      return 'bg-green-50'
    }
    if (lowerName.includes('lo') || lowerName.includes('loopback')) {
      return 'bg-purple-50'
    }
    return 'bg-gray-50'
  }

  const getStatusColor = (ip: string) => {
    if (ip === '127.0.0.1' || ip.startsWith('127.')) {
      return 'text-purple-500'
    }
    if (ip && ip !== 'N/A') {
      return 'text-emerald-500'
    }
    return 'text-gray-500'
  }

  return (
    <Card className="relative overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <CardTitle className="text-base font-semibold text-gray-700">{getTranslatedName(iface.name)}</CardTitle>
        <div className={`p-2 rounded-lg ${getInterfaceBgColor(iface.name)}`}>
          {getInterfaceIcon(iface.name)}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Tipo:</span>
            <span className="font-medium text-gray-700">{interfaceType}</span>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Endereço IP:</span>
            <span className={`font-medium ${getStatusColor(iface.ip)}`}>
              {iface.ip}
            </span>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Máscara:</span>
            <span className="font-medium text-gray-700">{iface.netmask}</span>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Status:</span>
            <InterfaceBadge ip={iface.ip} />
          </div>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all duration-300 ${
              iface.ip && iface.ip !== 'N/A' && !iface.ip.startsWith('127.') ? 'bg-emerald-400' :
              iface.ip && iface.ip.startsWith('127.') ? 'bg-purple-400' : 'bg-gray-400'
            }`}
            style={{ 
              width: iface.ip && iface.ip !== 'N/A' ? '100%' : '25%'
            }}
          />
        </div>
      </CardContent>
    </Card>
  )
}
