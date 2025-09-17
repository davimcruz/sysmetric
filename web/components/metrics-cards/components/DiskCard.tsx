import { useMemo } from 'react'
import { HardDrive } from "lucide-react"
import { MetricCard } from './MetricCard'
import { DiskCardProps } from '../types'
import { formatBytes } from '../utils'

export function DiskCard({ disk }: DiskCardProps) {
  const { calculatedPercent, subtitle } = useMemo(() => {
    const calculatedPercent = (disk.used / disk.total) * 100
    const subtitle = `${formatBytes(disk.used)} / ${formatBytes(disk.total)}`
    
    return {
      calculatedPercent,
      subtitle
    }
  }, [disk.used, disk.total])

  return (
    <MetricCard
      title="Disco"
      value={`${calculatedPercent.toFixed(1)}%`}
      subtitle={subtitle}
      progressValue={calculatedPercent}
      icon={<HardDrive className="h-4 w-4 text-muted-foreground" />}
    />
  )
}
