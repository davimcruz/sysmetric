import { Info } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SystemDetailsCardProps } from '../types'

export function SystemDetailsCard({ systemInfo }: SystemDetailsCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Sistema</CardTitle>
        <Info className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="text-sm">
            <span className="font-medium">Plataforma:</span>
            <span className="ml-2 text-muted-foreground">
              {systemInfo.platform}
            </span>
          </div>
          <div className="text-sm">
            <span className="font-medium">Processador:</span>
            <span className="ml-2 text-muted-foreground">
              {systemInfo.processor}
            </span>
          </div>
          <div className="text-sm">
            <span className="font-medium">Arquitetura:</span>
            <span className="ml-2 text-muted-foreground">
              {systemInfo.architecture}
            </span>
          </div>
          <div className="text-sm">
            <span className="font-medium">Python:</span>
            <span className="ml-2 text-muted-foreground">
              {systemInfo.python_version}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
