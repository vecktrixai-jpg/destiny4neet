"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";

export function ResourceUploadForm({ onSuccess }: { onSuccess?: () => void }) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Previous Year Paper");
  const [subject, setSubject] = useState("Physics");
  const [classLevel, setClassLevel] = useState("Class 11");
  const [year, setYear] = useState("");
  const [file, setFile] = useState<File | null>(null);
  
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      // Validate file type
      const validTypes = ["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "application/vnd.ms-powerpoint"];
      if (!validTypes.includes(selectedFile.type)) {
        setError("Please select a PDF, DOCX, or PPT file.");
        setFile(null);
        return;
      }
      
      // Validate file size (25MB max)
      if (selectedFile.size > 25 * 1024 * 1024) {
        setError("File size must be less than 25MB.");
        setFile(null);
        return;
      }
      
      setFile(selectedFile);
      setError("");
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) {
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(droppedFile);
      if (fileInputRef.current) {
        fileInputRef.current.files = dataTransfer.files;
        // Trigger the change event logic manually
        handleFileChange({ target: { files: dataTransfer.files } } as unknown as React.ChangeEvent<HTMLInputElement>);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setError("Please select a file to upload.");
      return;
    }

    setIsUploading(true);
    setError("");
    setSuccess("");

    try {
      const token = sessionStorage.getItem("adminToken");
      if (!token) throw new Error("Not authenticated");

      const formData = new FormData();
      formData.append("title", title);
      formData.append("category", category);
      formData.append("subject", subject);
      formData.append("classLevel", classLevel);
      if (year) formData.append("year", year);
      formData.append("file", file);

      const response = await fetch("/api/resources", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`
        },
        body: formData,
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Upload failed");
      }

      setSuccess("Resource published successfully!");
      
      // Reset form
      setTitle("");
      setCategory("Previous Year Paper");
      setSubject("Physics");
      setClassLevel("Class 11");
      setYear("");
      setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      
      // Trigger refresh
      if (onSuccess) onSuccess();
      router.refresh();
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(""), 3000);
      
    } catch (err: any) {
      setError(err.message || "An error occurred during upload.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <section className="flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm xl:col-span-4 dark:border-slate-800 dark:bg-slate-900">
      <div className="border-b border-slate-100 bg-slate-50/50 px-6 py-4 dark:border-slate-800 dark:bg-slate-800/50">
        <h3 className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
          <span className="material-symbols-outlined text-blue-600">post_add</span>
          Upload New Resource
        </h3>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-5 p-6">
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wide text-slate-700 dark:text-slate-300">Resource Title</label>
          <input 
            type="text" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full rounded-lg border-slate-200 px-4 py-2.5 text-sm placeholder:text-slate-400 focus:border-blue-600 focus:ring-blue-600 dark:border-slate-700 dark:bg-slate-800 dark:text-white" 
            placeholder="e.g., '2024 Physics PYQ'" 
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wide text-slate-700 dark:text-slate-300">Category</label>
            <select 
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-lg border-slate-200 px-4 py-2.5 text-sm focus:border-blue-600 focus:ring-blue-600 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            >
              <option>Previous Year Paper</option>
              <option>Mock Test</option>
              <option>Study Notes</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wide text-slate-700 dark:text-slate-300">Subject</label>
            <select 
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full rounded-lg border-slate-200 px-4 py-2.5 text-sm focus:border-blue-600 focus:ring-blue-600 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            >
              <option>Physics</option>
              <option>Chemistry</option>
              <option>Biology</option>
            </select>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wide text-slate-700 dark:text-slate-300">Class</label>
            <select 
              value={classLevel}
              onChange={(e) => setClassLevel(e.target.value)}
              className="w-full rounded-lg border-slate-200 px-4 py-2.5 text-sm focus:border-blue-600 focus:ring-blue-600 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            >
              <option>Class 11</option>
              <option>Class 12</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wide text-slate-700 dark:text-slate-300">Year</label>
            <input 
              type="number" 
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="w-full rounded-lg border-slate-200 px-4 py-2.5 text-sm focus:border-blue-600 focus:ring-blue-600 dark:border-slate-700 dark:bg-slate-800 dark:text-white" 
              placeholder="2024" 
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wide text-slate-700 dark:text-slate-300">File Upload</label>
          <div 
            className={`group relative flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-8 transition-all ${
              file ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-slate-200 bg-slate-50 hover:border-blue-300 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800/50'
            }`}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
              className="hidden" 
              accept=".pdf,.docx,.ppt,.pptx"
            />
            
            {file ? (
              <>
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600 shadow-sm dark:bg-blue-900">
                  <span className="material-symbols-outlined text-3xl">task</span>
                </div>
                <p className="text-center text-sm font-medium text-blue-700 dark:text-blue-400">{file.name}</p>
                <p className="mt-1 text-center text-xs text-blue-500">
                  {(file.size / (1024 * 1024)).toFixed(2)} MB
                </p>
              </>
            ) : (
              <>
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-white text-red-500 shadow-sm transition-transform group-hover:scale-110 dark:bg-slate-700">
                  <span className="material-symbols-outlined text-3xl">picture_as_pdf</span>
                </div>
                <p className="text-center text-sm font-medium text-slate-900 dark:text-white">Click to upload or drag and drop</p>
                <p className="mt-1 text-center text-xs text-slate-500">PDF, DOCX, or PPT up to 25MB</p>
              </>
            )}
          </div>
        </div>
        
        {error && <p className="text-sm font-medium text-red-500">{error}</p>}
        {success && <p className="text-sm font-medium text-green-500">{success}</p>}
        
        <button 
          type="submit" 
          disabled={isUploading}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-3 font-bold text-white shadow-md transition-all hover:bg-primary-container hover:text-on-primary-container disabled:opacity-50"
        >
          {isUploading ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
              Uploading...
            </>
          ) : (
            <>
              <span className="material-symbols-outlined text-sm">publish</span>
              Publish Resource
            </>
          )}
        </button>
      </form>
    </section>
  );
}
