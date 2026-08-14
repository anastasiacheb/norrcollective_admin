import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card"

import { HugeiconsIcon } from "@hugeicons/react"
import {
  ArrowUpRight01Icon,
  ArrowDownRight01Icon,
} from "@hugeicons/core-free-icons"

export function KpiCards() {
  return (
    <div className="grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4 dark:*:data-[slot=card]:bg-card">
      <Card className="@container/card flex flex-col justify-between">
        <CardHeader>
          <CardTitle>Total Revenue</CardTitle>
          <CardAction>
            <Badge variant="outline">
              <HugeiconsIcon
                icon={ArrowUpRight01Icon}
                strokeWidth={3}
                data-icon="inline-start"
              />
              +8.4%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardContent className="flex-col items-start gap-1.5 text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
          $24,500.00
        </CardContent>
      </Card>
      <Card className="@container/card flex flex-col justify-between">
        <CardHeader>
          <CardTitle>Orders</CardTitle>
          <CardAction>
            <Badge variant="outline">
              <HugeiconsIcon icon={ArrowUpRight01Icon} strokeWidth={3} />
              +12.5%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardContent className="flex-col items-start gap-1.5 text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
          36
        </CardContent>
      </Card>
      <Card className="@container/card flex flex-col justify-between">
        <CardHeader>
          <CardTitle>Average Order Value</CardTitle>
          <CardAction>
            <Badge variant="outline">
              <HugeiconsIcon
                icon={ArrowUpRight01Icon}
                strokeWidth={3}
                data-icon="inline-start"
              />
              +4.1%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardContent className="flex-col items-start gap-1.5 text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
          $680.56
        </CardContent>
      </Card>
      <Card className="@container/card flex flex-col justify-between">
        <CardHeader>
          <CardTitle>Products Sold</CardTitle>
          <CardAction>
            <Badge variant="outline">
              <HugeiconsIcon
                icon={ArrowDownRight01Icon}
                strokeWidth={3}
                data-icon="inline-start"
              />
              -2.8%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardContent className="flex-col items-start gap-1.5 text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
          42
        </CardContent>
      </Card>
    </div>
  )
}
