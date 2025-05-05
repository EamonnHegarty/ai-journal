"use client";

import { askQuestion } from "@/utils/api";
import { useState } from "react";

const Question = () => {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!value.trim()) return;

    setLoading(true);
    try {
      const answer = await askQuestion(value);
      setResponse(answer);
    } catch (error) {
      console.error("Failed to get answer:", error);
      setResponse("Sorry, I couldn't process your question. Please try again.");
    } finally {
      setValue("");
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3"
      >
        <input
          disabled={loading}
          type="text"
          onChange={onChange}
          value={value}
          placeholder="Ask a question about your journal"
          className="flex-1 rounded-lg border border-black/20 bg-white px-4 py-2 text-base shadow-sm"
        />
        <button
          disabled={loading}
          type="submit"
          className="rounded-lg bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600"
        >
          {loading ? "Asking..." : "Ask"}
        </button>
      </form>

      {loading && (
        <div className="mt-4 text-gray-600">
          Thinking about your question...
        </div>
      )}

      {response && (
        <div className="mt-4 rounded-lg border border-black/10 bg-white p-4 shadow-sm">
          <h3 className="mb-2 font-semibold">Answer:</h3>
          <p className="text-gray-800">{response}</p>
        </div>
      )}
    </div>
  );
};

export default Question;
