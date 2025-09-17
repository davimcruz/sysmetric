import { useMemo } from 'react'
import { useMetricsContext } from '../context'
import { formatBytes, formatPercentage, formatFrequency, getStatusVariant } from '../utils'

export function useMetrics() {
  const { data, isLoading, error, refreshData } = useMetricsContext()

  const metrics = useMemo(() => {
    if (!data) return null

    return {
      cpu: {
        percent: data.cpu.percent,
        cores: data.cpu.cores,
        frequency: data.cpu.freq?.current,
        formattedPercent: formatPercentage(data.cpu.percent),
        formattedFrequency: data.cpu.freq ? formatFrequency(data.cpu.freq.current) : null,
        variant: getStatusVariant(data.cpu.percent)
      },
      memory: {
        percent: data.memory.percent,
        used: data.memory.used,
        total: data.memory.total,
        formattedPercent: formatPercentage(data.memory.percent),
        formattedUsed: formatBytes(data.memory.used),
        formattedTotal: formatBytes(data.memory.total),
        variant: getStatusVariant(data.memory.percent)
      },
      disk: {
        percent: data.disk.percent,
        used: data.disk.used,
        total: data.disk.total,
        formattedPercent: formatPercentage(data.disk.percent),
        formattedUsed: formatBytes(data.disk.used),
        formattedTotal: formatBytes(data.disk.total),
        variant: getStatusVariant(data.disk.percent)
      },
      processes: {
        count: data.processes.length,
        cpuPercent: data.cpu.percent,
        formattedCpuPercent: formatPercentage(data.cpu.percent),
        variant: getStatusVariant(data.cpu.percent)
      }
    }
  }, [data])

  return {
    data,
    metrics,
    isLoading,
    error,
    refreshData
  }
}
