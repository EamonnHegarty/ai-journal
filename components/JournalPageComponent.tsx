"use client";

import EntryCard from "@/components/EntryCard";
import NewEntryCard from "@/components/NewEntryCard";
import Question from "@/components/Question";
import Pagination from "./PaginationComponent";
import { getEntries } from "@/utils/api";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";

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
        <div className="text-lg">Loading entries...</div>
      </div>
    );
  }

  return (
    <div className="h-full w-full overflow-y-auto bg-zinc-100/50 p-4 md:p-6">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-6 text-2xl font-bold md:mb-8 md:text-3xl lg:mb-10 lg:text-4xl">
          Journals
        </h1>
        <div className="mb-6 md:mb-8">
          <Question />
        </div>
        <div className="grid grid-cols-1 gap-3 pb-16 sm:grid-cols-2 lg:grid-cols-3 xl:gap-4">
          <NewEntryCard onNewEntry={() => fetchEntries(currentPage)} />
          {entries.map((entry) => (
            <Link
              key={entry.id}
              href={`/journal/${entry.id}`}
              className="block h-full"
            >
              <EntryCard entry={entry} />
            </Link>
          ))}
        </div>
        {pagination.totalPages > 1 && (
          <div className="mt-6 mb-8 md:mt-8">
            <Pagination
              currentPage={pagination.page}
              totalPages={pagination.totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientJournalPage;
