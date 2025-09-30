import { memo } from 'react'
import { Activity } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ProcessesCardProps } from '../types'

function ProcessesCardComponent({ processes, cpuPercent }: ProcessesCardProps) {
  const getCpuColor = (percent: number) => {
    if (percent < 50) return 'text-emerald-500'
    if (percent < 80) return 'text-amber-500'
    return 'text-orange-500'
  }

  const getCpuBgColor = (percent: number) => {
    if (percent < 50) return 'bg-emerald-50'
    if (percent < 80) return 'bg-amber-50'
    return 'bg-orange-50'
  }

  const getStatusText = (percent: number) => {
    if (percent < 50) return 'Baixo'
    if (percent < 80) return 'Médio'
    return 'Alto'
  }

  return (
    <Card className="relative overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <CardTitle className="text-base font-semibold text-gray-700">Processos</CardTitle>
        <div className={`p-2 rounded-lg ${getCpuBgColor(cpuPercent)}`}>
          <Activity className={`h-5 w-5 ${getCpuColor(cpuPercent)}`} />
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex items-center">
          <span className="text-3xl font-bold text-emerald-500">{processes.length}</span>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Uso de CPU:</span>
            <span className={`font-medium ${getCpuColor(cpuPercent)}`}>
              {cpuPercent.toFixed(1)}%
            </span>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Carga:</span>
            <span className={`font-medium ${getCpuColor(cpuPercent)}`}>
              {getStatusText(cpuPercent)}
            </span>
          </div>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all duration-300 ${
              cpuPercent < 50 ? 'bg-emerald-400' : 
              cpuPercent < 80 ? 'bg-amber-400' : 'bg-orange-400'
            }`}
            style={{ width: `${Math.min(cpuPercent, 100)}%` }}
          />
        </div>
      </CardContent>
    </Card>
  )
}

export const ProcessesCard = memo(ProcessesCardComponent)
