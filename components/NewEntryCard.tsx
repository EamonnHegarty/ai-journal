"use client";

import { createNewEntry } from "@/utils/api";
import { useRouter } from "next/navigation";
import { PenLine } from "lucide-react";

interface NewEntryCardProps {
  onNewEntry?: () => void;
}

const NewEntryCard = ({ onNewEntry }: NewEntryCardProps) => {
  const router = useRouter();

  const handleOnClick = async () => {
    try {
      const data = await createNewEntry();

      if (onNewEntry) {
        onNewEntry();
      }

      router.push(`/journal/${data.id}`);
    } catch (error) {
      console.error("Failed to create new entry:", error);
    }
  };

  return (
    <div
      onClick={handleOnClick}
      className="flex h-full cursor-pointer flex-col items-center justify-center overflow-hidden rounded-lg border-2 border-dashed border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100 p-3 shadow transition-all hover:shadow-md md:p-4"
    >
      <div className="flex flex-col items-center justify-center p-4 text-center">
        <PenLine className="mb-2 h-8 w-8 text-blue-500 md:h-10 md:w-10" />
        <span className="text-lg font-medium text-blue-700 md:text-xl">
          New Entry
        </span>
        <p className="mt-1 text-xs text-blue-500 md:text-sm">
          Click to start writing
        </p>
      </div>
    </div>
  );
};

export default NewEntryCard;
