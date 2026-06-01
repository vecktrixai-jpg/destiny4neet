"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";

type Resource = {
  id: string;
  title: string;
  category: string;
  subject: string;
  fileName: string;
  status: string;
  createdAt: string;
  classLevel: string;
  year: number | null;
};

export function ResourcePageActions({ resources }: { resources: Resource[] }) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({ current: 0, total: 0 });

  const handleExport = () => {
    if (resources.length === 0) return alert("No resources to export");
    
    const headers = ["Title", "Category", "Subject", "Class Level", "Year", "File Name", "Status", "Date Uploaded"];
    const csvContent = [
      headers.join(","),
      ...resources.map(r => 
        [
          `"${r.title.replace(/"/g, '""')}"`,
          `"${r.category}"`,
          `"${r.subject}"`,
          `"${r.classLevel}"`,
          `"${r.year || ''}"`,
          `"${r.fileName.replace(/"/g, '""')}"`,
          `"${r.status}"`,
          `"${new Date(r.createdAt).toLocaleDateString()}"`
        ].join(",")
      )
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `resources_export_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleBulkUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    setUploadProgress({ current: 0, total: files.length });

    const token = sessionStorage.getItem("adminToken");
    
    let successCount = 0;
    
    for (let i = 0; i < files.length; i++) {
      const file = files.item(i);
      if (!file) continue;
      
      try {
        const formData = new FormData();
        const defaultTitle = file.name.split('.').slice(0, -1).join('.') || file.name;
        
        formData.append("title", defaultTitle);
        formData.append("category", "Study Notes");
        formData.append("subject", "Physics");
        formData.append("classLevel", "Class 11");
        formData.append("file", file);

        const response = await fetch("/api/resources", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${token}`
          },
          body: formData,
        });

        if (response.ok) {
          successCount++;
        }
      } catch (error) {
        console.error("Failed to upload", file.name, error);
      }
      setUploadProgress({ current: i + 1, total: files.length });
    }

    setIsUploading(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
    alert(`Bulk upload complete! Successfully uploaded ${successCount} out of ${files.length} files.`);
    router.refresh();
  };

  return (
    <div className="flex gap-2">
      <button 
        onClick={handleExport}
        className="flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold transition-colors hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800"
      >
        <span className="material-symbols-outlined text-sm">file_download</span>
        Export List
      </button>
      
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleBulkUpload} 
        className="hidden" 
        multiple 
        accept=".pdf,.docx,.ppt,.pptx"
      />
      
      <button 
        onClick={() => fileInputRef.current?.click()}
        disabled={isUploading}
        className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:bg-primary-container hover:text-on-primary-container disabled:opacity-70"
      >
        {isUploading ? (
          <>
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent inline-block"></span>
            {uploadProgress.current}/{uploadProgress.total}
          </>
        ) : (
          <>
            <span className="material-symbols-outlined text-sm">upload</span>
            Bulk Upload
          </>
        )}
      </button>
    </div>
  );
}
