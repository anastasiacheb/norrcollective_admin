import { KpiCards } from "./kpi-cards"
import { LineSalesChart } from "./line-sales-chart"

export default function Dashboard() {
  return (
    <div>
      <KpiCards />
      <LineSalesChart />
    </div>
  )
}
