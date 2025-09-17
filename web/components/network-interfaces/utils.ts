import { InterfaceStatus, InterfaceType } from './types'

export function getInterfaceType(name: string): InterfaceType {
  if (name === 'lo0' || name === 'lo') {
    return 'Loopback'
  }
  if (name.startsWith('en') || name.startsWith('eth')) {
    return 'Ethernet'
  }
  if (name.startsWith('wl') || name.startsWith('wlan')) {
    return 'Wi-Fi'
  }
  return 'Interface'
}

export function getInterfaceStatus(ip: string): InterfaceStatus {
  if (ip === '127.0.0.1' || ip === '::1') {
    return "secondary"
  }
  if (ip.startsWith('192.168.') || ip.startsWith('10.') || ip.startsWith('172.')) {
    return "default"
  }
  return "destructive"
}

export function getInterfaceStatusText(ip: string): string {
  if (ip === '127.0.0.1' || ip === '::1') {
    return 'Local'
  }
  return 'Ativo'
}

export function isEthernetInterface(name: string): boolean {
  return name.startsWith('en') || name.startsWith('eth')
}

export function isWifiInterface(name: string): boolean {
  return name.startsWith('wl') || name.startsWith('wlan')
}

export function isLoopbackInterface(name: string): boolean {
  return name === 'lo0' || name === 'lo'
}
