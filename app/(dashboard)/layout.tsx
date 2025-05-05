"use client";
import { UserButton } from "@clerk/nextjs";
import React, { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const links = [
  { href: "/", label: "Home" },
  { href: "/journal", label: "Journal" },
  { href: "/history", label: "History" },
];

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-zinc-50">
      <header className="fixed top-0 left-0 z-20 flex h-16 w-full items-center justify-between border-b border-black/10 bg-white px-4 md:hidden">
        <button
          onClick={toggleSidebar}
          className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
          aria-label="Toggle menu"
        >
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <div className="text-lg font-semibold">AI JOURNAL</div>
        <UserButton />
      </header>
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-10 bg-black/20 md:hidden"
          onClick={toggleSidebar}
        />
      )}
      <aside
        className={`fixed top-0 left-0 z-20 h-full w-64 transform border-r border-black/10 bg-white transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <div className="flex h-16 items-center justify-center border-b border-black/10 px-8">
          <span className="text-lg font-semibold">AI JOURNAL</span>
        </div>
        <nav className="mt-4">
          <ul>
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block px-6 py-4 text-lg text-black hover:bg-gray-100"
                  onClick={() => setSidebarOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
      <div className="min-h-screen pt-16 md:pt-0 md:pl-64">
        <header className="hidden h-16 border-b border-black/10 md:block">
          <div className="flex h-full w-full items-center justify-end px-6">
            <UserButton />
          </div>
        </header>
        <div className="h-[calc(100vh-4rem)] w-full overflow-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
