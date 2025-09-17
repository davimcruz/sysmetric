import { useMemo } from 'react'
import { MemoryStick } from "lucide-react"
import { MetricCard } from './MetricCard'
import { MemoryCardProps } from '../types'
import { formatBytes } from '../utils'

export function MemoryCard({ memory }: MemoryCardProps) {
  const { calculatedPercent, subtitle } = useMemo(() => {
    const calculatedPercent = (memory.used / memory.total) * 100
    const subtitle = `${formatBytes(memory.used)} / ${formatBytes(memory.total)}`
    
    return {
      calculatedPercent,
      subtitle
    }
  }, [memory.used, memory.total])

  return (
    <MetricCard
      title="Memória"
      value={`${calculatedPercent.toFixed(1)}%`}
      subtitle={subtitle}
      progressValue={calculatedPercent}
      icon={<MemoryStick className="h-4 w-4 text-muted-foreground" />}
    />
  )
}
