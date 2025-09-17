import { memo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

function LoadingCardsComponent() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <Card key={i}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Carregando...</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">--</div>
            <p className="text-xs text-muted-foreground">Aguardando dados</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export const LoadingCards = memo(LoadingCardsComponent)
