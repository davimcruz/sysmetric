import { CardVariant } from './types'

export function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 Bytes'
  
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

export function getStatusVariant(percent: number): CardVariant {
  if (percent < 50) return "default"
  if (percent < 80) return "secondary"
  return "destructive"
}

export function formatPercentage(value: number): string {
  return value.toFixed(1) + '%'
}

export function formatFrequency(freq: number): string {
  return `${freq} MHz`
}
