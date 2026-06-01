"use client";

import { useState } from "react";
import { format } from "date-fns";
import { useRouter } from "next/navigation";

type Resource = {
  id: string;
  title: string;
  category: string;
  subject: string;
  fileName: string;
  fileSize: number;
  status: string;
  createdAt: string;
  classLevel: string;
  year: number | null;
};

export function ResourceTable({ resources }: { resources: Resource[] }) {
  const [filter, setFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [editingResource, setEditingResource] = useState<Resource | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();

  const itemsPerPage = 4;

  const filteredResources = resources.filter(res => {
    const matchesStatus = filter === "All" || res.status === filter;
    const matchesSearch = 
      res.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      res.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const totalPages = Math.max(1, Math.ceil(filteredResources.length / itemsPerPage));
  const paginatedResources = filteredResources.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this resource?")) return;
    
    setIsDeleting(id);
    try {
      const token = sessionStorage.getItem("adminToken");
      
      const response = await fetch(`/api/resources/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      
      if (!response.ok) throw new Error("Failed to delete");
      
      router.refresh();
    } catch (error) {
      alert("Failed to delete resource");
    } finally {
      setIsDeleting(null);
    }
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingResource) return;

    setIsSaving(true);
    try {
      const token = sessionStorage.getItem("adminToken");
      const response = await fetch(`/api/resources/${editingResource.id}`, {
        method: "PATCH",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: editingResource.title,
          category: editingResource.category,
          subject: editingResource.subject,
          classLevel: editingResource.classLevel,
          year: editingResource.year,
        }),
      });

      if (!response.ok) throw new Error("Failed to update");
      
      setEditingResource(null);
      router.refresh();
    } catch (error) {
      alert("Failed to update resource");
    } finally {
      setIsSaving(false);
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Previous Year Paper":
        return "bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300";
      case "Mock Test":
        return "bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-300";
      case "Study Notes":
      default:
        return "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300";
    }
  };

  const formatFileSize = (bytes: number) => {
    return (bytes / (1024 * 1024)).toFixed(2) + " MB";
  };

  const handleFilterChange = (f: string) => {
    setFilter(f);
    setCurrentPage(1);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  return (
    <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm xl:col-span-8 dark:border-slate-800 dark:bg-slate-900">
      <div className="flex flex-col gap-4 border-b border-slate-100 px-6 py-4 dark:border-slate-800">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <h3 className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
            <span className="material-symbols-outlined text-blue-600">inventory_2</span>
            Resource Inventory
          </h3>

        </div>
        <div className="group relative w-full sm:max-w-md">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-lg text-slate-400 transition-colors group-focus-within:text-blue-600">search</span>
          <input
            type="text"
            placeholder="Search resources by title, subject, or category..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-10 pr-4 text-sm transition-all focus:border-blue-600 focus:bg-white focus:ring-2 focus:ring-blue-600/20 dark:border-slate-700 dark:bg-slate-800"
          />
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="border-b border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-800/50">
            <tr>
              <th className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-slate-500">Title</th>
              <th className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-slate-500">Category</th>
              <th className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-slate-500">Subject</th>
              <th className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-slate-500">Date Uploaded</th>
              <th className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-slate-500">Status</th>
              <th className="px-6 py-3 text-right text-xs font-bold uppercase tracking-wider text-slate-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {paginatedResources.length > 0 ? (
              paginatedResources.map((resource) => (
                <tr key={resource.id} className="transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-red-500">
                        {resource.fileName.endsWith('.pdf') ? 'picture_as_pdf' : 'description'}
                      </span>
                      <div>
                        <div className="text-sm font-semibold text-slate-900 dark:text-white">{resource.title}</div>
                        <div className="text-[10px] text-slate-500">{formatFileSize(resource.fileSize)}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`rounded px-2 py-1 text-[10px] font-bold uppercase ${getCategoryColor(resource.category)}`}>
                      {resource.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-slate-700 dark:text-slate-300">{resource.subject}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-slate-500">{format(new Date(resource.createdAt), "MMM dd, yyyy")}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5">
                      <span className={`h-1.5 w-1.5 rounded-full ${resource.status === 'Published' ? 'bg-green-500' : 'bg-yellow-500'}`}></span>
                      <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{resource.status}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-1">
                      <button 
                        onClick={() => setEditingResource(resource)}
                        className="rounded-md p-1.5 text-slate-400 transition-all hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-900/20"
                      >
                        <span className="material-symbols-outlined text-lg">edit</span>
                      </button>
                      <button 
                        onClick={() => handleDelete(resource.id)}
                        disabled={isDeleting === resource.id}
                        className="rounded-md p-1.5 text-slate-400 transition-all hover:bg-red-50 hover:text-red-600 disabled:opacity-50 dark:hover:bg-red-900/20"
                      >
                        {isDeleting === resource.id ? (
                          <span className="h-4 w-4 animate-spin rounded-full border-2 border-red-600 border-t-transparent inline-block"></span>
                        ) : (
                          <span className="material-symbols-outlined text-lg">delete</span>
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center text-sm text-slate-500">
                  No resources found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50/30 px-6 py-4 dark:border-slate-800 dark:bg-slate-800/30">
        <p className="text-xs font-medium text-slate-500">
          Showing {Math.min(filteredResources.length, (currentPage - 1) * itemsPerPage + 1)} to {Math.min(filteredResources.length, currentPage * itemsPerPage)} of {filteredResources.length} resources
        </p>
        <div className="flex gap-2">
          <button 
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="flex h-8 w-8 items-center justify-center rounded border border-slate-200 bg-white text-slate-400 transition-colors hover:bg-slate-50 disabled:opacity-50 dark:border-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700"
          >
            <span className="material-symbols-outlined text-sm">chevron_left</span>
          </button>
          
          {Array.from({ length: totalPages }).map((_, i) => {
            const page = i + 1;
            const isActive = page === currentPage;
            return (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`flex h-8 w-8 items-center justify-center rounded border transition-colors text-xs font-bold ${
                  isActive 
                    ? "border-slate-200 bg-white text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white shadow-sm" 
                    : "border-transparent bg-transparent text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800"
                }`}
              >
                {page}
              </button>
            );
          })}
          
          <button 
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="flex h-8 w-8 items-center justify-center rounded border border-slate-200 bg-white text-slate-400 transition-colors hover:bg-slate-50 disabled:opacity-50 dark:border-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700"
          >
            <span className="material-symbols-outlined text-sm">chevron_right</span>
          </button>
        </div>
      </div>

      {/* Edit Modal */}
      {editingResource && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <h3 className="mb-4 text-lg font-bold text-slate-900 dark:text-white">Edit Resource</h3>
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase text-slate-600 dark:text-slate-400">Title</label>
                <input 
                  type="text" 
                  value={editingResource.title}
                  onChange={(e) => setEditingResource({...editingResource, title: e.target.value})}
                  className="w-full rounded-lg border-slate-200 px-3 py-2 text-sm focus:border-blue-600 focus:ring-blue-600 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase text-slate-600 dark:text-slate-400">Category</label>
                  <select 
                    value={editingResource.category}
                    onChange={(e) => setEditingResource({...editingResource, category: e.target.value})}
                    className="w-full rounded-lg border-slate-200 px-3 py-2 text-sm focus:border-blue-600 focus:ring-blue-600 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  >
                    <option>Previous Year Paper</option>
                    <option>Mock Test</option>
                    <option>Study Notes</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase text-slate-600 dark:text-slate-400">Subject</label>
                  <select 
                    value={editingResource.subject}
                    onChange={(e) => setEditingResource({...editingResource, subject: e.target.value})}
                    className="w-full rounded-lg border-slate-200 px-3 py-2 text-sm focus:border-blue-600 focus:ring-blue-600 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  >
                    <option>Physics</option>
                    <option>Chemistry</option>
                    <option>Biology</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase text-slate-600 dark:text-slate-400">Class</label>
                  <select 
                    value={editingResource.classLevel}
                    onChange={(e) => setEditingResource({...editingResource, classLevel: e.target.value})}
                    className="w-full rounded-lg border-slate-200 px-3 py-2 text-sm focus:border-blue-600 focus:ring-blue-600 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  >
                    <option>Class 11</option>
                    <option>Class 12</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase text-slate-600 dark:text-slate-400">Year</label>
                  <input 
                    type="number" 
                    value={editingResource.year || ""}
                    onChange={(e) => setEditingResource({...editingResource, year: e.target.value ? parseInt(e.target.value) : null})}
                    className="w-full rounded-lg border-slate-200 px-3 py-2 text-sm focus:border-blue-600 focus:ring-blue-600 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />
                </div>
              </div>
              
              <div className="mt-6 flex justify-end gap-3">
                <button 
                  type="button" 
                  onClick={() => setEditingResource(null)}
                  className="rounded-lg px-4 py-2 text-sm font-bold text-slate-600 transition-colors hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={isSaving}
                  className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
                >
                  {isSaving ? (
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent inline-block"></span>
                  ) : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
