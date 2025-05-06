import React from "react";
import "./docs.css";

export const metadata = {
  title: "AI Journal Documentation",
  description: "Comprehensive documentation for the AI Journal application",
};

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="docs-container">{children}</div>;
}
