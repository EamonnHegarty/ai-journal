interface Params {
  entry: {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    content: string;
    analysis?: {
      summary: string;
      mood: string;
    };
  };
}

const EntryCard = ({ entry }: Params) => {
  const date = new Date(entry.createdAt).toDateString();

  return (
    <div className="flex max-h-[250px] min-h-[150px] flex-col justify-between overflow-hidden rounded-lg bg-white p-4 shadow">
      {/* Date */}
      <div className="text-sm font-medium text-gray-500">{date}</div>

      {/* Summary with ellipsis */}
      <div className="flex-grow overflow-hidden">
        <p className="line-clamp-3 font-semibold text-gray-900">
          {entry.analysis?.summary || "No summary available."}
        </p>
      </div>

      {/* Mood Label */}
      <div className="text-sm font-medium text-gray-600 capitalize">
        {entry.analysis?.mood || "Neutral"}
      </div>
    </div>
  );
};

export default EntryCard;
