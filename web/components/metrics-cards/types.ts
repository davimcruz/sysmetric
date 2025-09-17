export type MonitorData = {
  id: string;
  hostname: string;
  machine_name?: string;
  system: string;
  timestamp: string;
  boot_time?: string;
  cpu: {
    cores: number;
    percent: number;
    freq?: {
      current: number;
      min: number;
      max: number;
    };
  };
  memory: {
    total: number;
    available: number;
    percent: number;
    used: number;
    free: number;
    active?: number;
    inactive?: number;
    wired?: number;
  };
  disk: {
    total: number;
    used: number;
    free: number;
    percent: number;
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
    temperature: number;
  }>;
  system_info?: {
    platform: string;
    processor: string;
    architecture: string;
    python_version: string;
  };
  processes: Array<{
    name: string;
    pid: number;
    cpu_percent: number;
    memory_percent?: number;
    status?: string;
  }>;
}

export type MetricsCardsProps = {
  data: MonitorData | null
}

export type CardVariant = "default" | "secondary" | "destructive"

export type MetricCardProps = {
  title: string;
  value: string;
  subtitle: string;
  progressValue: number;
  icon: React.ReactNode;
  variant?: CardVariant;
}

export type CpuCardProps = {
  cpu: MonitorData['cpu'];
}

export type MemoryCardProps = {
  memory: MonitorData['memory'];
}

export type DiskCardProps = {
  disk: MonitorData['disk'];
}

export type ProcessesCardProps = {
  processes: MonitorData['processes'];
  cpuPercent: number;
}

export type MetricsContextType = {
  data: MonitorData | null;
  isLoading: boolean;
  error: string | null;
  refreshData: () => void;
}
