import { db } from "@/server/db";
import { ResourceUploadForm } from "@/components/admin/ResourceUploadForm";
import { ResourceTable } from "@/components/admin/ResourceTable";
import { ResourcePageActions } from "@/components/admin/ResourcePageActions";

export default async function AdminResourcesPage() {
  // Fetch initial data
  const resources = await db.resource.findMany({
    orderBy: { createdAt: "desc" },
  });

  const totalResources = resources.length;
  const publishedCount = resources.filter(r => r.status === "Published").length;
  // This is a rough estimation of storage used out of a hypothetical 10GB limit
  const totalStorageBytes = resources.reduce((acc, curr) => acc + curr.fileSize, 0);
  const storagePercentage = Math.min(Math.round((totalStorageBytes / (10 * 1024 * 1024 * 1024)) * 100), 100);

  // We convert the dates to ISO strings to pass to client components
  const serializedResources = resources.map(r => ({
    ...r,
    createdAt: r.createdAt.toISOString(),
    updatedAt: r.updatedAt.toISOString(),
  }));

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">Resource Management</h2>
          <p className="mt-1 text-slate-500">Manage and publish academic materials for NEET Mastery candidates.</p>
        </div>
        <ResourcePageActions resources={serializedResources} />
      </div>

      <div className="grid grid-cols-1 items-start gap-8 xl:grid-cols-12">
        <ResourceUploadForm />
        <ResourceTable resources={serializedResources} />
      </div>


    </div>
  );
}
