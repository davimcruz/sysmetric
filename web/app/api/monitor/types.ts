export type CpuData = {
  cores: number;
  percent: number;
}

export type MemoryData = {
  total: number;
  available: number;
  percent: number;
  used: number;
  free: number;
  active: number;
  inactive: number;
  wired: number;
}

export type DiskData = {
  total: number;
  used: number;
  free: number;
  percent: number;
}

export type ProcessData = {
  name: string;
  pid: number;
  cpu_percent: number;
}

export type MonitorData = {
  id: string;
  hostname: string;
  system: string;
  timestamp: string;
  cpu: CpuData;
  memory: MemoryData;
  disk: DiskData;
  processes: ProcessData[];
}

export type ApiResponse<T = unknown> = {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
  receivedAt?: string;
}
