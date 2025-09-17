"use client"

import { memo } from 'react'
import { useMetrics } from '../hooks/use-metrics'
import { LoadingCards } from './LoadingCards'
import { CpuCard } from './CpuCard'
import { MemoryCard } from './MemoryCard'
import { DiskCard } from './DiskCard'
import { ProcessesCard } from './ProcessesCard'

function MetricsCardsContentComponent() {
  const { data, isLoading } = useMetrics()

  if (isLoading || !data) {
    return <LoadingCards />
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <CpuCard cpu={data.cpu} />
      <MemoryCard memory={data.memory} />
      <DiskCard disk={data.disk} />
      <ProcessesCard 
        processes={data.processes} 
        cpuPercent={data.cpu.percent} 
      />
    </div>
  )
}

export const MetricsCardsContent = memo(MetricsCardsContentComponent)
