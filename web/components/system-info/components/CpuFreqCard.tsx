import { Cpu } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CpuFreqCardProps } from '../types'

export function CpuFreqCard({ cpuFreq }: CpuFreqCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Frequência CPU</CardTitle>
        <Cpu className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {cpuFreq.current} MHz
        </div>
        <p className="text-xs text-muted-foreground">
          {cpuFreq.min} - {cpuFreq.max} MHz
        </p>
      </CardContent>
    </Card>
  )
}
