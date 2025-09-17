"use client"

import { useMemo } from 'react'
import { useSystemInfo } from '../hooks/use-system-info'
import { LoadingCards } from './LoadingCards'
import { BootTimeCard } from './BootTimeCard'
import { CpuFreqCard } from './CpuFreqCard'
import { NetworkCard } from './NetworkCard'
import { BatteryCard } from './BatteryCard'
import { GpuCard } from './GpuCard'
import { SystemDetailsCard } from './SystemDetailsCard'

export function SystemInfoContent() {
  const { data, processedData, isLoading } = useSystemInfo()

  const cards = useMemo(() => {
    if (!data || !processedData) return []

    const cardsList = []

    if (processedData.bootTime) {
      cardsList.push(
        <BootTimeCard key="boot-time" bootTime={data.boot_time!} />
      )
    }

    if (processedData.cpuFreq) {
      cardsList.push(
        <CpuFreqCard key="cpu-freq" cpuFreq={data.cpu!.freq!} />
      )
    }

    if (processedData.network) {
      cardsList.push(
        <NetworkCard key="network" network={data.network!} />
      )
    }

    if (processedData.battery) {
      cardsList.push(
        <BatteryCard key="battery" battery={data.battery!} />
      )
    }

    if (processedData.gpu && processedData.gpu.length > 0) {
      cardsList.push(
        <GpuCard key="gpu" gpu={data.gpu!} />
      )
    }

    if (processedData.systemDetails) {
      cardsList.push(
        <SystemDetailsCard key="system-details" systemInfo={data.system_info!} />
      )
    }

    return cardsList
  }, [data, processedData])

  if (isLoading || !data) {
    return <LoadingCards />
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {cards}
    </div>
  )
}
