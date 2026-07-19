import { AppSidebar } from "@/components/app-sidebar"
import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { DataTable } from "@/components/data-table"
import ProductForm from "@/components/product-form"
// import { Pattern } from "@/components/table"
import { SectionCards } from "@/components/section-cards"
import { SiteHeader } from "@/components/site-header"

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

import data from "./data.json"

const product = {
  id: 20,
  name: "JAN EKSELIUS LOUNGE CHAIR",
  category: "easy-chairs",
  price: 8000,
  stock: 7,
  sku: "ECH-008",
  src: ["DSC_2511.jpg", "DSC_2508.jpg", "DSC_2509.jpg", "DSC_2512.jpg"],
  description:
    "The rare Etcetera lounge chair, designed by Jan Ekselius and produced by JOC Möbel AB in Vetlanda, Sweden during the 1960s, is a celebrated icon of Scandinavian modernism that seamlessly merges sculptural form with functional innovation. Known for its distinctive flowing silhouette and ergonomic design, the Etcetera chair embodies the bold experimentation of 1960s design while remaining deeply rooted in the Scandinavian ethos of comfort, craftsmanship, and visual clarity.",
}

export default function App() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
          </div>
        </header>
        {/* <SiteHeader /> */}
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 pb-4 md:gap-6 md:pb-6">
              {/* <SectionCards />
              <div className="px-4 lg:px-6">
                <ChartAreaInteractive /> product={product}
              </div> */}
              {/* <DataTable data={data} /> */}
              <ProductForm product={product} />
              {/* <Pattern /> */}
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
