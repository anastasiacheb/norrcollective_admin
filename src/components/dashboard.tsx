import { KpiCards } from "./kpi-cards"
import { LineSalesChart } from "./line-sales-chart"
import { BarSalesChart } from "./bar-sales-chart"

export default function Dashboard() {
  return (
    <div className="grid grid-cols-1 gap-4 px-4 lg:px-6">
      <KpiCards />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[2fr_1fr]">
        <LineSalesChart />
        <BarSalesChart />
      </div>
    </div>
  )
}
