"use client"

import { memo } from 'react'
import { MetricsProvider } from './context'
import { MetricsCardsContent } from './components/MetricsCardsContent'
import { MetricsCardsProps } from './types'

function MetricsCardsComponent({ data }: MetricsCardsProps) {
  return (
    <MetricsProvider data={data}>
      <MetricsCardsContent />
    </MetricsProvider>
  )
}

export const MetricsCards = memo(MetricsCardsComponent)
