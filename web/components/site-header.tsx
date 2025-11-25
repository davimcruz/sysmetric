"use client";

import { Notifications } from "./notifications";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { MonitorData } from "@/components/metrics-cards/types";

type SiteHeaderProps = {
  selectedMachine?: string;
  onMachineChange?: (machineId: string) => void;
  machines?: Array<{ id: string; hostname: string; machine_name?: string }>;
  monitors?: MonitorData[];
  previousMonitors?: MonitorData[];
  systemData?: {
    cpu_percent: number;
    memory_percent: number;
    disk_percent: number;
  };
  previousSystemData?: {
    cpu_percent: number;
    memory_percent: number;
    disk_percent: number;
  };
};

export function SiteHeader({
  selectedMachine,
  onMachineChange,
  machines = [],
  monitors = [],
  previousMonitors = [],
  systemData,
  previousSystemData,
}: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto flex h-16 items-center justify-between">
        <div className="flex items-center gap-3">
          <div>
            <h1 className="text-lg font-semibold text-gray-900">Sysmetric</h1>
            <p className="text-xs text-gray-500">
              Monitoramento de Sistemas Operacionais
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Select
            value={selectedMachine}
            onValueChange={onMachineChange}
            disabled={machines.length === 0}
          >
            <SelectTrigger className="w-64 bg-white border-gray-200 text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed">
              <SelectValue
                placeholder={
                  machines.length === 0
                    ? "Nenhuma máquina conectada"
                    : "Selecionar máquina"
                }
                className="text-gray-700"
              />
            </SelectTrigger>
            <SelectContent>
              {machines.map((machine) => (
                <SelectItem key={machine.id} value={machine.id}>
                  {machine.machine_name || machine.hostname}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Notifications
            monitors={monitors}
            previousMonitors={previousMonitors}
            onNotificationClick={onMachineChange}
          />
        </div>
      </div>
    </header>
  );
}
