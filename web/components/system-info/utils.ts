export function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 Bytes'
  
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

export function formatUptime(bootTime: string): string {
  const boot = new Date(bootTime)
  const now = new Date()
  const diff = now.getTime() - boot.getTime()
  
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  
  if (days > 0) {
    return `${days}d ${hours}h ${minutes}m`
  } else if (hours > 0) {
    return `${hours}h ${minutes}m`
  } else {
    return `${minutes}m`
  }
}

export function formatBatteryTime(timeLeft: number | null): string {
  if (timeLeft === null) return "Calculando..."
  
  const hours = Math.floor(timeLeft / 3600)
  const minutes = Math.floor((timeLeft % 3600) / 60)
  
  if (hours > 0) {
    return `${hours}h ${minutes}m`
  } else {
    return `${minutes}m`
  }
}

export function formatBootTime(bootTime: string): string {
  return new Date(bootTime).toLocaleString('pt-BR')
}

export function formatCpuFreq(freq: number): string {
  return `${freq} MHz`
}

export function formatCpuFreqRange(min: number, max: number): string {
  return `${min} - ${max} MHz`
}

export function formatGpuLoad(load: number): string {
  return `${load}%`
}

export function formatGpuMemory(used: number, total: number): string {
  return `${formatBytes(used)} / ${formatBytes(total)}`
}
