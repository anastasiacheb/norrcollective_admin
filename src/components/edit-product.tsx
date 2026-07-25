import { useLoaderData } from "react-router"
import ProductForm from "@/components/product-form"

export default function EditProduct() {
  const product = useLoaderData()
  return <ProductForm product={product} />
}
