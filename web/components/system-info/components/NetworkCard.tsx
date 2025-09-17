import { Wifi } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { NetworkCardProps } from '../types'

export function NetworkCard({ network }: NetworkCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Rede</CardTitle>
        <Wifi className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Enviados:</span>
            <span>{network.bytes_sent}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Recebidos:</span>
            <span>{network.bytes_recv}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Pacotes:</span>
            <span>{network.packets_sent + network.packets_recv}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
