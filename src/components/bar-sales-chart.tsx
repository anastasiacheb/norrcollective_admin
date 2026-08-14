import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

import {
  Card,
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

export const description = "A bar chart"

const chartData = [
  { category: "Sofas", sales: 42 },
  { category: "Easy Chairs", sales: 31 },
  { category: "Chairs", sales: 24 },
  { category: "Storage", sales: 18 },
  { category: "Tables", sales: 27 },
  { category: "Light", sales: 36 },
]

const chartConfig = {
  revenue: {
    label: "Sales",
    color: "var(--primary)",
  },
} satisfies ChartConfig

export function BarSalesChart() {
  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Sales by Category</CardTitle>
        <CardDescription>
          <span className="hidden @[540px]/card:block">
            Units sold by category
          </span>
          <span className="@[540px]/card:hidden">Units sold by category</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer config={chartConfig} className="h-60 min-h-50 w-full">
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: -24,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="category"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              // minTickGap={32}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickCount={5}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Bar
              dataKey="sales"
              type="natural"
              fill="var(--primary)"
              fillOpacity={0.6}
              radius={20}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
