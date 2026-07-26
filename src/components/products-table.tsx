import { useLoaderData } from "react-router"
import { DataTable2 } from "@/components/data-table2"

export default function ProductsTable() {
  const { products } = useLoaderData()
  console.log(products)
  return <DataTable2 data={products} />
}
