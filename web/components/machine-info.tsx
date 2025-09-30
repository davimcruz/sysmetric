"use client"

import { Server, Monitor, Cpu, HardDrive } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MonitorData } from "@/components/metrics-cards/types"

type MachineInfoProps = {
  data: MonitorData
}

export function MachineInfo({ data }: MachineInfoProps) {
  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <Card className="bg-white border-gray-200">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-50 rounded-lg border border-green-200">
              <Server className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <CardTitle className="text-lg text-gray-900">
                {data.machine_name || data.hostname}
              </CardTitle>
              <p className="text-sm text-gray-700">
                {data.system} • ID: {data.id.slice(0, 8)}...
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-600">Atualizado</p>
            <p className="text-sm font-medium text-gray-900">
              {new Date(data.timestamp).toLocaleString("pt-BR")}
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <Cpu className="h-5 w-5 text-gray-600" />
            <div>
              <p className="text-xs text-gray-600">CPU</p>
              <p className="text-sm font-semibold text-gray-900">{data.cpu.cores} cores</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <Monitor className="h-5 w-5 text-gray-600" />
            <div>
              <p className="text-xs text-gray-600">Memória</p>
              <p className="text-sm font-semibold text-gray-900">{formatBytes(data.memory.total)}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <HardDrive className="h-5 w-5 text-gray-600" />
            <div>
              <p className="text-xs text-gray-600">Disco</p>
              <p className="text-sm font-semibold text-gray-900">{formatBytes(data.disk.total)}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <Server className="h-5 w-5 text-gray-600" />
            <div>
              <p className="text-xs text-gray-600">Processos</p>
              <p className="text-sm font-semibold text-gray-900">{data.processes.length}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}