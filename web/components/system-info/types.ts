export type SystemInfoData = {
  boot_time?: string;
  cpu?: {
    freq?: {
      current: number;
      min: number;
      max: number;
    };
  };
  network?: {
    bytes_sent: number;
    bytes_recv: number;
    packets_sent: number;
    packets_recv: number;
    interfaces: Array<{
      name: string;
      ip: string;
      netmask: string;
    }>;
  };
  battery?: {
    percent: number;
    power_plugged: boolean;
    time_left: number | null;
  };
  gpu?: Array<{
    name: string;
    load: number;
    memory_used: number;
    memory_total: number;
  }>;
  system_info?: {
    platform: string;
    processor: string;
    architecture: string;
    python_version: string;
  };
}

export type SystemInfoProps = {
  data: SystemInfoData | null
}

export type SystemInfoContextType = {
  data: SystemInfoData | null;
  isLoading: boolean;
  error: string | null;
  refreshData: () => void;
}

export type BootTimeCardProps = {
  bootTime: string;
}

export type CpuFreqCardProps = {
  cpuFreq: {
    current: number;
    min: number;
    max: number;
  };
}

export type NetworkCardProps = {
  network: {
    bytes_sent: number;
    bytes_recv: number;
    packets_sent: number;
    packets_recv: number;
  };
}

export type BatteryCardProps = {
  battery: {
    percent: number;
    power_plugged: boolean;
    time_left: number | null;
  };
}

export type GpuCardProps = {
  gpu: Array<{
    name: string;
    load: number;
    memory_used: number;
    memory_total: number;
  }>;
}

export type SystemDetailsCardProps = {
  systemInfo: {
    platform: string;
    processor: string;
    architecture: string;
    python_version: string;
  };
}
