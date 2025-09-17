import { memo } from 'react'
import { Activity } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ProcessesCardProps } from '../types'
import { getStatusVariant } from '../utils'

function ProcessesCardComponent({ processes, cpuPercent }: ProcessesCardProps) {
  const variant = getStatusVariant(cpuPercent)

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Processos</CardTitle>
        <Activity className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{processes.length}</div>
        <p className="text-xs text-muted-foreground">
          Ativos no sistema
        </p>
        <div className="mt-2 flex gap-1">
          <Badge variant={variant} className="text-xs">
            CPU: {cpuPercent.toFixed(1)}%
          </Badge>
        </div>
      </CardContent>
    </Card>
  )
}

export const ProcessesCard = memo(ProcessesCardComponent)
