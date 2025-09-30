import { NextResponse } from "next/server";
import { MonitorData } from "../monitor/types";
import {
  createStoredMonitorData,
  createSuccessResponse,
  createErrorResponse,
} from "./utils";
import {
  getAllMonitors,
  getAllMonitorsIncludingDisconnected,
  addOrUpdateMonitor,
  cleanupMonitors,
  getMonitorsCount,
  getTotalMonitorsCount,
} from "./store";

export async function GET() {
  try {
    const connectedMonitors = getAllMonitors();
    const allMonitors = getAllMonitorsIncludingDisconnected();
    const connectedCount = getMonitorsCount();
    const totalCount = getTotalMonitorsCount();
    
    return NextResponse.json({
      monitors: connectedMonitors,
      connectedCount,
      totalCount,
      disconnectedCount: totalCount - connectedCount
    }, { status: 200 });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Erro desconhecido";
    const response = createErrorResponse(
      "Erro ao buscar dados de monitoramento",
      errorMessage
    );
    return NextResponse.json(response, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data: MonitorData = await request.json();
    const storedData = createStoredMonitorData(data);

    addOrUpdateMonitor(storedData);
    cleanupMonitors();

    const response = createSuccessResponse(
      "Dados de monitoramento atualizados com sucesso",
      getMonitorsCount()
    );

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("Erro ao processar dados de monitoramento:", error);

    const errorMessage =
      error instanceof Error ? error.message : "Erro desconhecido";
    const response = createErrorResponse(
      "Erro ao processar dados de monitoramento",
      errorMessage
    );

    return NextResponse.json(response, { status: 400 });
  }
}
