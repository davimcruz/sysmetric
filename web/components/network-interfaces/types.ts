export type NetworkInterface = {
  name: string;
  ip: string;
  netmask: string;
}

export type NetworkInterfacesProps = {
  interfaces: NetworkInterface[]
}

export type InterfaceStatus = "default" | "secondary" | "destructive"

export type InterfaceType = "Loopback" | "Ethernet" | "Wi-Fi" | "Interface"

export type NetworkInterfaceCardProps = {
  interface: NetworkInterface;
  index: number;
}

export type NetworkInterfacesContextType = {
  interfaces: NetworkInterface[];
  isLoading: boolean;
  error: string | null;
  refreshInterfaces: () => void;
}

export type InterfaceIconProps = {
  name: string;
  className?: string;
}

export type InterfaceBadgeProps = {
  ip: string;
  className?: string;
}
