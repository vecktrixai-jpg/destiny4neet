import type { Metadata } from "next";
import { db } from "@/server/db";
import Link from "next/link";

export const metadata: Metadata = {
  title: "The Sovereign Scholar | Student Resource Page",
  description:
    "Download free previous year papers, mock tests, and study notes for NEET preparation.",
};

export const dynamic = "force-dynamic";

// Helper to format file size
function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

// Icon map for subjects
function getSubjectIcon(subject: string): string {
  switch (subject) {
    case "Physics":
      return "bolt";
    case "Biology":
      return "biotech";
    case "Chemistry":
      return "science";
    default:
      return "description";
  }
}

// Icon map for categories
function getCategoryIcon(category: string): string {
  switch (category) {
    case "Previous Year Paper":
      return "history_edu";
    case "Mock Test":
      return "quiz";
    case "Study Notes":
      return "menu_book";
    default:
      return "folder";
  }
}

export default async function ResourcesPage({
  searchParams,
}: {
  searchParams: Promise<{
    subject?: string;
    category?: string;
    classLevel?: string;
    search?: string;
  }>;
}) {
  const { subject, category, classLevel, search } = await searchParams;

  // Build Prisma filter
  const where: Record<string, unknown> = { status: "Published" };

  if (subject && subject !== "All") {
    where.subject = subject;
  }
  if (category && category !== "All") {
    where.category = category;
  }
  if (classLevel && classLevel !== "All") {
    where.classLevel = classLevel;
  }
  if (search) {
    where.title = { contains: search, mode: "insensitive" };
  }

  const resources = await db.resource.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });

  // Counts for sidebar badges (always from full set)
  const totalCount = await db.resource.count({
    where: { status: "Published" },
  });
  const countByCategory = await db.resource.groupBy({
    by: ["category"],
    where: { status: "Published" },
    _count: true,
  });
  const countBySubject = await db.resource.groupBy({
    by: ["subject"],
    where: { status: "Published" },
    _count: true,
  });
  const countByClassLevel = await db.resource.groupBy({
    by: ["classLevel"],
    where: { status: "Published" },
    _count: true,
  });

  const subjects = ["All", "Physics", "Chemistry", "Biology"];
  const categories = ["All", "Previous Year Paper", "Mock Test", "Study Notes"];
  const classLevels = ["All", "Class 11", "Class 12"];

  const hasActiveFilters = !!(
    search ??
    (subject && subject !== "All") ??
    (category && category !== "All") ??
    (classLevel && classLevel !== "All")
  );

  // Build URL helper
  function buildFilterUrl(params: Record<string, string | undefined>): string {
    const merged: Record<string, string> = {};
    if (search) merged.search = search;
    if (subject && subject !== "All") merged.subject = subject;
    if (category && category !== "All") merged.category = category;
    if (classLevel && classLevel !== "All") merged.classLevel = classLevel;
    // Override with new params
    for (const [k, v] of Object.entries(params)) {
      if (v && v !== "All") {
        merged[k] = v;
      } else {
        delete merged[k];
      }
    }
    const qs = new URLSearchParams(merged).toString();
    return qs ? `/resources?${qs}` : "/resources";
  }

  return (
    <main className="min-h-screen bg-background pt-16 pb-20">
      {/* Compact Hero */}
      <section className="border-b border-outline bg-surface">
        <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="mb-3 inline-block rounded bg-primary-container px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-on-primary-container">
                Academic Repository
              </div>
              <h1 className="font-heading text-3xl font-extrabold tracking-tight text-on-surface md:text-4xl">
                The Scholarly{" "}
                <span className="text-primary">Archive.</span>
              </h1>
              <p className="mt-2 max-w-lg text-sm leading-relaxed text-on-surface-variant">
                Curated academic material for the aspiring medical
                professional.
              </p>
            </div>

            {/* Search bar */}
            <form
              action="/resources"
              className="relative w-full max-w-sm"
            >
              {/* Preserve existing filter params */}
              {subject && subject !== "All" && (
                <input type="hidden" name="subject" value={subject} />
              )}
              {category && category !== "All" && (
                <input type="hidden" name="category" value={category} />
              )}
              {classLevel && classLevel !== "All" && (
                <input type="hidden" name="classLevel" value={classLevel} />
              )}
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">
                search
              </span>
              <input
                type="text"
                name="search"
                defaultValue={search}
                placeholder="Search resources..."
                className="w-full rounded-lg border border-outline bg-surface-variant py-2.5 pl-10 pr-4 text-sm text-on-surface placeholder:text-on-surface-variant/60 focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/20"
              />
            </form>
          </div>
        </div>
      </section>

      {/* Main content: Sidebar + Grid */}
      <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
        <div className="flex flex-col gap-8 lg:flex-row">
          {/* ─── Left Sidebar ─── */}
          <aside className="w-full shrink-0 lg:w-64">
            <div className="sticky top-20 space-y-6">
              {/* Active Filters summary */}
              {hasActiveFilters && (
                <div className="rounded-lg border border-primary/20 bg-primary-container/20 p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                      Active Filters
                    </span>
                    <Link
                      href="/resources"
                      className="text-xs font-semibold text-primary hover:underline"
                    >
                      Clear all
                    </Link>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {search && (
                      <Link
                        href={buildFilterUrl({ search: undefined })}
                        className="inline-flex items-center gap-1 rounded-full bg-surface px-3 py-1 text-xs font-medium text-on-surface shadow-sm border border-outline hover:bg-surface-variant transition-colors"
                      >
                        &ldquo;{search}&rdquo;
                        <span className="material-symbols-outlined text-[14px] text-on-surface-variant">
                          close
                        </span>
                      </Link>
                    )}
                    {subject && subject !== "All" && (
                      <Link
                        href={buildFilterUrl({ subject: "All" })}
                        className="inline-flex items-center gap-1 rounded-full bg-surface px-3 py-1 text-xs font-medium text-on-surface shadow-sm border border-outline hover:bg-surface-variant transition-colors"
                      >
                        {subject}
                        <span className="material-symbols-outlined text-[14px] text-on-surface-variant">
                          close
                        </span>
                      </Link>
                    )}
                    {category && category !== "All" && (
                      <Link
                        href={buildFilterUrl({ category: "All" })}
                        className="inline-flex items-center gap-1 rounded-full bg-surface px-3 py-1 text-xs font-medium text-on-surface shadow-sm border border-outline hover:bg-surface-variant transition-colors"
                      >
                        {category}
                        <span className="material-symbols-outlined text-[14px] text-on-surface-variant">
                          close
                        </span>
                      </Link>
                    )}
                    {classLevel && classLevel !== "All" && (
                      <Link
                        href={buildFilterUrl({ classLevel: "All" })}
                        className="inline-flex items-center gap-1 rounded-full bg-surface px-3 py-1 text-xs font-medium text-on-surface shadow-sm border border-outline hover:bg-surface-variant transition-colors"
                      >
                        {classLevel}
                        <span className="material-symbols-outlined text-[14px] text-on-surface-variant">
                          close
                        </span>
                      </Link>
                    )}
                  </div>
                </div>
              )}

              {/* Category Filter */}
              <div className="rounded-lg border border-outline bg-surface p-5 shadow-sm">
                <h3 className="mb-4 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
                  Category
                </h3>
                <nav className="space-y-1">
                  {categories.map((cat) => {
                    const isActive =
                      cat === "All"
                        ? !category || category === "All"
                        : category === cat;
                    const count =
                      cat === "All"
                        ? totalCount
                        : (countByCategory.find((c) => c.category === cat)
                            ?._count ?? 0);
                    return (
                      <Link
                        key={cat}
                        href={buildFilterUrl({ category: cat })}
                        className={`flex items-center justify-between rounded-md px-3 py-2.5 text-sm font-medium transition-colors ${
                          isActive
                            ? "bg-primary text-white shadow-sm"
                            : "text-on-surface hover:bg-surface-variant"
                        }`}
                      >
                        <span className="flex items-center gap-2.5">
                          <span
                            className={`material-symbols-outlined text-[18px] ${isActive ? "text-white" : "text-on-surface-variant"}`}
                          >
                            {cat === "All"
                              ? "folder_open"
                              : getCategoryIcon(cat)}
                          </span>
                          {cat === "All" ? "All Categories" : cat}
                        </span>
                        <span
                          className={`min-w-[24px] rounded-full px-2 py-0.5 text-center text-[10px] font-bold ${
                            isActive
                              ? "bg-white/20 text-white"
                              : "bg-surface-variant text-on-surface-variant"
                          }`}
                        >
                          {count}
                        </span>
                      </Link>
                    );
                  })}
                </nav>
              </div>

              {/* Subject Filter */}
              <div className="rounded-lg border border-outline bg-surface p-5 shadow-sm">
                <h3 className="mb-4 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
                  Subject
                </h3>
                <nav className="space-y-1">
                  {subjects.map((sub) => {
                    const isActive =
                      sub === "All"
                        ? !subject || subject === "All"
                        : subject === sub;
                    const count =
                      sub === "All"
                        ? totalCount
                        : (countBySubject.find((s) => s.subject === sub)
                            ?._count ?? 0);
                    return (
                      <Link
                        key={sub}
                        href={buildFilterUrl({ subject: sub })}
                        className={`flex items-center justify-between rounded-md px-3 py-2.5 text-sm font-medium transition-colors ${
                          isActive
                            ? "bg-primary text-white shadow-sm"
                            : "text-on-surface hover:bg-surface-variant"
                        }`}
                      >
                        <span className="flex items-center gap-2.5">
                          <span
                            className={`material-symbols-outlined text-[18px] ${isActive ? "text-white" : "text-on-surface-variant"}`}
                          >
                            {sub === "All"
                              ? "apps"
                              : getSubjectIcon(sub)}
                          </span>
                          {sub === "All" ? "All Subjects" : sub}
                        </span>
                        <span
                          className={`min-w-[24px] rounded-full px-2 py-0.5 text-center text-[10px] font-bold ${
                            isActive
                              ? "bg-white/20 text-white"
                              : "bg-surface-variant text-on-surface-variant"
                          }`}
                        >
                          {count}
                        </span>
                      </Link>
                    );
                  })}
                </nav>
              </div>

              {/* Class Level Filter */}
              <div className="rounded-lg border border-outline bg-surface p-5 shadow-sm">
                <h3 className="mb-4 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
                  Class
                </h3>
                <nav className="space-y-1">
                  {classLevels.map((cls) => {
                    const isActive =
                      cls === "All"
                        ? !classLevel || classLevel === "All"
                        : classLevel === cls;
                    const count =
                      cls === "All"
                        ? totalCount
                        : (countByClassLevel.find((c) => c.classLevel === cls)
                            ?._count ?? 0);
                    return (
                      <Link
                        key={cls}
                        href={buildFilterUrl({ classLevel: cls })}
                        className={`flex items-center justify-between rounded-md px-3 py-2.5 text-sm font-medium transition-colors ${
                          isActive
                            ? "bg-primary text-white shadow-sm"
                            : "text-on-surface hover:bg-surface-variant"
                        }`}
                      >
                        <span className="flex items-center gap-2.5">
                          <span
                            className={`material-symbols-outlined text-[18px] ${isActive ? "text-white" : "text-on-surface-variant"}`}
                          >
                            {cls === "All" ? "school" : "class"}
                          </span>
                          {cls === "All" ? "All Classes" : cls}
                        </span>
                        <span
                          className={`min-w-[24px] rounded-full px-2 py-0.5 text-center text-[10px] font-bold ${
                            isActive
                              ? "bg-white/20 text-white"
                              : "bg-surface-variant text-on-surface-variant"
                          }`}
                        >
                          {count}
                        </span>
                      </Link>
                    );
                  })}
                </nav>
              </div>
            </div>
          </aside>

          {/* ─── Main Content Area ─── */}
          <section className="min-w-0 flex-1">
            {/* Results header */}
            <div className="mb-6 flex items-center justify-between">
              <p className="text-sm text-on-surface-variant">
                <span className="font-bold text-on-surface">
                  {resources.length}
                </span>{" "}
                resource{resources.length !== 1 ? "s" : ""} found
              </p>
            </div>

            {/* Resource Cards */}
            {resources.length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {resources.map((resource) => (
                  <a
                    key={resource.id}
                    href={resource.blobUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col rounded-lg border border-outline bg-surface p-5 shadow-sm transition-all duration-200 hover:border-primary hover:shadow-md"
                  >
                    {/* Top row: icon + category badge */}
                    <div className="mb-4 flex items-start justify-between">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-container text-primary">
                        <span className="material-symbols-outlined text-xl">
                          {getCategoryIcon(resource.category)}
                        </span>
                      </div>
                      <span className="rounded-full bg-surface-variant px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">
                        {resource.category}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="mb-1 font-heading text-base font-bold leading-snug text-on-surface group-hover:text-primary line-clamp-2">
                      {resource.title}
                    </h3>

                    {/* Meta row */}
                    <div className="mt-1 mb-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-on-surface-variant">
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">
                          {getSubjectIcon(resource.subject)}
                        </span>
                        {resource.subject}
                      </span>
                      <span>•</span>
                      <span>{resource.classLevel}</span>
                      {resource.year && (
                        <>
                          <span>•</span>
                          <span>{resource.year}</span>
                        </>
                      )}
                    </div>

                    {/* Bottom row */}
                    <div className="mt-auto flex items-center justify-between border-t border-outline pt-3">
                      <span className="text-[11px] text-on-surface-variant">
                        {formatFileSize(resource.fileSize)}
                      </span>
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-primary transition-transform group-hover:translate-x-0.5">
                        Download
                        <span className="material-symbols-outlined text-[16px]">
                          download
                        </span>
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-outline bg-surface py-20 text-center">
                <span className="material-symbols-outlined mb-4 text-5xl text-outline">
                  search_off
                </span>
                <h3 className="text-lg font-bold text-on-surface">
                  No resources found
                </h3>
                <p className="mt-2 max-w-xs text-sm text-on-surface-variant">
                  Try adjusting your filters or search query to find what
                  you&apos;re looking for.
                </p>
                {hasActiveFilters && (
                  <Link
                    href="/resources"
                    className="mt-6 rounded-lg bg-primary px-5 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-on-primary-container transition-colors"
                  >
                    Clear all filters
                  </Link>
                )}
              </div>
            )}
          </section>
        </div>
      </div>

    </main>
  );
}
