"use client";

import { format } from "date-fns";

type Resource = {
  id: string;
  title: string;
  category: string;
  subject: string;
  classLevel: string;
  year: number | null;
  fileName: string;
  fileSize: number;
  blobUrl: string;
  createdAt: string;
};

export function ResourceCard({ resource }: { resource: Resource }) {
  const getSubjectColor = (subject: string) => {
    switch (subject) {
      case "Physics":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
      case "Chemistry":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
      case "Biology":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300";
      default:
        return "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Previous Year Paper":
        return "history_edu";
      case "Mock Test":
        return "quiz";
      case "Study Notes":
      default:
        return "menu_book";
    }
  };

  const formatFileSize = (bytes: number) => {
    return (bytes / (1024 * 1024)).toFixed(2) + " MB";
  };

  const isPdf = resource.fileName.toLowerCase().endsWith(".pdf");

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
      <div className="flex flex-1 flex-col p-6">
        <div className="mb-4 flex items-start justify-between gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-slate-500 group-hover:bg-primary/10 group-hover:text-primary transition-colors dark:bg-slate-800 dark:text-slate-400">
            <span className="material-symbols-outlined text-2xl">
              {isPdf ? "picture_as_pdf" : "description"}
            </span>
          </div>
          <div className="flex flex-col items-end gap-2">
            <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${getSubjectColor(resource.subject)}`}>
              {resource.subject}
            </span>
            <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase text-slate-500">
              <span className="material-symbols-outlined text-[12px]">{getCategoryIcon(resource.category)}</span>
              {resource.category}
            </span>
          </div>
        </div>

        <h3 className="mb-2 line-clamp-2 text-lg font-bold leading-tight text-slate-900 dark:text-white">
          {resource.title}
        </h3>

        <div className="mt-auto pt-4 flex flex-wrap items-center gap-3 text-xs font-medium text-slate-500">
          <div className="flex items-center gap-1 border-r border-slate-200 pr-3 dark:border-slate-800">
            <span className="material-symbols-outlined text-[14px]">school</span>
            {resource.classLevel}
          </div>
          {resource.year && (
            <div className="flex items-center gap-1 border-r border-slate-200 pr-3 dark:border-slate-800">
              <span className="material-symbols-outlined text-[14px]">calendar_today</span>
              {resource.year}
            </div>
          )}
          <div className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">sd_storage</span>
            {formatFileSize(resource.fileSize)}
          </div>
        </div>
      </div>

      <div className="border-t border-slate-100 bg-slate-50/50 p-4 transition-colors group-hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-800/30 dark:group-hover:bg-slate-800/50">
        <a
          href={resource.blobUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-bold text-primary shadow-sm ring-1 ring-inset ring-slate-200 transition-all hover:bg-primary hover:text-white hover:ring-primary dark:bg-slate-800 dark:ring-slate-700 dark:hover:bg-primary dark:hover:ring-primary"
        >
          <span className="material-symbols-outlined text-[18px]">download</span>
          Download File
        </a>
      </div>
    </div>
  );
}
