import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Controller, useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldError,
} from "@/components/ui/field"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentMedia,
  AttachmentTitle,
  AttachmentTrigger,
  AttachmentGroup,
} from "@/components/ui/attachment"
// import { FileCodeIcon, XIcon } from "lucide-react"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"

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
  ArrowLeft02Icon,
  Cancel01Icon,
  Image01Icon,
  Upload01Icon,
} from "@hugeicons/core-free-icons"

const formSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Name must be at least 3 characters.")
    .max(100, "Name must be at most 100 characters."),

  category: z
    .string()
    .min(1, "Please select a category.")
    .refine((val) => val !== "auto", {
      message:
        "Auto-detection is not allowed. Please select a specific category.",
    }),

  price: z.preprocess(
    (value) => (value === "" ? undefined : value),
    z.number({
      error: "Required field",
    })
  ),

  stock: z.preprocess(
    (value) => (value === "" ? undefined : value),
    z.number({
      error: "Required field",
    })
  ),

  sku: z
    .string()
    .trim()
    .min(3, "SKU must be at least 3 characters.")
    .max(20, "SKU must be at most 20 characters."),

  description: z
    .string()
    .trim()
    .min(20, "Description must be at least 20 characters.")
    .max(2000, "Description must be at most 2000 characters."),

  // images: z
  //   .array(z.instanceof(File))
  //   .min(1, "Upload at least one image.")
  //   .max(10, "You can upload up to 10 images."),
})

type Product = {
  id: number
  name: string
  category: string
  price: number
  stock: number
  sku: string
  description: string
  src: string[]
}

type EditProductProps = {
  product?: Product
}

export default function ProductForm({ product }: EditProductProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: product?.name ?? "",
      category: product?.category ?? "",
      price: product?.price,
      stock: product?.stock,
      sku: product?.sku ?? "",
      description: product?.description ?? "",
    },
  })

  function onSubmit(data: z.infer<typeof formSchema>) {
    // Do something with the form values.
    console.log(data)
  }

  type ImageItem = {
    id: string
    file?: File
    preview: string
    name: string
    size?: number
    type?: string
  }

  const [images, setImages] = React.useState<ImageItem[]>(
    () =>
      product?.src.map((src) => ({
        id: crypto.randomUUID(),
        preview: `/images/${src}`,
        name: src,
      })) ?? []
  )

  const addImages = (files: FileList | File[]) => {
    const newImages = Array.from(files)
      .filter(
        (file) => file.type.startsWith("image/") && file.size <= 5 * 1024 * 1024
      )
      .map((file) => ({
        id: crypto.randomUUID(),
        file,
        preview: URL.createObjectURL(file),
        name: file.name,
        size: file.size,
        type: file.type,
      }))

    setImages((prev) => [...prev, ...newImages].slice(0, 10))
  }

  return (
    <div className="flex flex-col gap-6 px-4 lg:mx-auto lg:max-w-7xl lg:px-6">
      <div className="flex flex-col gap-4 md:flex-row md:justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon-lg" className="bg-background">
            <HugeiconsIcon size={14} icon={ArrowLeft02Icon} strokeWidth={2} />
          </Button>
          <h2>{product ? "Edit product" : "Add product"}</h2>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="lg" className="bg-background">
            Discard
          </Button>
          <Button type="submit" form="product-form" size="lg">
            Save
          </Button>
        </div>
      </div>

      <div className="grid auto-cols-auto grid-cols-1 items-start gap-6 lg:grid-cols-2 lg:gap-x-4 xl:grid-cols-[auto_470px]">
        <Card>
          <CardHeader>
            <CardTitle>Product information</CardTitle>
            <CardDescription>
              Manage the essential details, pricing, stock, and category for
              this product.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form
              action="#"
              id="product-form"
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-6"
            >
              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      placeholder="Name"
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <Controller
                  name="category"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name}>Category</FieldLabel>
                      <Select
                        name={field.name}
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger
                          aria-invalid={fieldState.invalid}
                          id="view-selector"
                        >
                          <SelectValue placeholder="Category" />
                        </SelectTrigger>
                        <SelectContent alignItemWithTrigger>
                          <SelectGroup>
                            <SelectItem value="sofas">Sofas</SelectItem>
                            <SelectItem value="easy-chairs">
                              Easy Chairs
                            </SelectItem>
                            <SelectItem value="chairs">Chairs</SelectItem>
                            <SelectItem value="storage">Storage</SelectItem>
                            <SelectItem value="tables">Tables</SelectItem>
                            <SelectItem value="light">Light</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <Controller
                  name="price"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name}>Price</FieldLabel>
                      <Input
                        onKeyDown={(e) => {
                          if (
                            !/[0-9]/.test(e.key) &&
                            e.key !== "Backspace" &&
                            e.key !== "Delete" &&
                            e.key !== "ArrowLeft" &&
                            e.key !== "ArrowRight" &&
                            e.key !== "Tab"
                          ) {
                            e.preventDefault()
                          }
                        }}
                        {...field}
                        id={field.name}
                        aria-invalid={fieldState.invalid}
                        placeholder="Price"
                        autoComplete="off"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <Controller
                  name="stock"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name}>Stock</FieldLabel>
                      <Input
                        onKeyDown={(e) => {
                          if (
                            !/[0-9]/.test(e.key) &&
                            e.key !== "Backspace" &&
                            e.key !== "Delete" &&
                            e.key !== "ArrowLeft" &&
                            e.key !== "ArrowRight" &&
                            e.key !== "Tab"
                          ) {
                            e.preventDefault()
                          }
                        }}
                        {...field}
                        id={field.name}
                        aria-invalid={fieldState.invalid}
                        placeholder="Stock"
                        autoComplete="off"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <Controller
                  name="sku"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name}>SKU</FieldLabel>
                      <Input
                        {...field}
                        id={field.name}
                        aria-invalid={fieldState.invalid}
                        placeholder="SKU"
                        autoComplete="off"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </div>
              <Controller
                name="description"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Description</FieldLabel>
                    <Textarea
                      {...field}
                      aria-invalid={fieldState.invalid}
                      id={field.name}
                      placeholder="Type your message here."
                      className="min-h-70 lg:min-h-50"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </form>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Product images</CardTitle>
            <CardDescription>
              Upload and manage up to 10 product images.
            </CardDescription>
            {images.length > 0 && images.length < 10 && (
              <CardAction>
                <Button variant="outline" size="sm">
                  <Label
                    htmlFor="picture"
                    className="h-full w-full cursor-pointer"
                  >
                    <HugeiconsIcon
                      size={14}
                      icon={Upload01Icon}
                      strokeWidth={2}
                    />
                    Select more
                  </Label>
                </Button>
              </CardAction>
            )}
          </CardHeader>
          <CardContent>
            <Input
              id="picture"
              type="file"
              className="hidden"
              multiple
              onChange={(e) => {
                if (!e.target.files) return
                addImages(e.target.files)
              }}
            />
            {images.length === 0 ? (
              <Empty
                className="rounded-4xl border border-dashed"
                onDragOver={(e) => {
                  e.preventDefault()
                }}
                onDrop={(e) => {
                  e.preventDefault()
                  addImages(e.dataTransfer.files)
                }}
              >
                <EmptyHeader>
                  <EmptyMedia variant="icon">
                    <HugeiconsIcon
                      size={14}
                      icon={Image01Icon}
                      strokeWidth={2}
                    />
                  </EmptyMedia>
                  <EmptyTitle>Drop your images here</EmptyTitle>
                  <EmptyDescription>PNG or JPG (max. 5MB)</EmptyDescription>
                </EmptyHeader>
                <EmptyContent>
                  <Button variant="outline" size="sm">
                    <Label
                      htmlFor="picture"
                      className="h-full w-full cursor-pointer"
                    >
                      <HugeiconsIcon
                        size={14}
                        icon={Upload01Icon}
                        strokeWidth={2}
                      />
                      Select images
                    </Label>
                  </Button>
                </EmptyContent>
              </Empty>
            ) : (
              <AttachmentGroup
                className="w-full flex-wrap rounded-4xl border border-dashed p-4"
                onDragOver={(e) => {
                  e.preventDefault()
                }}
                onDrop={(e) => {
                  e.preventDefault()
                  addImages(e.dataTransfer.files)
                }}
              >
                {images.map((image) => (
                  <Attachment key={image.id} orientation="vertical">
                    <AttachmentMedia variant="image">
                      <img src={image.preview} alt={image.name} />
                    </AttachmentMedia>
                    <AttachmentContent>
                      <AttachmentTitle>{image.name}</AttachmentTitle>
                      {/* <AttachmentDescription>
                        {`${image.type ?? ""} · ${image.size ? Math.round(image.size / 1024) : ""} KB`}
                      </AttachmentDescription> */}
                    </AttachmentContent>
                    <AttachmentActions>
                      <AttachmentAction
                        onClick={() => {
                          if (image.file) {
                            URL.revokeObjectURL(image.preview)
                          }
                          setImages((prev) =>
                            prev.filter((item) => item.id !== image.id)
                          )
                        }}
                        aria-label={`Remove ${image.name}`}
                      >
                        <HugeiconsIcon
                          size={14}
                          icon={Cancel01Icon}
                          strokeWidth={2}
                        />
                      </AttachmentAction>
                    </AttachmentActions>
                    {/* <AttachmentTrigger
                      render={
                        <a
                          href={image.preview}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={`Open ${image.file.name}`}
                        />
                      }
                    /> */}
                  </Attachment>
                ))}
              </AttachmentGroup>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
