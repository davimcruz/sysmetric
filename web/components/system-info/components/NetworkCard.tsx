import { Wifi, Upload, Download, Package } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { NetworkCardProps } from '../types'

export function NetworkCard({ network }: NetworkCardProps) {
  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const getNetworkIcon = (type: string) => {
    switch (type) {
      case 'sent':
        return <Upload className="h-4 w-4 text-blue-500" />
      case 'received':
        return <Download className="h-4 w-4 text-green-500" />
      case 'packets':
        return <Package className="h-4 w-4 text-purple-500" />
      default:
        return <Wifi className="h-4 w-4 text-gray-500" />
    }
  }

  return (
    <Card className="relative overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <CardTitle className="text-base font-semibold text-gray-700">Rede</CardTitle>
        <div className="p-2 rounded-lg bg-blue-100">
          <Wifi className="h-5 w-5 text-blue-600" />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2">
              {getNetworkIcon('sent')}
              <span className="text-xs font-medium text-gray-700">Enviados</span>
            </div>
            <span className="text-xs font-semibold text-gray-900">{formatBytes(network.bytes_sent)}</span>
          </div>
          
          <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2">
              {getNetworkIcon('received')}
              <span className="text-xs font-medium text-gray-700">Recebidos</span>
            </div>
            <span className="text-xs font-semibold text-gray-900">{formatBytes(network.bytes_recv)}</span>
          </div>
          
          <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2">
              {getNetworkIcon('packets')}
              <span className="text-xs font-medium text-gray-700">Pacotes</span>
            </div>
            <span className="text-xs font-semibold text-gray-900">{network.packets_sent + network.packets_recv}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
