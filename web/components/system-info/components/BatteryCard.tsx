import { Battery, BatteryCharging, Zap } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BatteryCardProps } from '../types'

export function BatteryCard({ battery }: BatteryCardProps) {
  const getBatteryColor = (percent: number) => {
    if (percent > 50) return "text-green-600"
    if (percent > 20) return "text-yellow-600"
    return "text-red-600"
  }

  const getBatteryBgColor = (percent: number) => {
    if (percent > 50) return "bg-green-100"
    if (percent > 20) return "bg-yellow-100"
    return "bg-red-100"
  }

  const getStatusColor = (plugged: boolean) => {
    return plugged ? "text-green-600" : "text-gray-600"
  }

  const formatTimeLeft = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`
    } else {
      return `${minutes}m`
    }
  }

  return (
    <Card className="relative overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <CardTitle className="text-base font-semibold text-gray-700">Bateria</CardTitle>
        <div className={`p-2 rounded-lg ${getBatteryBgColor(battery.percent)}`}>
          {battery.power_plugged ? (
            <BatteryCharging className="h-5 w-5 text-green-600" />
          ) : (
            <Battery className={`h-5 w-5 ${getBatteryColor(battery.percent)}`} />
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-baseline gap-2">
          <span className={`text-3xl font-bold ${getBatteryColor(battery.percent)}`}>
            {battery.percent}%
          </span>
          {battery.power_plugged && (
            <Zap className="h-4 w-4 text-green-500" />
          )}
        </div>
        
        <div className="space-y-1">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Status:</span>
            <span className={`font-medium ${getStatusColor(battery.power_plugged)}`}>
              {battery.power_plugged ? "Carregando" : "Desconectado"}
            </span>
          </div>
          
          {battery.time_left && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Tempo restante:</span>
              <span className="font-medium text-gray-700">
                {formatTimeLeft(battery.time_left)}
              </span>
            </div>
          )}
        </div>

        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all duration-300 ${
              battery.percent > 50 ? 'bg-green-500' : 
              battery.percent > 20 ? 'bg-yellow-500' : 'bg-red-500'
            }`}
            style={{ width: `${battery.percent}%` }}
          />
        </div>
      </CardContent>
    </Card>
  )
}
