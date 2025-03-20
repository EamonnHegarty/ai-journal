import { UserButton } from "@clerk/nextjs";
import React from "react";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const links = [
  { href: "/", label: "Home" },
  { href: "/journal", label: "Journal" },
  { href: "/history", label: "History" },
];

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <div className="relative h-screen w-screen">
      <aside className="absolute top-0 left-0 h-full w-[200px] border-r border-black/10">
        <div className="flex items-center justify-center px-8 py-6">
          AI JOURNAL
        </div>
        <ul>
          {links.map((link) => (
            <li key={link.href} className="px-2 py-6 text-xl text-black">
              <a href={link.href}>{link.label}</a>
            </li>
          ))}
        </ul>
      </aside>
      <div className="ml-[200px] h-full">
        <header className="h-[60px] border-b border-black/10">
          <div className="flex h-full w-full items-center justify-end px-6">
            <UserButton />
          </div>
        </header>
        <div className="h-[calc(100vh-60px)]">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
