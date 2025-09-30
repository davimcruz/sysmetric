"use client"

import { useState, useEffect, useMemo } from "react"
import { Bell, AlertTriangle, CheckCircle, Info, Wifi, Cpu, HardDrive, MemoryStick, WifiOff, Server } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type NotificationType = 'success' | 'warning' | 'error' | 'info'

type Notification = {
  id: string
  type: NotificationType
  title: string
  message: string
  timestamp: Date
  icon?: React.ReactNode
  read?: boolean
}

type NotificationsProps = {
  monitorsCount: number
  previousMonitorsCount: number
  systemData?: {
    cpu_percent: number
    memory_percent: number
    disk_percent: number
  }
  previousSystemData?: {
    cpu_percent: number
    memory_percent: number
    disk_percent: number
  }
}

export function Notifications({ 
  monitorsCount, 
  previousMonitorsCount, 
  systemData, 
  previousSystemData 
}: NotificationsProps) {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setNotifications(prev => 
        prev.map(notif => ({ ...notif, read: true }))
      )
    }
  }, [isOpen])

  const newNotifications = useMemo(() => {
    const newNotifs: Notification[] = []
    const now = new Date()

    if (monitorsCount > previousMonitorsCount) {
      newNotifs.push({
        id: `machine-connected-${now.getTime()}`,
        type: 'success',
        title: 'Nova Máquina Conectada',
        message: `${monitorsCount - previousMonitorsCount} nova(s) máquina(s) conectada(s) ao sistema`,
        timestamp: now,
        icon: <Server className="h-4 w-4" />
      })
    }

    if (monitorsCount < previousMonitorsCount) {
      newNotifs.push({
        id: `machine-disconnected-${now.getTime()}`,
        type: 'warning',
        title: 'Máquina Desconectada',
        message: `${previousMonitorsCount - monitorsCount} máquina(s) desconectada(s) do sistema`,
        timestamp: now,
        icon: <WifiOff className="h-4 w-4" />
      })
    }

    if (systemData && previousSystemData) {
      if (systemData.cpu_percent > 80 && previousSystemData.cpu_percent <= 80) {
        newNotifs.push({
          id: `cpu-high-${now.getTime()}`,
          type: 'warning',
          title: 'CPU em Alto Uso',
          message: `CPU atingiu ${systemData.cpu_percent.toFixed(1)}% de utilização`,
          timestamp: now,
          icon: <Cpu className="h-4 w-4" />
        })
      }

      if (systemData.memory_percent > 85 && previousSystemData.memory_percent <= 85) {
        newNotifs.push({
          id: `memory-high-${now.getTime()}`,
          type: 'warning',
          title: 'Memória em Alto Uso',
          message: `Memória atingiu ${systemData.memory_percent.toFixed(1)}% de utilização`,
          timestamp: now,
          icon: <MemoryStick className="h-4 w-4" />
        })
      }

      if (systemData.disk_percent > 90 && previousSystemData.disk_percent <= 90) {
        newNotifs.push({
          id: `disk-high-${now.getTime()}`,
          type: 'error',
          title: 'Disco Quase Cheio',
          message: `Disco atingiu ${systemData.disk_percent.toFixed(1)}% de utilização`,
          timestamp: now,
          icon: <HardDrive className="h-4 w-4" />
        })
      }

      if (systemData.cpu_percent < 50 && previousSystemData.cpu_percent >= 80) {
        newNotifs.push({
          id: `cpu-normal-${now.getTime()}`,
          type: 'success',
          title: 'CPU Normalizada',
          message: `CPU voltou ao normal (${systemData.cpu_percent.toFixed(1)}%)`,
          timestamp: now,
          icon: <CheckCircle className="h-4 w-4" />
        })
      }
    }

    return newNotifs
  }, [monitorsCount, previousMonitorsCount, systemData, previousSystemData])

  useEffect(() => {
    if (newNotifications.length > 0) {
      setNotifications(prev => [...newNotifications, ...prev])
    }
  }, [newNotifications])

  const notificationCount = notifications.filter(notif => !notif.read).length

  const getNotificationColor = (type: NotificationType) => {
    switch (type) {
      case 'success':
        return 'text-emerald-600'
      case 'warning':
        return 'text-amber-600'
      case 'error':
        return 'text-red-600'
      case 'info':
        return 'text-blue-600'
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("pt-BR", { 
      hour: '2-digit', 
      minute: '2-digit' 
    })
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="relative cursor-pointer"
        >
          <Bell className="h-4 w-4" />
          {notificationCount > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
            >
              {notificationCount > 9 ? '9+' : notificationCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent align="end" className="w-80">
        <div className="p-3 border-b border-gray-200">
          <h3 className="text-sm font-semibold text-gray-900">Notificações</h3>
        </div>
        
        <div className="max-h-80 overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="p-4 text-center text-gray-500 text-sm">
              Nenhuma notificação
            </div>
          ) : (
            notifications.slice(0, 8).map((notification) => (
              <div
                key={notification.id}
                className="p-3 border-b border-gray-100 hover:bg-gray-50"
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-0.5">
                    {notification.icon}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className={`text-sm font-medium ${getNotificationColor(notification.type)} truncate`}>
                        {notification.title}
                      </h4>
                      <span className="text-xs text-gray-500">
                        {formatTime(notification.timestamp)}
                      </span>
                    </div>
                    
                    <p className="text-xs text-gray-600 mt-1">
                      {notification.message}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
