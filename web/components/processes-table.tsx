"use client"

import { useMemo, useState } from "react"
import { Cpu, Activity, Zap, Grid3X3, List, Plus } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

type ProcessData = {
  name: string;
  pid: number;
  cpu_percent: number;
}

type ProcessesTableProps = {
  processes: ProcessData[]
}

export function ProcessesTable({ processes }: ProcessesTableProps) {
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards')
  const [visibleCount, setVisibleCount] = useState(20)
  
  const allProcesses = useMemo(() => 
    processes
      .sort((a, b) => b.cpu_percent - a.cpu_percent), [processes]
  )

  const visibleProcesses = useMemo(() => 
    allProcesses.slice(0, visibleCount), [allProcesses, visibleCount]
  )

  const hasMore = visibleCount < allProcesses.length

  const showMore = () => {
    setVisibleCount(prev => Math.min(prev + 20, allProcesses.length))
  }

  const getCpuColor = (percent: number) => {
    if (percent < 10) return 'text-emerald-500'
    if (percent < 30) return 'text-amber-500'
    return 'text-orange-500'
  }



  const getProcessIcon = (name: string) => {
    const lowerName = name.toLowerCase()
    if (lowerName.includes('chrome') || lowerName.includes('firefox') || lowerName.includes('safari')) {
      return <Activity className="h-4 w-4 text-blue-500" />
    }
    if (lowerName.includes('node') || lowerName.includes('python') || lowerName.includes('java')) {
      return <Zap className="h-4 w-4 text-green-500" />
    }
    return <Cpu className="h-4 w-4 text-gray-500" />
  }

  const getProcessBgColor = (name: string) => {
    const lowerName = name.toLowerCase()
    if (lowerName.includes('chrome') || lowerName.includes('firefox') || lowerName.includes('safari')) {
      return 'bg-blue-50'
    }
    if (lowerName.includes('node') || lowerName.includes('python') || lowerName.includes('java')) {
      return 'bg-green-50'
    }
    return 'bg-gray-50'
  }

  const renderCards = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {visibleProcesses.map((process, index) => (
        <Card key={`${process.pid}-${index}`} className="relative overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-semibold text-gray-700 truncate">
              {process.name.length > 20 
                ? process.name.substring(0, 20) + '...' 
                : process.name
              }
            </CardTitle>
            <div className={`p-2 rounded-lg ${getProcessBgColor(process.name)}`}>
              {getProcessIcon(process.name)}
            </div>
          </CardHeader>
          
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span className={`text-2xl font-bold ${getCpuColor(process.cpu_percent)}`}>
                {process.cpu_percent.toFixed(1)}%
              </span>
              <Cpu className="h-4 w-4 text-blue-400" />
            </div>
            
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-600">PID:</span>
                <span className="font-medium text-gray-700">{process.pid}</span>
              </div>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-1.5">
              <div 
                className={`h-1.5 rounded-full ${
                  process.cpu_percent < 10 ? 'bg-emerald-400' : 
                  process.cpu_percent < 30 ? 'bg-amber-400' : 'bg-orange-400'
                }`}
                style={{ width: `${Math.min(process.cpu_percent, 100)}%` }}
              />
            </div>
          </CardContent>
        </Card>
      ))}
      </div>
      
      {hasMore && (
        <Button 
          onClick={showMore}
          variant="outline" 
          className="w-full mt-4 cursor-pointer"
        >
          <Plus className="h-4 w-4 mr-2" />
          Mostrar mais ({allProcesses.length - visibleCount} restantes)
        </Button>
      )}
    </div>
  )

  const renderTable = () => (
    <div className="space-y-4">
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
            <TableRow className="border-gray-200">
              <TableHead className="text-gray-900 font-medium">Processo</TableHead>
              <TableHead className="text-gray-900 font-medium">PID</TableHead>
              <TableHead className="text-right text-gray-900 font-medium">CPU %</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
            {visibleProcesses.map((process, index) => (
            <TableRow key={`${process.pid}-${index}`} className="border-gray-100">
              <TableCell className="font-medium text-gray-900">
                {process.name.length > 30 
                  ? process.name.substring(0, 30) + '...' 
                  : process.name
                }
              </TableCell>
              <TableCell className="text-gray-600">
                {process.pid}
              </TableCell>
              <TableCell className="text-right">
                <span className={`text-xs font-medium px-2 py-1 rounded border ${
                  process.cpu_percent < 10 ? 'text-emerald-600 bg-emerald-50 border-emerald-200' :
                  process.cpu_percent < 30 ? 'text-amber-600 bg-amber-50 border-amber-200' :
                  'text-orange-600 bg-orange-50 border-orange-200'
                }`}>
                  {process.cpu_percent.toFixed(1)}%
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </div>
      
      {hasMore && (
        <Button 
          onClick={showMore}
          variant="outline" 
          className="w-full cursor-pointer"
        >
          <Plus className="h-4 w-4 mr-2" />
          Mostrar mais ({allProcesses.length - visibleCount} restantes)
        </Button>
      )}
    </div>
  )

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">
          Processos ({visibleCount} de {allProcesses.length})
        </h3>
        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === 'cards' ? 'secondary' : 'outline'}
            size="sm"
            onClick={() => setViewMode('cards')}
            className="flex items-center gap-2 cursor-pointer"
          >
            <Grid3X3 className="h-4 w-4" />
            Cards
          </Button>
          <Button
            variant={viewMode === 'table' ? 'secondary' : 'outline'}
            size="sm"
            onClick={() => setViewMode('table')}
            className="flex items-center gap-2 cursor-pointer"
          >
            <List className="h-4 w-4" />
            Tabela
          </Button>
        </div>
      </div>

      {viewMode === 'cards' ? renderCards() : renderTable()}
    </div>
  )
}