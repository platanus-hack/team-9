'use client'
import { Bar, BarChart, XAxis } from 'recharts'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
export const description = 'A stacked bar chart with a legend'
const chartData = [
  { date: '2024-07-15', paid: 450, notPaid: 300 },
  { date: '2024-07-16', paid: 380, notPaid: 420 },
  { date: '2024-07-17', paid: 520, notPaid: 120 },
  { date: '2024-07-18', paid: 140, notPaid: 550 },
  { date: '2024-07-19', paid: 600, notPaid: 350 },
  { date: '2024-07-20', paid: 480, notPaid: 400 },
]
const chartConfig = {
  facturas: {
    label: 'Facturas',
  },
  paid: {
    label: 'Pagadas',
    color: '#dc2626',
  },
  notPaid: {
    label: 'No Pagadas',
    color: '#fca5a5',
  },
} satisfies ChartConfig

export function PaidNotPaid() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Facturas Pagadas - No Pagadas</CardTitle>
        <CardDescription>
          Cantidad de facturas pagadas y no pagadas en los últimos 6 meses.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <XAxis
              dataKey="date"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => {
                return new Date(value).toLocaleDateString('en-US', {
                  weekday: 'short',
                })
              }}
            />
            <Bar
              dataKey="paid"
              stackId="a"
              fill="var(--color-paid)"
              radius={[0, 0, 4, 4]}
            />
            <Bar
              dataKey="notPaid"
              stackId="a"
              fill="var(--color-notPaid)"
              radius={[4, 4, 0, 0]}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent labelKey="activities" indicator="line" />
              }
              cursor={false}
              defaultIndex={1}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
