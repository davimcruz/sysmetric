"use client"

import { SystemInfoProvider } from './context'
import { SystemInfoContent } from './components/SystemInfoContent'
import { SystemInfoProps } from './types'

export function SystemInfo({ data }: SystemInfoProps) {
  return (
    <SystemInfoProvider data={data}>
      <SystemInfoContent />
    </SystemInfoProvider>
  )
}
