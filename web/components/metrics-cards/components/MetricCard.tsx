import { memo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { MetricCardProps } from '../types'

function MetricCardComponent({ 
  title, 
  value, 
  subtitle, 
  progressValue, 
  icon
}: MetricCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">
          {subtitle}
        </p>
        <div className="mt-2">
          <Progress value={progressValue} className="h-2" />
        </div>
      </CardContent>
    </Card>
  )
}

export const MetricCard = memo(MetricCardComponent)
