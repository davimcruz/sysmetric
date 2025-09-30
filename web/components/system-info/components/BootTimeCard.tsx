import { Clock, Timer } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatUptime, formatBootTime } from '../utils'

type BootTimeCardProps = {
  bootTime: string;
}

export function BootTimeCard({ bootTime }: BootTimeCardProps) {
  const uptime = formatUptime(bootTime)
  const bootDate = formatBootTime(bootTime)

  const getUptimeColor = (uptimeText: string) => {
    if (uptimeText.includes('dias')) {
      const days = parseInt(uptimeText.split(' ')[0])
      if (days > 7) return "text-emerald-500"
      if (days > 3) return "text-amber-500"
      return "text-orange-500"
    }
    if (uptimeText.includes('horas')) {
      const hours = parseInt(uptimeText.split(' ')[0])
      if (hours > 24) return "text-amber-500"
      return "text-orange-500"
    }
    if (uptimeText.includes('minutos')) {
      return "text-orange-500"
    }
    return "text-gray-600"
  }

  const getUptimeBgColor = (uptimeText: string) => {
    if (uptimeText.includes('dias')) {
      const days = parseInt(uptimeText.split(' ')[0])
      if (days > 7) return "bg-emerald-50"
      if (days > 3) return "bg-amber-50"
      return "bg-orange-50"
    }
    if (uptimeText.includes('horas')) {
      const hours = parseInt(uptimeText.split(' ')[0])
      if (hours > 24) return "bg-amber-50"
      return "bg-orange-50"
    }
    if (uptimeText.includes('minutos')) {
      return "bg-orange-50"
    }
    return "bg-gray-50"
  }

  return (
    <Card className="relative overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <CardTitle className="text-base font-semibold text-gray-700">Tempo de Atividade</CardTitle>
        <div className={`p-2 rounded-lg ${getUptimeBgColor(uptime)}`}>
          <Clock className={`h-5 w-5 ${getUptimeColor(uptime)}`} />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-baseline gap-2">
          <span className={`text-3xl font-bold ${getUptimeColor(uptime)}`}>
            {uptime}
          </span>
          <Timer className={`h-4 w-4 ${getUptimeColor(uptime)}`} />
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Último boot:</span>
            <span className="font-medium text-gray-700">
              {bootDate}
            </span>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Status:</span>
            <span className={`font-medium ${getUptimeColor(uptime)}`}>
              {uptime.includes('dias') && parseInt(uptime.split(' ')[0]) > 7 ? 'Estável' :
               uptime.includes('dias') && parseInt(uptime.split(' ')[0]) > 3 ? 'Bom' :
               uptime.includes('horas') && parseInt(uptime.split(' ')[0]) > 24 ? 'Recente' : 'Recém iniciado'}
            </span>
          </div>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all duration-300 ${
              uptime.includes('dias') && parseInt(uptime.split(' ')[0]) > 7 ? 'bg-emerald-400' :
              uptime.includes('dias') && parseInt(uptime.split(' ')[0]) > 3 ? 'bg-amber-400' :
              uptime.includes('horas') && parseInt(uptime.split(' ')[0]) > 24 ? 'bg-amber-400' : 'bg-orange-400'
            }`}
            style={{ 
              width: uptime.includes('dias') && parseInt(uptime.split(' ')[0]) > 7 ? '100%' :
                     uptime.includes('dias') && parseInt(uptime.split(' ')[0]) > 3 ? '75%' :
                     uptime.includes('horas') && parseInt(uptime.split(' ')[0]) > 24 ? '50%' : '25%'
            }}
          />
        </div>
      </CardContent>
    </Card>
  )
}
