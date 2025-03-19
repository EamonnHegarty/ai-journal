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
    setLoading(true);

    const answer = await askQuestion(value);

    console.log(answer);
    setResponse(answer);
    setValue("");
    setLoading(false);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          disabled={loading}
          type="text"
          onChange={onChange}
          value={value}
          placeholder="Ask a Question"
          className="mr-6 rounded-lg border border-black/20 bg-white px-4 py-2 text-lg"
        />
        <button
          disabled={loading}
          type="submit"
          className="rounded-lg bg-blue-400 px-4 py-2 text-lg"
        >
          Ask
        </button>
      </form>
      {loading && <div>...loading</div>}
      {response && <div>{response}</div>}
    </div>
  );
};

export default Question;
