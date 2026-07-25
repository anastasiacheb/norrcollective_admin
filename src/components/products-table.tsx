import { useLoaderData } from "react-router"
import { DataTable } from "@/components/data-table"

export default function ProductsTable() {
  const { products } = useLoaderData()
  console.log(products)
  return <DataTable data={products} />
}
