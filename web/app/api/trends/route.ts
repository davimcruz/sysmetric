import { NextResponse } from "next/server";
import { getAllMonitors } from "../monitors/store";

type TrendData = {
  timestamp: number;
  cpu_percent: number;
  memory_percent: number;
  disk_percent: number;
}

let trendsHistory: TrendData[] = [];
const MAX_HISTORY = 60; 

export async function GET() {
  try {
    const monitors = getAllMonitors();
    
    if (monitors.length === 0) {
      return NextResponse.json({ 
        trends: trendsHistory,
        current: null,
        message: "Nenhuma máquina conectada"
      }, { status: 200 });
    }

    const firstMonitor = monitors[0];
    const now = Date.now();
    
    const newTrendData: TrendData = {
      timestamp: now,
      cpu_percent: firstMonitor.cpu.percent,
      memory_percent: firstMonitor.memory.percent,
      disk_percent: firstMonitor.disk.percent
    };

    trendsHistory.push(newTrendData);
    
    if (trendsHistory.length > MAX_HISTORY) {
      trendsHistory = trendsHistory.slice(-MAX_HISTORY);
    }

    return NextResponse.json({ 
      trends: trendsHistory,
      current: newTrendData,
      count: trendsHistory.length
    }, { status: 200 });
  } catch (error) {
    console.error("Erro ao buscar dados de tendências:", error);
    return NextResponse.json(
      { error: "Erro ao buscar dados de tendências" },
      { status: 500 }
    );
  }
}
