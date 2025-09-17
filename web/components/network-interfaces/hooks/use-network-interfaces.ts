import { useMemo } from 'react'
import { useNetworkInterfacesContext } from '../context'
import { getInterfaceType, getInterfaceStatus, getInterfaceStatusText } from '../utils'

export function useNetworkInterfaces() {
  const { interfaces, isLoading, error, refreshInterfaces } = useNetworkInterfacesContext()

  const processedInterfaces = useMemo(() => {
    return interfaces.map((iface, index) => ({
      ...iface,
      index,
      type: getInterfaceType(iface.name),
      status: getInterfaceStatus(iface.ip),
      statusText: getInterfaceStatusText(iface.ip)
    }))
  }, [interfaces])

  const hasInterfaces = interfaces.length > 0

  return {
    interfaces: processedInterfaces,
    hasInterfaces,
    isLoading,
    error,
    refreshInterfaces
  }
}
