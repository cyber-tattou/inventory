import { ItemForm } from "@/components/item-form"
import { Metadata } from "next"

interface PageParams {
  id: string;
}

interface PageProps {
  params: PageParams;
  searchParams: { [key: string]: string | string[] | undefined };
}

export default function EditItemPage({ params }: PageProps) {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-5">
        {params.id === "new" ? "Add New Item" : "Edit Item"}
      </h1>
      <ItemForm id={params.id} />
    </div>
  )
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  return {
    title: params.id === "new" ? "Add New Item" : `Edit Item ${params.id}`,
  }
}

