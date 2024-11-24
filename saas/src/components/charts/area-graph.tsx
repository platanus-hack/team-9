'use client'

import { TrendingUp } from 'lucide-react'
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
const chartData = [
  { month: 'January', ingresos: 186, egresos: 80 },
  { month: 'February', ingresos: 305, egresos: 200 },
  { month: 'March', ingresos: 237, egresos: 120 },
  { month: 'April', ingresos: 73, egresos: 190 },
  { month: 'May', ingresos: 209, egresos: 130 },
  { month: 'June', ingresos: 214, egresos: 140 },
]

const chartConfig = {
  ingresos: {
    label: 'Ingresos',
    color: 'hsl(var(--chart-1))',
  },
  egresos: {
    label: 'Egresos',
    color: 'hsl(var(--chart-2))',
  },
} satisfies ChartConfig

export function AreaGraph() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Area Chart - Ingresos v/s Egresos</CardTitle>
        <CardDescription>
          Showing incomes and outcomes for the last 6 months
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[310px] w-full"
        >
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Area
              dataKey="egresos"
              type="natural"
              fill="var(--color-egresos)"
              fillOpacity={0.4}
              stroke="var(--color-egresos)"
              stackId="a"
            />
            <Area
              dataKey="ingresos"
              type="natural"
              fill="var(--color-ingresos)"
              fillOpacity={0.4}
              stroke="var(--color-ingresos)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              January - June 2024
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
