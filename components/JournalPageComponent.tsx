"use client";

import EntryCard from "@/components/EntryCard";
import NewEntryCard from "@/components/NewEntryCard";

import Question from "@/components/Question";
import { getEntries } from "@/utils/api";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import Pagination from "./PaginationComponent";

interface Analysis {
  summary: string;
  mood: string;
}

interface Entry {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  content: string;
  analysis?: Analysis;
}

interface PaginationData {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

const ClientJournalPage = () => {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [pagination, setPagination] = useState<PaginationData>({
    page: 1,
    pageSize: 6,
    total: 0,
    totalPages: 0,
  });
  const [loading, setLoading] = useState(true);

  const searchParams = useSearchParams();
  const router = useRouter();
  const currentPage = parseInt(searchParams.get("page") || "1");

  const fetchEntries = async (page: number = 1) => {
    setLoading(true);
    try {
      const { data, pagination: paginationData } = await getEntries(
        page,
        pagination.pageSize,
      );
      setEntries(data);
      setPagination(paginationData);
    } catch (error) {
      console.error("Failed to fetch entries:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage: number) => {
    router.push(`/journal?page=${newPage}`);
  };

  useEffect(() => {
    fetchEntries(currentPage);
  }, [currentPage]);

  if (loading && entries.length === 0) {
    return (
      <div className="flex h-full items-center justify-center">
        Loading entries...
      </div>
    );
  }

  return (
    <div className="h-full bg-zinc-100/50 px-6 py-8">
      <h1 className="mb-12 text-4xl">Journals</h1>

      <div className="my-8">
        <Question />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <NewEntryCard onNewEntry={() => fetchEntries(currentPage)} />
        {entries.map((entry) => (
          <Link key={entry.id} href={`/journal/${entry.id}`}>
            <EntryCard entry={entry} />
          </Link>
        ))}
      </div>

      {pagination.totalPages > 1 && (
        <div className="mt-8">
          <Pagination
            currentPage={pagination.page}
            totalPages={pagination.totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};

export default ClientJournalPage;
