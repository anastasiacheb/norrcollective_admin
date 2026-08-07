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
import { Checkbox } from "@/components/ui/checkbox"

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
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "orderNumber",
    meta: {
      label: "Order number",
    },
    header: ({ column }) => {
      return (
        <button
          className="flex items-center gap-1"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Order number
          <HugeiconsIcon size={14} icon={ArrowUpDownIcon} strokeWidth={2} />
        </button>
      )
    },
    enableHiding: false,
  },
  {
    accessorKey: "name",
    meta: {
      label: "Customer",
    },
    header: ({ column }) => {
      return (
        <button
          className="flex items-center gap-1"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Customer
          <HugeiconsIcon size={14} icon={ArrowUpDownIcon} strokeWidth={2} />
        </button>
      )
    },
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
    meta: {
      label: "Price",
    },
    header: ({ column }) => {
      return (
        <button
          className="flex items-center gap-1"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Price
          <HugeiconsIcon size={14} icon={ArrowUpDownIcon} strokeWidth={2} />
        </button>
      )
    },
    cell: ({ row }) => {
      return <p>${row.original.total}</p>
    },
  },
  {
    accessorKey: "orderDate",
    meta: {
      label: "Date",
    },
    header: ({ column }) => {
      return (
        <button
          className="flex items-center gap-1"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <HugeiconsIcon size={14} icon={ArrowUpDownIcon} strokeWidth={2} />
        </button>
      )
    },
  },
  {
    accessorKey: "status",
    meta: {
      label: "Status",
    },
    header: ({ column }) => {
      return (
        <button
          className="flex items-center gap-1"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <HugeiconsIcon size={14} icon={ArrowUpDownIcon} strokeWidth={2} />
        </button>
      )
    },
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
    enableSorting: false,
    enableHiding: false,
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
