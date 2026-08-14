import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"

import { useIsMobile } from "@/hooks/use-mobile"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

export const description = "A line chart"

const chartData = [
  { date: "2026-05-02", revenue: 850 },
  { date: "2026-05-04", revenue: 1240 },
  { date: "2026-05-06", revenue: 680 },
  { date: "2026-05-07", revenue: 2150 },
  { date: "2026-05-09", revenue: 920 },
  { date: "2026-05-11", revenue: 1480 },
  { date: "2026-05-12", revenue: 760 },
  { date: "2026-05-14", revenue: 1890 },
  { date: "2026-05-15", revenue: 540 },
  { date: "2026-05-17", revenue: 1120 },
  { date: "2026-05-19", revenue: 2470 },
  { date: "2026-05-20", revenue: 830 },
  { date: "2026-05-22", revenue: 1560 },
  { date: "2026-05-23", revenue: 720 },
  { date: "2026-05-25", revenue: 980 },
  { date: "2026-05-26", revenue: 1340 },
  { date: "2026-05-28", revenue: 2210 },
  { date: "2026-05-29", revenue: 640 },
  { date: "2026-05-31", revenue: 1780 },

  { date: "2026-06-01", revenue: 920 },
  { date: "2026-06-03", revenue: 1460 },
  { date: "2026-06-04", revenue: 780 },
  { date: "2026-06-06", revenue: 2340 },
  { date: "2026-06-08", revenue: 1180 },
  { date: "2026-06-09", revenue: 670 },
  { date: "2026-06-11", revenue: 1920 },
  { date: "2026-06-12", revenue: 840 },
  { date: "2026-06-14", revenue: 2560 },
  { date: "2026-06-15", revenue: 730 },
  { date: "2026-06-17", revenue: 1340 },
  { date: "2026-06-18", revenue: 980 },
  { date: "2026-06-20", revenue: 2180 },
  { date: "2026-06-21", revenue: 620 },
  { date: "2026-06-23", revenue: 1640 },
  { date: "2026-06-24", revenue: 870 },
  { date: "2026-06-26", revenue: 2390 },
  { date: "2026-06-27", revenue: 760 },
  { date: "2026-06-29", revenue: 1820 },
  { date: "2026-06-30", revenue: 1050 },

  { date: "2026-07-02", revenue: 1280 },
  { date: "2026-07-03", revenue: 690 },
  { date: "2026-07-05", revenue: 2450 },
  { date: "2026-07-06", revenue: 820 },
  { date: "2026-07-08", revenue: 1570 },
  { date: "2026-07-09", revenue: 930 },
  { date: "2026-07-11", revenue: 2180 },
  { date: "2026-07-12", revenue: 760 },
  { date: "2026-07-14", revenue: 2890 },
  { date: "2026-07-15", revenue: 640 },
  { date: "2026-07-17", revenue: 1760 },
  { date: "2026-07-18", revenue: 840 },
  { date: "2026-07-20", revenue: 2310 },
  { date: "2026-07-21", revenue: 720 },
  { date: "2026-07-23", revenue: 1950 },
  { date: "2026-07-24", revenue: 910 },
  { date: "2026-07-26", revenue: 2640 },
  { date: "2026-07-27", revenue: 780 },
  { date: "2026-07-29", revenue: 2180 },
  { date: "2026-07-30", revenue: 980 },
  { date: "2026-07-31", revenue: 1560 },
]

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "var(--primary)",
  },
} satisfies ChartConfig

export function LineSalesChart() {
  const isMobile = useIsMobile()
  const [timeRange, setTimeRange] = React.useState("90d")

  React.useEffect(() => {
    if (!isMobile) return

    const timeoutId = window.setTimeout(() => {
      setTimeRange("7d")
    }, 0)

    return () => window.clearTimeout(timeoutId)
  }, [isMobile])

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date)
    const referenceDate = new Date("2026-07-31")
    let daysToSubtract = 90
    if (timeRange === "30d") {
      daysToSubtract = 30
    } else if (timeRange === "7d") {
      daysToSubtract = 7
    }
    const startDate = new Date(referenceDate)
    startDate.setDate(startDate.getDate() - daysToSubtract)
    return date >= startDate
  })

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Total Revenue</CardTitle>
        <CardDescription>
          <span className="hidden @[540px]/card:block">Revenue over time</span>
          <span className="@[540px]/card:hidden">Revenue over time</span>
        </CardDescription>
        <CardAction>
          <ToggleGroup
            type="single"
            value={timeRange}
            onValueChange={setTimeRange}
            variant="outline"
            className="hidden *:data-[slot=toggle-group-item]:px-4! @[767px]/card:flex"
          >
            <ToggleGroupItem value="90d">Last 3 months</ToggleGroupItem>
            <ToggleGroupItem value="30d">Last 30 days</ToggleGroupItem>
            <ToggleGroupItem value="7d">Last 7 days</ToggleGroupItem>
          </ToggleGroup>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger
              className="flex w-40 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate @[767px]/card:hidden"
              size="sm"
              aria-label="Select a value"
            >
              <SelectValue placeholder="Last 3 months" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="90d" className="rounded-lg">
                Last 3 months
              </SelectItem>
              <SelectItem value="30d" className="rounded-lg">
                Last 30 days
              </SelectItem>
              <SelectItem value="7d" className="rounded-lg">
                Last 7 days
              </SelectItem>
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer config={chartConfig} className="h-60 min-h-50 w-full">
          <AreaChart
            accessibilityLayer
            data={filteredData}
            margin={{
              left: 0,
              right: 20,
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
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickCount={5}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  }}
                  indicator="dot"
                />
              }
            />
            <defs>
              <linearGradient id="fillRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--primary)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--primary)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <Area
              dataKey="revenue"
              type="natural"
              stroke="var(--primary)"
              fill="url(#fillRevenue)"
              fillOpacity={0.4}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
