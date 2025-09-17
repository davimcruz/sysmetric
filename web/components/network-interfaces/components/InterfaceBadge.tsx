import { useMemo } from 'react'
import { Badge } from "@/components/ui/badge"
import { getInterfaceStatus, getInterfaceStatusText } from '../utils'
import { InterfaceBadgeProps } from '../types'

export function InterfaceBadge({ ip, className }: InterfaceBadgeProps) {
  const { status, statusText } = useMemo(() => ({
    status: getInterfaceStatus(ip),
    statusText: getInterfaceStatusText(ip)
  }), [ip])

  return (
    <Badge 
      variant={status} 
      className={`text-xs mt-1 ${className || ''}`}
    >
      {statusText}
    </Badge>
  )
}
