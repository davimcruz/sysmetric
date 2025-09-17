import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function EmptyInterfacesCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm">Interfaces de Rede</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Nenhuma interface de rede encontrada
        </p>
      </CardContent>
    </Card>
  )
}
