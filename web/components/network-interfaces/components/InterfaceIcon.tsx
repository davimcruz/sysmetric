import { useMemo } from 'react'
import { Wifi, Cable } from "lucide-react"
import { isEthernetInterface } from '../utils'
import { InterfaceIconProps } from '../types'

export function InterfaceIcon({ name, className }: InterfaceIconProps) {
  const icon = useMemo(() => {
    if (isEthernetInterface(name)) {
      return <Cable className="h-4 w-4 text-gray-600" />
    }
    return <Wifi className="h-4 w-4 text-gray-600" />
  }, [name])
  
  return (
    <div className={className}>
      {icon}
    </div>
  )
}
