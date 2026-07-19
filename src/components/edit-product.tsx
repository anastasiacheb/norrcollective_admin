import * as React from "react"
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

const images = [
  {
    name: "workspace.png",
    meta: "PNG · 820 KB",
    src: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=900&auto=format&fit=crop&q=80",
    alt: "Workspace",
  },
  {
    name: "desk-reference.jpg",
    meta: "JPG · 1.1 MB",
    src: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=900&auto=format&fit=crop&q=80",
    alt: "Desk",
  },
  {
    name: "office-reference.jpg",
    meta: "JPG · 940 KB",
    src: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=900&auto=format&fit=crop&q=80",
    alt: "Office",
  },
]

export default function EditProduct() {
  return (
    <div className="px-4 lg:px-6">
      <Button variant="outline" size="lg">
        Discard
      </Button>
      <Button size="lg">Save</Button>
      <div className="lg:grid lg:grid-cols-2">
        <div className="flex flex-col gap-6">
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="fieldgroup-name">Name</FieldLabel>
              <Input id="fieldgroup-name" placeholder="Name" />
            </Field>
          </FieldGroup>
          <Select>
            <SelectTrigger id="view-selector">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="sofas">Sofas</SelectItem>
                <SelectItem value="easy-chairs">Easy Chairs</SelectItem>
                <SelectItem value="chairs">Chairs</SelectItem>
                <SelectItem value="storage">Storage</SelectItem>
                <SelectItem value="tables">Tables</SelectItem>
                <SelectItem value="light">Light</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Field>
            <FieldLabel htmlFor="textarea-message">Description</FieldLabel>
            <Textarea
              id="textarea-message"
              placeholder="Type your message here."
            />
          </Field>
        </div>
        <div>
          <Empty className="rounded-4xl border border-dashed">
            <EmptyHeader>
              <EmptyMedia variant="icon">{/* <IconCloud /> */}</EmptyMedia>
              <EmptyTitle>Cloud Storage Empty</EmptyTitle>
              <EmptyDescription>
                Upload files to your cloud storage to access them anywhere.
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <Button variant="outline" size="sm">
                Upload Files
              </Button>
              <Input id="picture" type="file" />
            </EmptyContent>
          </Empty>
          <AttachmentGroup className="w-full rounded-4xl border border-dashed p-4">
            {images.map((image) => (
              <Attachment key={image.name} orientation="vertical">
                <AttachmentMedia variant="image">
                  <img src={image.src} alt={image.alt} />
                </AttachmentMedia>
                <AttachmentContent>
                  <AttachmentTitle>{image.name}</AttachmentTitle>
                  <AttachmentDescription>{image.meta}</AttachmentDescription>
                </AttachmentContent>
                <AttachmentActions>
                  <AttachmentAction aria-label={`Remove ${image.name}`}>
                    {/* <XIcon /> */}
                  </AttachmentAction>
                </AttachmentActions>
                <AttachmentTrigger
                  render={
                    <a
                      href={image.src}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`Open ${image.name}`}
                    />
                  }
                />
              </Attachment>
            ))}
          </AttachmentGroup>
        </div>
      </div>
    </div>
  )
}
