import { Monitor } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { GpuCardProps } from '../types'

export function GpuCard({ gpu }: GpuCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">GPU</CardTitle>
        <Monitor className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {gpu.map((gpuItem, index) => (
            <div key={index} className="space-y-1">
              <div className="text-sm font-medium">{gpuItem.name}</div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Uso: {gpuItem.load}%</span>
              </div>
              <div className="text-xs text-muted-foreground">
                {gpuItem.memory_used} / {gpuItem.memory_total}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
