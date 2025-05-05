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
      color?: string;
    };
  };
}

const EntryCard = ({ entry }: Params) => {
  const date = new Date(entry.createdAt).toDateString();
  const color = entry.analysis?.color || "#ffffff";

  const lightColor = color !== "#ffffff" ? `${color}33` : "rgba(0, 0, 0, 0.1)";

  return (
    <div
      className="flex h-full flex-col justify-between overflow-hidden rounded-lg bg-white p-3 shadow transition-all hover:shadow-md md:p-4"
      style={{ borderLeft: `4px solid ${color}` }}
    >
      <div className="text-xs font-medium text-gray-500 md:text-sm">{date}</div>
      <div className="my-2 flex-grow overflow-hidden">
        <p className="line-clamp-3 text-sm font-semibold text-gray-900 md:text-base">
          {entry.analysis?.summary || "No summary available."}
        </p>
      </div>
      <div className="mt-2 flex items-center justify-between">
        <div
          className="rounded-full px-2 py-1 text-xs font-medium capitalize md:text-sm"
          style={{
            backgroundColor: lightColor,
            color: color !== "#ffffff" ? color : "rgb(75, 85, 99)",
          }}
        >
          {entry.analysis?.mood || "Neutral"}
        </div>
      </div>
    </div>
  );
};

export default EntryCard;
