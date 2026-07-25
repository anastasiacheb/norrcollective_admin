import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { TooltipProvider } from "@/components/ui/tooltip"
import { createBrowserRouter } from "react-router"
import { RouterProvider } from "react-router/dom"

import "./index.css"
import App from "./App.tsx"
import { ThemeProvider } from "@/components/theme-provider.tsx"

import Dashboard from "@/components/dashboard.tsx"
import OrdersTable from "@/components/orders-table.tsx"
import ProductsTable from "@/components/products-table.tsx"
import AddProduct from "@/components/add-product.tsx"
import EditProduct from "@/components/edit-product.tsx"
import { getProducts } from "@/Products.ts"
import { getProductById } from "@/Products.ts"
import { Component } from "@hugeicons/core-free-icons"

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      { index: true, Component: Dashboard },
      {
        path: "products",
        loader: async () => {
          return {
            products: await getProducts(),
          }
        },
        Component: ProductsTable,
      },
      { path: "products/add", Component: AddProduct },
      {
        path: "products/:id",
        loader: async ({ params }) => {
          const product = await getProductById(Number(params.id))

          return product
        },
        Component: EditProduct,
      },
      { path: "orders", Component: OrdersTable },
    ],
  },
])

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <TooltipProvider>
        <RouterProvider router={router} />
      </TooltipProvider>
    </ThemeProvider>
  </StrictMode>
)
