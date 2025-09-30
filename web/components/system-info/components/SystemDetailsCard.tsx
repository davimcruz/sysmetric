import { Info, Monitor, Cpu, HardDrive, Code } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SystemDetailsCardProps } from '../types'

export function SystemDetailsCard({ systemInfo }: SystemDetailsCardProps) {
  const getSystemIcon = (type: string) => {
    switch (type) {
      case 'platform':
        return <Monitor className="h-4 w-4 text-blue-500" />
      case 'processor':
        return <Cpu className="h-4 w-4 text-green-500" />
      case 'architecture':
        return <HardDrive className="h-4 w-4 text-purple-500" />
      case 'python':
        return <Code className="h-4 w-4 text-yellow-500" />
      default:
        return <Info className="h-4 w-4 text-gray-500" />
    }
  }

  return (
    <Card className="relative overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <CardTitle className="text-base font-semibold text-gray-700">Sistema</CardTitle>
        <div className="p-2 rounded-lg bg-blue-100">
          <Info className="h-5 w-5 text-blue-600" />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2">
              {getSystemIcon('platform')}
              <span className="text-xs font-medium text-gray-700">Plataforma</span>
            </div>
            <span className="text-xs font-semibold text-gray-900">{systemInfo.platform}</span>
          </div>
          
          <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2">
              {getSystemIcon('processor')}
              <span className="text-xs font-medium text-gray-700">Processador</span>
            </div>
            <span className="text-xs font-semibold text-gray-900">{systemInfo.processor}</span>
          </div>
          
          <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2">
              {getSystemIcon('architecture')}
              <span className="text-xs font-medium text-gray-700">Arquitetura</span>
            </div>
            <span className="text-xs font-semibold text-gray-900">{systemInfo.architecture}</span>
          </div>
          
          <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2">
              {getSystemIcon('python')}
              <span className="text-xs font-medium text-gray-700">Python</span>
            </div>
            <span className="text-xs font-semibold text-gray-900">{systemInfo.python_version}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
