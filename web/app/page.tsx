"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { MetricsCards } from "@/components/metrics-cards";
import { ProcessesTable } from "@/components/processes-table";
import { SystemInfo } from "@/components/system-info";
import { NetworkInterfaces } from "@/components/network-interfaces";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Server } from "lucide-react";
import { MonitorData } from "@/components/metrics-cards/types";

export default function Page() {
  const [monitors, setMonitors] = useState<MonitorData[]>([]);
  const [selectedMachine, setSelectedMachine] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  const selectedData = useMemo(
    () => monitors.find((m) => m.id === selectedMachine) || null,
    [monitors, selectedMachine]
  );

  const machines = useMemo(
    () =>
      monitors.map((monitor) => ({
        id: monitor.id,
        hostname: monitor.hostname,
        machine_name: monitor.machine_name,
      })),
    [monitors]
  );

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch("/api/monitors");
      if (response.ok) {
        const data = await response.json();
        setMonitors(data);
        setLastUpdate(new Date());

        if (data.length > 0 && !selectedMachine) {
          setSelectedMachine(data[0].id);
        }
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Erro ao buscar dados de monitoramento:", error);
      setIsLoading(false);
    }
  }, [selectedMachine]);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, [fetchData]);

  const statusText = useMemo(
    () =>
      `${monitors.length} máquina${monitors.length !== 1 ? "s" : ""} conectada${
        monitors.length !== 1 ? "s" : ""
      }`,
    [monitors.length]
  );

  const lastUpdateTime = useMemo(
    () => lastUpdate.toLocaleTimeString("pt-BR"),
    [lastUpdate]
  );

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader
          selectedMachine={selectedMachine}
          onMachineChange={setSelectedMachine}
          machines={machines}
        />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <div className="px-4 lg:px-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-sm text-muted-foreground">
                        {statusText}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>Última atualização: {lastUpdateTime}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="px-4 lg:px-6">
                <MetricsCards data={selectedData} />
              </div>

              {selectedData && (
                <div className="px-4 lg:px-6">
                  <Card>
                    <CardHeader>
                      <div className="flex items-center gap-2">
                        <Server className="h-5 w-5 text-muted-foreground" />
                        <CardTitle className="text-lg">
                          {selectedData.machine_name || selectedData.hostname}
                        </CardTitle>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>Sistema: {selectedData.system}</span>
                        <span>ID: {selectedData.id.slice(0, 8)}...</span>
                        <span>
                          Atualizado:{" "}
                          {new Date(selectedData.timestamp).toLocaleString(
                            "pt-BR"
                          )}
                        </span>
                      </div>
                    </CardHeader>
                  </Card>
                </div>
              )}

              {selectedData && (
                <div className="px-4 lg:px-6">
                  <SystemInfo data={selectedData} />
                </div>
              )}

              {selectedData?.network?.interfaces && (
                <div className="px-4 lg:px-6">
                  <NetworkInterfaces
                    interfaces={selectedData.network.interfaces}
                  />
                </div>
              )}

              {selectedData && (
                <div className="px-4 lg:px-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Processos Ativos</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ProcessesTable processes={selectedData.processes} />
                    </CardContent>
                  </Card>
                </div>
              )}

              {!isLoading && monitors.length === 0 && (
                <div className="px-4 lg:px-6">
                  <Card>
                    <CardContent className="flex flex-col items-center justify-center py-12">
                      <Server className="h-12 w-12 text-muted-foreground mb-4" />
                      <h3 className="text-lg font-semibold mb-2">
                        Nenhuma máquina conectada
                      </h3>
                      <p className="text-muted-foreground text-center">
                        Aguardando dados de monitoramento...
                      </p>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
