import { memo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MetricCardProps } from '../types'

function MetricCardComponent({ 
  title, 
  value, 
  subtitle, 
  progressValue, 
  icon
}: MetricCardProps) {
  const getProgressColor = (value: number) => {
    if (value < 50) return 'bg-emerald-400'
    if (value < 80) return 'bg-amber-400'
    return 'bg-orange-400'
  }

  const getProgressBgColor = (value: number) => {
    if (value < 50) return 'bg-emerald-50'
    if (value < 80) return 'bg-amber-50'
    return 'bg-orange-50'
  }

  const getValueColor = (value: number) => {
    if (value < 50) return 'text-emerald-500'
    if (value < 80) return 'text-amber-500'
    return 'text-orange-500'
  }

  return (
    <Card className="relative overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <CardTitle className="text-base font-semibold text-gray-700">{title}</CardTitle>
        <div className={`p-2 rounded-lg ${getProgressBgColor(progressValue)}`}>
          <div className={`h-5 w-5 ${getValueColor(progressValue)}`}>{icon}</div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex items-baseline gap-2">
          <span className={`text-3xl font-bold ${getValueColor(progressValue)}`}>{value}</span>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Status:</span>
            <span className="font-medium text-gray-700">{subtitle}</span>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Utilização:</span>
            <span className={`font-medium ${getValueColor(progressValue)}`}>
              {progressValue.toFixed(1)}%
            </span>
          </div>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(progressValue)}`}
            style={{ width: `${Math.min(progressValue, 100)}%` }}
          />
        </div>
      </CardContent>
    </Card>
  )
}

export const MetricCard = memo(MetricCardComponent)
