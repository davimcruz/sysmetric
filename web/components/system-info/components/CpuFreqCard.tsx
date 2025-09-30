import { Cpu, Zap, TrendingUp } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CpuFreqCardProps } from '../types'

export function CpuFreqCard({ cpuFreq }: CpuFreqCardProps) {
  const getFreqColor = (current: number, max: number) => {
    const percentage = (current / max) * 100
    if (percentage > 80) return "text-orange-500"
    if (percentage > 60) return "text-amber-500"
    return "text-emerald-500"
  }

  const getFreqBgColor = (current: number, max: number) => {
    const percentage = (current / max) * 100
    if (percentage > 80) return "bg-orange-50"
    if (percentage > 60) return "bg-amber-50"
    return "bg-emerald-50"
  }

  return (
    <Card className="relative overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <CardTitle className="text-base font-semibold text-gray-700">Frequência CPU</CardTitle>
        <div className={`p-2 rounded-lg ${getFreqBgColor(cpuFreq.current, cpuFreq.max)}`}>
          <Cpu className={`h-5 w-5 ${getFreqColor(cpuFreq.current, cpuFreq.max)}`} />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-baseline gap-2">
          <span className={`text-3xl font-bold ${getFreqColor(cpuFreq.current, cpuFreq.max)}`}>
            {cpuFreq.current} MHz
          </span>
          <Zap className="h-4 w-4 text-amber-400" />
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Faixa de operação:</span>
            <span className="font-medium text-gray-700">
              {cpuFreq.min} - {cpuFreq.max} MHz
            </span>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Utilização:</span>
            <span className="font-medium text-gray-700">
              {Math.round((cpuFreq.current / cpuFreq.max) * 100)}%
            </span>
          </div>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all duration-300 ${
              (cpuFreq.current / cpuFreq.max) > 0.8 ? 'bg-orange-400' : 
              (cpuFreq.current / cpuFreq.max) > 0.6 ? 'bg-amber-400' : 'bg-emerald-400'
            }`}
            style={{ width: `${(cpuFreq.current / cpuFreq.max) * 100}%` }}
          />
        </div>
      </CardContent>
    </Card>
  )
}
