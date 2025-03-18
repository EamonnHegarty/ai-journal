"use client";

import { updateEntry } from "@/utils/api";
import { useState } from "react";
import { useAutosave } from "react-autosave";

interface Entry {
  content: string;
  id: string;
}

const Editor = ({ entry }: { entry: Entry }) => {
  const [value, setValue] = useState(entry.content);
  const [isLoading, setIsLoading] = useState(false);

  useAutosave({
    data: value,
    onSave: async (_value) => {
      setIsLoading(true);
      const updated = await updateEntry(entry.id, _value);
      setIsLoading(false);
    },
  });

  return (
    <div className="h-full w-full">
      {isLoading && <div>...saving</div>}
      <textarea
        className="w-full h-11/12 p-8 text-xl outline-0"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};

export default Editor;
