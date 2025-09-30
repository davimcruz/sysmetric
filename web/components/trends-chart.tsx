"use client"

import { useState, useEffect, useMemo, useCallback, memo } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"

type TrendData = {
  timestamp: number
  cpu_percent: number
  memory_percent: number
  disk_percent: number
}

type TrendsChartProps = {
  data: TrendData[]
}

const StatCard = memo(({ title, trend, trendText, currentValue, stats }: {
  title: string
  trend: string
  trendText: string
  currentValue: number
  stats: { min: number; max: number; avg: number }
}) => {
  const getTrendIcon = useCallback((trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-4 w-4 text-red-500" />
      case 'down': return <TrendingDown className="h-4 w-4 text-green-500" />
      default: return <Minus className="h-4 w-4 text-gray-500" />
    }
  }, [])

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium text-gray-700 flex items-center gap-2">
          {title}
          {getTrendIcon(trend)}
          <span className="text-xs text-gray-500">{trendText}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Atual:</span>
          <span className="font-medium text-gray-900">
            {currentValue.toFixed(1)}%
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Mín:</span>
          <span className="text-gray-700">{stats.min.toFixed(1)}%</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Máx:</span>
          <span className="text-gray-700">{stats.max.toFixed(1)}%</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Média:</span>
          <span className="text-gray-700">{stats.avg.toFixed(1)}%</span>
        </div>
      </CardContent>
    </Card>
  )
})

export const TrendsChart = memo(function TrendsChart({ data }: TrendsChartProps) {
  const [currentData, setCurrentData] = useState<TrendData | null>(null)

  useEffect(() => {
    if (data.length > 0) {
      setCurrentData(data[data.length - 1])
    }
  }, [data])

  const chartData = useMemo(() => {
    return data.map(item => ({
      time: new Date(item.timestamp).toLocaleTimeString("pt-BR", { 
        hour: '2-digit', 
        minute: '2-digit',
        second: '2-digit'
      }),
      timestamp: item.timestamp,
      CPU: item.cpu_percent,
      Memória: item.memory_percent,
      Disco: item.disk_percent
    }))
  }, [data])

  const getTrend = useCallback((values: number[]) => {
    if (values.length < 2) return 'stable'
    const recent = values.slice(-3).reduce((a, b) => a + b, 0) / 3
    const older = values.slice(-6, -3).reduce((a, b) => a + b, 0) / 3
    if (recent > older + 2) return 'up'
    if (recent < older - 2) return 'down'
    return 'stable'
  }, [])

  const getTrendText = useCallback((trend: string) => {
    switch (trend) {
      case 'up': return 'Subindo'
      case 'down': return 'Descendo'
      default: return 'Estável'
    }
  }, [])

  const cpuTrend = useMemo(() => getTrend(data.map(d => d.cpu_percent)), [data, getTrend])
  const memoryTrend = useMemo(() => getTrend(data.map(d => d.memory_percent)), [data, getTrend])
  const diskTrend = useMemo(() => getTrend(data.map(d => d.disk_percent)), [data, getTrend])

  const getStats = useCallback((values: number[]) => {
    if (values.length === 0) return { min: 0, max: 0, avg: 0 }
    const min = Math.min(...values)
    const max = Math.max(...values)
    const avg = values.reduce((a, b) => a + b, 0) / values.length
    return { min, max, avg }
  }, [])

  const cpuStats = useMemo(() => getStats(data.map(d => d.cpu_percent)), [data, getStats])
  const memoryStats = useMemo(() => getStats(data.map(d => d.memory_percent)), [data, getStats])
  const diskStats = useMemo(() => getStats(data.map(d => d.disk_percent)), [data, getStats])

  if (data.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-700">Tendências</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center text-gray-500">
            Coletando dados de tendências...
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-700">Tendências dos Recursos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="time" 
                  stroke="#666"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis 
                  stroke="#666"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  domain={[0, 100]}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                  labelStyle={{ color: '#374151', fontWeight: '600' }}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="CPU" 
                  stroke="#ef4444" 
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 4, fill: '#ef4444' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="Memória" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 4, fill: '#3b82f6' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="Disco" 
                  stroke="#10b981" 
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 4, fill: '#10b981' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          title="CPU"
          trend={cpuTrend}
          trendText={getTrendText(cpuTrend)}
          currentValue={currentData?.cpu_percent || 0}
          stats={cpuStats}
        />
        <StatCard
          title="Memória"
          trend={memoryTrend}
          trendText={getTrendText(memoryTrend)}
          currentValue={currentData?.memory_percent || 0}
          stats={memoryStats}
        />
        <StatCard
          title="Disco"
          trend={diskTrend}
          trendText={getTrendText(diskTrend)}
          currentValue={currentData?.disk_percent || 0}
          stats={diskStats}
        />
      </div>
    </div>
  )
})
