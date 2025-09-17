import { useMemo } from 'react'
import { InterfaceIcon } from './InterfaceIcon'
import { InterfaceBadge } from './InterfaceBadge'
import { getInterfaceType } from '../utils'
import { NetworkInterfaceCardProps } from '../types'

export function NetworkInterfaceCard({ interface: iface }: NetworkInterfaceCardProps) {
  const interfaceType = useMemo(() => getInterfaceType(iface.name), [iface.name])

  return (
    <div className="flex items-center justify-between p-3 border rounded-lg">
      <div className="flex items-center gap-3">
        <InterfaceIcon name={iface.name} />
        <div>
          <div className="font-medium text-sm">{iface.name}</div>
          <div className="text-xs text-muted-foreground">
            {interfaceType}
          </div>
        </div>
      </div>
      <div className="text-right">
        <div className="text-sm font-medium">{iface.ip}</div>
        <div className="text-xs text-muted-foreground">
          {iface.netmask}
        </div>
        <InterfaceBadge ip={iface.ip} />
      </div>
    </div>
  )
}
