import { useMemo, useCallback } from 'react'
import { MonitorData } from '../types'

export function usePerformanceOptimization(data: MonitorData | null) {
  const memoizedData = useMemo(() => data, [data])

  const shouldUpdate = useCallback((newData: MonitorData | null) => {
    if (!memoizedData || !newData) return true
    return memoizedData.timestamp !== newData.timestamp
  }, [memoizedData])

  const debouncedRefresh = useCallback((refreshFn: () => void, delay: number = 1000) => {
    let timeoutId: NodeJS.Timeout
    return () => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(refreshFn, delay)
    }
  }, [])

  return {
    memoizedData,
    shouldUpdate,
    debouncedRefresh
  }
}
