"use client";

import { updateEntry } from "@/utils/api";
import { useState } from "react";
import { useAutosave } from "react-autosave";
import Spinner from "./Spinner";

interface Entry {
  [x: string]: {
    mood: string;
    summary: string;
    color: string;
    subject: string;
    negative: string;
  };
  content: string;
  id: string;
}

const Editor = ({ entry }: { entry: Entry }) => {
  const [value, setValue] = useState(entry.content);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [analysis, setAnalysis] = useState(entry.analysis);

  const { mood, summary, color, subject, negative } = analysis;

  const analysisData = [
    {
      name: "Summary",
      value: summary,
    },
    {
      name: "Subject",
      value: subject,
    },
    {
      name: "Mood",
      value: mood,
    },
    {
      name: "Negative",
      value: negative ? "True" : "False",
    },
  ];

  useAutosave({
    data: value,
    onSave: async (_value) => {
      setIsSaving(true);
      setIsLoading(true);
      const data = await updateEntry(entry.id, _value);
      setAnalysis(data.analysis);
      setIsLoading(false);
      setIsSaving(false);
    },
  });

  return (
    <div className="relative flex h-full w-full flex-col lg:flex-row">
      <div className="absolute top-2 left-2 z-10">
        {isSaving ? (
          <Spinner />
        ) : (
          <div className="h-4 w-4 rounded-full bg-green-500"></div>
        )}
      </div>
      <div className="h-1/2 w-full lg:h-full lg:w-2/3">
        <textarea
          className="h-full w-full resize-none p-4 text-base outline-none md:p-6 md:text-lg lg:p-8"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
      <div className="h-1/2 w-full border-t border-black/10 lg:h-full lg:w-1/3 lg:border-t-0 lg:border-l">
        <div
          className="px-4 py-4 md:px-6 md:py-6"
          style={{ backgroundColor: color }}
        >
          <h2 className="text-xl font-semibold md:text-2xl">Analysis</h2>
        </div>
        <div className="overflow-y-auto">
          <ul>
            {analysisData.map((item) => (
              <li
                key={item.name}
                className="flex items-center justify-between border-t border-black/10 px-4 py-3 md:px-6 md:py-4"
              >
                <span className="text-base font-semibold md:text-lg">
                  {item.name}
                </span>
                <span className="text-sm md:text-base">{item.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Editor;
