"use client"

import { useMemo } from "react"
import { Clock, Wifi } from "lucide-react"
import { Badge } from "@/components/ui/badge"

type StatusIndicatorProps = {
  monitorsCount: number
  lastUpdate: Date
  isOnline: boolean
}

export function StatusIndicator({ monitorsCount, lastUpdate, isOnline }: StatusIndicatorProps) {
  const statusText = useMemo(() => 
    `${monitorsCount} máquina${monitorsCount !== 1 ? "s" : ""} conectada${
      monitorsCount !== 1 ? "s" : ""
    }`, [monitorsCount]
  )
  
  const lastUpdateTime = useMemo(() => 
    lastUpdate.toLocaleTimeString("pt-BR"), [lastUpdate]
  )

  return (
    <div className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Wifi className="h-4 w-4 text-green-600" />
          <span className="text-sm font-medium text-gray-900">{statusText}</span>
        </div>
        
        <div className="flex items-center gap-2 text-sm text-gray-700">
          <Clock className="h-4 w-4 text-gray-600" />
          <span>Última atualização: {lastUpdateTime}</span>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <Badge variant={isOnline ? "default" : "destructive"} className="bg-green-100 text-green-800 border-green-200">
          {isOnline ? "Online" : "Offline"}
        </Badge>
        <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-500' : 'bg-red-500'}`} />
      </div>
    </div>
  )
}