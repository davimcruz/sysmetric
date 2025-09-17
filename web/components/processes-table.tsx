"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

type ProcessData = {
  name: string;
  pid: number;
  cpu_percent: number;
}

type ProcessesTableProps = {
  processes: ProcessData[]
}

function getStatusVariant(percent: number): "default" | "secondary" | "destructive" {
  if (percent < 10) return "default"
  if (percent < 30) return "secondary"
  return "destructive"
}

export function ProcessesTable({ processes }: ProcessesTableProps) {
  const topProcesses = processes
    .sort((a, b) => b.cpu_percent - a.cpu_percent)
    .slice(0, 10)

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Processo</TableHead>
            <TableHead>PID</TableHead>
            <TableHead className="text-right">CPU %</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {topProcesses.map((process, index) => (
            <TableRow key={`${process.pid}-${index}`}>
              <TableCell className="font-medium">
                {process.name.length > 30 
                  ? process.name.substring(0, 30) + '...' 
                  : process.name
                }
              </TableCell>
              <TableCell className="text-muted-foreground">
                {process.pid}
              </TableCell>
              <TableCell className="text-right">
                <Badge variant={getStatusVariant(process.cpu_percent)}>
                  {process.cpu_percent.toFixed(1)}%
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
