import { Battery, BatteryCharging } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BatteryCardProps } from '../types'

export function BatteryCard({ battery }: BatteryCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Bateria</CardTitle>
        {battery.power_plugged ? (
          <BatteryCharging className="h-4 w-4 text-green-500" />
        ) : (
          <Battery className="h-4 w-4 text-muted-foreground" />
        )}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {battery.percent}%
        </div>
        <p className="text-xs text-muted-foreground">
          {battery.power_plugged ? "Conectado" : "Desconectado"}
          {battery.time_left && (
            <span className="block">
              {battery.time_left} restante
            </span>
          )}
        </p>
      </CardContent>
    </Card>
  )
}
