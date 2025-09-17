import { Clock } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatUptime, formatBootTime } from '../utils'

type BootTimeCardProps = {
  bootTime: string;
}

export function BootTimeCard({ bootTime }: BootTimeCardProps) {
  const uptime = formatUptime(bootTime)
  const bootDate = formatBootTime(bootTime)

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Tempo de Atividade</CardTitle>
        <Clock className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {uptime}
        </div>
        <p className="text-xs text-muted-foreground">
          Desde {bootDate}
        </p>
      </CardContent>
    </Card>
  )
}
