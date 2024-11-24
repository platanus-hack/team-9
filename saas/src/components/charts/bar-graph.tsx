'use client'

import { useMemo, useState } from 'react'
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts'

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

export const description = 'An interactive bar chart'

const chartData = [
  { date: '2024-04-01', nacional: 222, internacional: 150 },
  { date: '2024-04-02', nacional: 97, internacional: 180 },
  { date: '2024-04-03', nacional: 167, internacional: 120 },
  { date: '2024-04-04', nacional: 242, internacional: 260 },
  { date: '2024-04-05', nacional: 373, internacional: 290 },
  { date: '2024-04-06', nacional: 301, internacional: 340 },
  { date: '2024-04-07', nacional: 245, internacional: 180 },
  { date: '2024-04-08', nacional: 409, internacional: 320 },
  { date: '2024-04-09', nacional: 59, internacional: 110 },
  { date: '2024-04-10', nacional: 261, internacional: 190 },
  { date: '2024-04-11', nacional: 327, internacional: 350 },
  { date: '2024-04-12', nacional: 292, internacional: 210 },
  { date: '2024-04-13', nacional: 342, internacional: 380 },
  { date: '2024-04-14', nacional: 137, internacional: 220 },
  { date: '2024-04-15', nacional: 120, internacional: 170 },
  { date: '2024-04-16', nacional: 138, internacional: 190 },
  { date: '2024-04-17', nacional: 446, internacional: 360 },
  { date: '2024-04-18', nacional: 364, internacional: 410 },
  { date: '2024-04-19', nacional: 243, internacional: 180 },
  { date: '2024-04-20', nacional: 89, internacional: 150 },
  { date: '2024-04-21', nacional: 137, internacional: 200 },
  { date: '2024-04-22', nacional: 224, internacional: 170 },
  { date: '2024-04-23', nacional: 138, internacional: 230 },
  { date: '2024-04-24', nacional: 387, internacional: 290 },
  { date: '2024-04-25', nacional: 215, internacional: 250 },
  { date: '2024-04-26', nacional: 75, internacional: 130 },
  { date: '2024-04-27', nacional: 383, internacional: 420 },
  { date: '2024-04-28', nacional: 122, internacional: 180 },
  { date: '2024-04-29', nacional: 315, internacional: 240 },
  { date: '2024-04-30', nacional: 454, internacional: 380 },
  { date: '2024-05-01', nacional: 165, internacional: 220 },
  { date: '2024-05-02', nacional: 293, internacional: 310 },
  { date: '2024-05-03', nacional: 247, internacional: 190 },
  { date: '2024-05-04', nacional: 385, internacional: 420 },
  { date: '2024-05-05', nacional: 481, internacional: 390 },
  { date: '2024-05-06', nacional: 498, internacional: 520 },
  { date: '2024-05-07', nacional: 388, internacional: 300 },
  { date: '2024-05-08', nacional: 149, internacional: 210 },
  { date: '2024-05-09', nacional: 227, internacional: 180 },
  { date: '2024-05-10', nacional: 293, internacional: 330 },
  { date: '2024-05-11', nacional: 335, internacional: 270 },
  { date: '2024-05-12', nacional: 197, internacional: 240 },
  { date: '2024-05-13', nacional: 197, internacional: 160 },
  { date: '2024-05-14', nacional: 448, internacional: 490 },
  { date: '2024-05-15', nacional: 473, internacional: 380 },
  { date: '2024-05-16', nacional: 338, internacional: 400 },
  { date: '2024-05-17', nacional: 499, internacional: 420 },
  { date: '2024-05-18', nacional: 315, internacional: 350 },
  { date: '2024-05-19', nacional: 235, internacional: 180 },
  { date: '2024-05-20', nacional: 177, internacional: 230 },
  { date: '2024-05-21', nacional: 82, internacional: 140 },
  { date: '2024-05-22', nacional: 81, internacional: 120 },
  { date: '2024-05-23', nacional: 252, internacional: 290 },
  { date: '2024-05-24', nacional: 294, internacional: 220 },
  { date: '2024-05-25', nacional: 201, internacional: 250 },
  { date: '2024-05-26', nacional: 213, internacional: 170 },
  { date: '2024-05-27', nacional: 420, internacional: 460 },
  { date: '2024-05-28', nacional: 233, internacional: 190 },
  { date: '2024-05-29', nacional: 78, internacional: 130 },
  { date: '2024-05-30', nacional: 340, internacional: 280 },
  { date: '2024-05-31', nacional: 178, internacional: 230 },
  { date: '2024-06-01', nacional: 178, internacional: 200 },
  { date: '2024-06-02', nacional: 470, internacional: 410 },
  { date: '2024-06-03', nacional: 103, internacional: 160 },
  { date: '2024-06-04', nacional: 439, internacional: 380 },
  { date: '2024-06-05', nacional: 88, internacional: 140 },
  { date: '2024-06-06', nacional: 294, internacional: 250 },
  { date: '2024-06-07', nacional: 323, internacional: 370 },
  { date: '2024-06-08', nacional: 385, internacional: 320 },
  { date: '2024-06-09', nacional: 438, internacional: 480 },
  { date: '2024-06-10', nacional: 155, internacional: 200 },
  { date: '2024-06-11', nacional: 92, internacional: 150 },
  { date: '2024-06-12', nacional: 492, internacional: 420 },
  { date: '2024-06-13', nacional: 81, internacional: 130 },
  { date: '2024-06-14', nacional: 426, internacional: 380 },
  { date: '2024-06-15', nacional: 307, internacional: 350 },
  { date: '2024-06-16', nacional: 371, internacional: 310 },
  { date: '2024-06-17', nacional: 475, internacional: 520 },
  { date: '2024-06-18', nacional: 107, internacional: 170 },
  { date: '2024-06-19', nacional: 341, internacional: 290 },
  { date: '2024-06-20', nacional: 408, internacional: 450 },
  { date: '2024-06-21', nacional: 169, internacional: 210 },
  { date: '2024-06-22', nacional: 317, internacional: 270 },
  { date: '2024-06-23', nacional: 480, internacional: 530 },
  { date: '2024-06-24', nacional: 132, internacional: 180 },
  { date: '2024-06-25', nacional: 141, internacional: 190 },
  { date: '2024-06-26', nacional: 434, internacional: 380 },
  { date: '2024-06-27', nacional: 448, internacional: 490 },
  { date: '2024-06-28', nacional: 149, internacional: 200 },
  { date: '2024-06-29', nacional: 103, internacional: 160 },
  { date: '2024-06-30', nacional: 446, internacional: 400 },
]

const chartConfig = {
  views: {
    label: 'Deuda',
  },
  nacional: {
    label: 'Nacional',
    color: 'hsl(var(--chart-1))',
  },
  internacional: {
    label: 'Internacional',
    color: 'hsl(var(--chart-2))',
  },
} satisfies ChartConfig

export function BarGraph() {
  const [activeChart, setActiveChart] =
    useState<keyof typeof chartConfig>('nacional')

  const total = useMemo(
    () => ({
      nacional: chartData.reduce((acc, curr) => acc + curr.nacional, 0),
      internacional: chartData.reduce(
        (acc, curr) => acc + curr.internacional,
        0,
      ),
    }),
    [],
  )

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Bar Chart - Interactive</CardTitle>
          <CardDescription>
            Showing total revenue for the last 3 months
          </CardDescription>
        </div>
        <div className="flex">
          {['nacional', 'internacional'].map((key) => {
            const chart = key as keyof typeof chartConfig
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="relative flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-xs text-muted-foreground">
                  {chartConfig[chart].label}
                </span>
                <span className="text-lg font-bold leading-none sm:text-3xl">
                  {total[key as keyof typeof total].toLocaleString()}
                </span>
              </button>
            )
          })}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[280px] w-full"
        >
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                })
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="views"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })
                  }}
                />
              }
            />
            <Bar dataKey={activeChart} fill={`var(--color-${activeChart})`} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
