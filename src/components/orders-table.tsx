import type { ColumnDef } from "@tanstack/react-table"
import { DataTable } from "./data-table"

import orders from "../orders.json"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

import { HugeiconsIcon } from "@hugeicons/react"
import {
  DragDropVerticalIcon,
  CheckmarkCircle01Icon,
  Loading03Icon,
  MoreVerticalCircle01Icon,
  LeftToRightListBulletIcon,
  ArrowDown01Icon,
  Add01Icon,
  ArrowLeftDoubleIcon,
  ArrowLeft01Icon,
  ArrowRight01Icon,
  ArrowRightDoubleIcon,
  ArrowUpDownIcon,
  ChartUpIcon,
} from "@hugeicons/core-free-icons"

const getStatus = (status: Order["status"]) => {
  switch (status) {
    case "pending":
      return {
        label: "Pending",

        className: "bg-yellow-100 text-yellow-700 border-yellow-200",
      }

    case "processing":
      return {
        label: "Processing",
        className: "bg-blue-100 text-blue-700 border-blue-200",
      }

    case "shipped":
      return {
        label: "Shipped",
        className: "bg-purple-100 text-purple-700 border-purple-200",
      }

    case "canceled":
      return {
        label: "Canceled",
        className: "bg-red-100 text-red-700 border-red-200",
      }

    default:
      return {
        label: status,
        className: "",
      }
  }
}

type Order = {
  id: number
  orderNumber: string
  total: number
  name: string
  orderDate: string
  email: string
  status: "pending" | "processing" | "shipped" | "canceled"
}

const columns: ColumnDef<Order>[] = [
  {
    accessorKey: "orderNumber",
    header: "Order number",
  },
  {
    accessorKey: "name",
    header: "Customer",
    cell: ({ row }) => {
      return (
        <div className="flex w-fit flex-col">
          <p>{row.original.name}</p>
          <p className="text-xs text-muted-foreground">{row.original.email}</p>
        </div>
      )
    },
  },
  {
    accessorKey: "total",
    header: "Price",
    cell: ({ row }) => {
      return <p>${row.original.total}</p>
    },
  },
  {
    accessorKey: "orderDate",
    header: "Date",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const { label, className } = getStatus(row.original.status)
      return <Badge className={className}>{label}</Badge>
    },
  },
  {
    id: "actions",
    cell: () => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex size-8 text-muted-foreground data-[state=open]:bg-muted"
            size="icon"
          >
            <HugeiconsIcon icon={MoreVerticalCircle01Icon} strokeWidth={2} />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-32">
          <DropdownMenuItem>
            {/* <Link
              to={`/products/${row.original.id}`}
              className="size-full px-3"
            >
              Edit
            </Link> */}
            Change status
          </DropdownMenuItem>

          <DropdownMenuSeparator />
          <DropdownMenuItem
            variant="destructive"
            // onSelect={() => {
            //   handleDelete(row.original.id)
            // }}
          >
            Cancel order
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
]

const ordersData = [...orders]

function getOrders() {
  return ordersData
}

export default function OrdersTable() {
  const data = getOrders()

  return (
    <>
      <DataTable columns={columns} data={data} />
    </>
  )
}
