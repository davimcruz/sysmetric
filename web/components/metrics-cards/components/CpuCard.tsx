import { memo } from 'react'
import { Cpu } from "lucide-react"
import { MetricCard } from './MetricCard'
import { CpuCardProps } from '../types'

function CpuCardComponent({ cpu }: CpuCardProps) {
  const subtitle = `${cpu.cores} cores${
    cpu.freq ? `\n${cpu.freq.current} MHz` : ''
  }`

  return (
    <MetricCard
      title="CPU"
      value={`${cpu.percent.toFixed(1)}%`}
      subtitle={subtitle}
      progressValue={cpu.percent}
      icon={<Cpu className="h-4 w-4 text-muted-foreground" />}
    />
  )
}

export const CpuCard = memo(CpuCardComponent)
