"use client";

import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { SiteHeader } from "@/components/site-header";
import { MetricsCards } from "@/components/metrics-cards";
import { ProcessesTable } from "@/components/processes-table";
import { SystemInfo } from "@/components/system-info";
import { NetworkInterfaces } from "@/components/network-interfaces";
import { StatusIndicator } from "@/components/status-indicator";
import { MachineInfo } from "@/components/machine-info";
import { Section } from "@/components/section";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Server, Activity, Network, Settings, TrendingUp } from "lucide-react";
import { MonitorData } from "@/components/metrics-cards/types";
import { TrendsChart } from "@/components/trends-chart";

export default function Page() {
  const [monitors, setMonitors] = useState<MonitorData[]>([]);
  const [previousMonitors, setPreviousMonitors] = useState<MonitorData[]>([]);
  const [selectedMachine, setSelectedMachine] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const [trendsData, setTrendsData] = useState<
    {
      timestamp: number;
      cpu_percent: number;
      memory_percent: number;
      disk_percent: number;
    }[]
  >([]);
  const monitorsRef = useRef<MonitorData[]>([]);

  const selectedData = useMemo(
    () => monitors.find((m) => m.id === selectedMachine) || null,
    [monitors, selectedMachine]
  );

  const previousSelectedData = useMemo(
    () => previousMonitors.find((m) => m.id === selectedMachine) || null,
    [previousMonitors, selectedMachine]
  );

  const systemData = useMemo(() => {
    if (!selectedData) return undefined;
    return {
      cpu_percent: selectedData.cpu.percent,
      memory_percent: selectedData.memory.percent,
      disk_percent: selectedData.disk.percent,
    };
  }, [selectedData]);

  const previousSystemData = useMemo(() => {
    if (!previousSelectedData) return undefined;
    return {
      cpu_percent: previousSelectedData.cpu.percent,
      memory_percent: previousSelectedData.memory.percent,
      disk_percent: previousSelectedData.disk.percent,
    };
  }, [previousSelectedData]);

  const machines = useMemo(
    () =>
      monitors.map((monitor) => ({
        id: monitor.id,
        hostname: monitor.hostname,
        machine_name: monitor.machine_name,
      })),
    [monitors]
  );

  const lastValidResponseRef = useRef<number>(Date.now());

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch("/api/monitors");
      if (response.ok) {
        const data = await response.json();
        const monitorsData = data.monitors || data;

        if (Array.isArray(monitorsData) && monitorsData.length > 0) {
          setPreviousMonitors(monitorsRef.current);
          setMonitors(monitorsData);
          monitorsRef.current = monitorsData;
          setLastUpdate(new Date());
          lastValidResponseRef.current = Date.now();

          if (!selectedMachine) {
            setSelectedMachine(monitorsData[0].id);
          }
        } else {
          if (Date.now() - lastValidResponseRef.current > 1200000) {
            setMonitors([]);
            monitorsRef.current = [];
          }
        }
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Erro ao buscar dados de monitoramento:", error);
      if (Date.now() - lastValidResponseRef.current > 1200000) {
        setMonitors([]);
        monitorsRef.current = [];
      }
      setIsLoading(false);
    }
  }, [selectedMachine]);

  const fetchTrendsData = useCallback(async () => {
    try {
      const response = await fetch("/api/trends");
      if (response.ok) {
        const data = await response.json();
        if (data.trends && data.trends.length > 0) {
          setTrendsData(data.trends);
        }
      }
    } catch (error) {
      console.error("Erro ao buscar dados de tendências:", error);
    }
  }, []);

  useEffect(() => {
    fetchData();
    fetchTrendsData();
    const interval = setInterval(fetchData, 2000); // Reduced interval for better responsiveness
    const trendsInterval = setInterval(fetchTrendsData, 2000);
    return () => {
      clearInterval(interval);
      clearInterval(trendsInterval);
    };
  }, [fetchData, fetchTrendsData]);

  return (
    <div className="min-h-screen bg-gray-50">
      <SiteHeader
        selectedMachine={selectedMachine}
        onMachineChange={setSelectedMachine}
        machines={machines}
        monitorsCount={monitors.length}
        previousMonitorsCount={previousMonitors.length}
        systemData={systemData}
        previousSystemData={previousSystemData}
      />

      <main className="p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <StatusIndicator
            monitorsCount={monitors.length}
            lastUpdate={lastUpdate}
            isOnline={monitors.length > 0}
          />

          {!isLoading && monitors.length === 0 ? (
            <div className="bg-white border border-gray-200 rounded-lg p-12 text-center">
              <Server className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Nenhuma máquina conectada
              </h3>
              <p className="text-gray-500 max-w-md mx-auto">
                Aguardando dados de monitoramento. Certifique-se de que o agente
                de monitoramento está rodando.
              </p>
            </div>
          ) : selectedData ? (
            <div className="space-y-6">
              <MachineInfo data={selectedData} />

              <Tabs defaultValue="overview" className="space-y-6">
                <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 bg-white border border-gray-200 p-1 h-12">
                  <TabsTrigger
                    value="overview"
                    className="flex items-center gap-2 cursor-pointer !text-gray-600 hover:!text-gray-900 data-[state=active]:!bg-green-50 data-[state=active]:!text-green-700 data-[state=active]:!border-green-200 data-[state=active]:!shadow-sm"
                  >
                    <Activity className="h-4 w-4" />
                    <span className="hidden sm:inline">Visão Geral</span>
                    <span className="sm:hidden">Geral</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="system"
                    className="flex items-center gap-2 cursor-pointer !text-gray-600 hover:!text-gray-900 data-[state=active]:!bg-green-50 data-[state=active]:!text-green-700 data-[state=active]:!border-green-200 data-[state=active]:!shadow-sm"
                  >
                    <Settings className="h-4 w-4" />
                    <span className="hidden sm:inline">Sistema</span>
                    <span className="sm:hidden">Sys</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="network"
                    className="flex items-center gap-2 cursor-pointer !text-gray-600 hover:!text-gray-900 data-[state=active]:!bg-green-50 data-[state=active]:!text-green-700 data-[state=active]:!border-green-200 data-[state=active]:!shadow-sm"
                  >
                    <Network className="h-4 w-4" />
                    <span className="hidden sm:inline">Rede</span>
                    <span className="sm:hidden">Net</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="processes"
                    className="flex items-center gap-2 cursor-pointer !text-gray-600 hover:!text-gray-900 data-[state=active]:!bg-green-50 data-[state=active]:!text-green-700 data-[state=active]:!border-green-200 data-[state=active]:!shadow-sm"
                  >
                    <Server className="h-4 w-4" />
                    <span className="hidden sm:inline">Processos</span>
                    <span className="sm:hidden">Proc</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="trends"
                    className="flex items-center gap-2 cursor-pointer !text-gray-600 hover:!text-gray-900 data-[state=active]:!bg-green-50 data-[state=active]:!text-green-700 data-[state=active]:!border-green-200 data-[state=active]:!shadow-sm"
                  >
                    <TrendingUp className="h-4 w-4" />
                    <span className="hidden sm:inline">Tendências</span>
                    <span className="sm:hidden">Trend</span>
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6">
                  <Section
                    title="Métricas Principais"
                    description="Monitoramento em tempo real dos recursos do sistema"
                  >
                    <MetricsCards data={selectedData} />
                  </Section>
                </TabsContent>

                <TabsContent value="system" className="space-y-6">
                  <Section
                    title="Informações do Sistema"
                    description="Detalhes sobre hardware e configurações"
                  >
                    <SystemInfo data={selectedData} />
                  </Section>
                </TabsContent>

                <TabsContent value="network" className="space-y-6">
                  {selectedData?.network?.interfaces ? (
                    <Section
                      title="Interfaces de Rede"
                      description="Configurações e status das interfaces de rede"
                    >
                      <NetworkInterfaces
                        interfaces={selectedData.network.interfaces}
                      />
                    </Section>
                  ) : (
                    <div className="bg-white border border-gray-200 rounded-lg p-12 text-center">
                      <Network className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        Nenhuma interface de rede
                      </h3>
                      <p className="text-gray-500">
                        Informações de rede não disponíveis para esta máquina.
                      </p>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="processes" className="space-y-6">
                  <Section
                    title="Processos Ativos"
                    description="Lista dos processos em execução no sistema"
                  >
                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                      <ProcessesTable processes={selectedData.processes} />
                    </div>
                  </Section>
                </TabsContent>

                <TabsContent value="trends" className="space-y-6">
                  <Section
                    title="Análise de Tendências"
                    description="Histórico e padrões de uso dos recursos do sistema"
                  >
                    <TrendsChart data={trendsData} />
                  </Section>
                </TabsContent>
              </Tabs>
            </div>
          ) : (
            <div className="bg-white border border-gray-200 rounded-lg p-12 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto mb-4"></div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Carregando dados...
              </h3>
              <p className="text-gray-500">
                Aguarde enquanto buscamos as informações do sistema.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
