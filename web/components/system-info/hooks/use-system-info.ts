import { useMemo } from 'react'
import { useSystemInfoContext } from '../context'
import { 
  formatUptime, 
  formatBootTime, 
  formatCpuFreq, 
  formatCpuFreqRange,
  formatBytes,
  formatBatteryTime,
  formatGpuLoad,
  formatGpuMemory
} from '../utils'

export function useSystemInfo() {
  const { data, isLoading, error, refreshData } = useSystemInfoContext()

  const processedData = useMemo(() => {
    if (!data) return null

    return {
      bootTime: data.boot_time ? {
        uptime: formatUptime(data.boot_time),
        bootDate: formatBootTime(data.boot_time)
      } : null,
      cpuFreq: data.cpu?.freq ? {
        current: formatCpuFreq(data.cpu.freq.current),
        range: formatCpuFreqRange(data.cpu.freq.min, data.cpu.freq.max)
      } : null,
      network: data.network ? {
        bytesSent: formatBytes(data.network.bytes_sent),
        bytesRecv: formatBytes(data.network.bytes_recv),
        totalPackets: data.network.packets_sent + data.network.packets_recv
      } : null,
      battery: data.battery ? {
        percent: data.battery.percent,
        isPlugged: data.battery.power_plugged,
        timeLeft: data.battery.time_left ? formatBatteryTime(data.battery.time_left) : null
      } : null,
      gpu: data.gpu?.map(gpu => ({
        name: gpu.name,
        load: formatGpuLoad(gpu.load),
        memory: formatGpuMemory(gpu.memory_used, gpu.memory_total)
      })) || null,
      systemDetails: data.system_info ? {
        platform: data.system_info.platform,
        processor: data.system_info.processor,
        architecture: data.system_info.architecture,
        pythonVersion: data.system_info.python_version
      } : null
    }
  }, [data])

  return {
    data,
    processedData,
    isLoading,
    error,
    refreshData
  }
}
