"use client";

export function LogoutButton({ isCollapsed }: { isCollapsed?: boolean }) {
  const handleLogout = () => {
    sessionStorage.removeItem("adminAuth");
    sessionStorage.removeItem("adminToken");
    window.location.reload();
  };

  return (
    <button 
      onClick={handleLogout}
      className="flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-slate-600 transition-colors hover:bg-slate-200/50 hover:text-red-600 dark:text-slate-400 dark:hover:bg-slate-800/50 dark:hover:text-red-400"
    >
      <span className="material-symbols-outlined">logout</span>
      {!isCollapsed && <span>Logout</span>}
    </button>
  );
}
