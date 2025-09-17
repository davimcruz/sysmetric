"use client"

import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type SiteHeaderProps = {
  selectedMachine?: string
  onMachineChange?: (machineId: string) => void
  machines?: Array<{ id: string; hostname: string; machine_name?: string }>
}

export function SiteHeader({ 
  selectedMachine, 
  onMachineChange, 
  machines = [] 
}: SiteHeaderProps) {
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
      <div className="flex flex-1 items-center gap-2">
        <div className="flex items-center gap-2">
          <h1 className="text-lg font-semibold">Dashboard</h1>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <Select value={selectedMachine} onValueChange={onMachineChange}>
          <SelectTrigger className="w-64">
            <SelectValue placeholder="Selecionar máquina" />
          </SelectTrigger>
          <SelectContent>
            {machines.map((machine) => (
              <SelectItem key={machine.id} value={machine.id}>
                {machine.machine_name || machine.hostname}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Button variant="outline" size="icon">
          <Bell className="h-4 w-4" />
        </Button>
      </div>
    </header>
  )
}
