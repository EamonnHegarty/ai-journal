import Editor from "@/components/Editor";
import { getUserByClerkID } from "@/utils/auth";
import { prisma } from "@/utils/db";

interface Params {
  id: string;
}

interface Entry {
  content: string;
  id: string;
}

const getEntry = async (id: string) => {
  const user = await getUserByClerkID();
  const entry = await prisma.journalEntry.findUnique({
    where: {
      userId_id: {
        userId: user.id,
        id,
      },
    },
  });

  return entry;
};

const EntryPage = async ({ params }: { params: Params }) => {
  // for some reason nextjs needs you to await the params
  // https://nextjs.org/docs/messages/sync-dynamic-apis
  const { id } = await params;
  const entry = await getEntry(id);

  const analysisData = [
    {
      name: "Summary",
      value: "",
    },
    {
      name: "Subject",
      value: "",
    },
    {
      name: "Mood",
      value: "",
    },
    {
      name: "Negative",
      value: "False",
    },
  ];

  return (
    <div className="grid h-full w-full grid-cols-3">
      <div className="col-span-2">
        <Editor entry={entry as Entry} />
      </div>
      <div className="border-l border-black/10">
        <div className="bg-blue-300 px-6 py-10">
          <h2 className="text-2xl">Analysis</h2>
        </div>
        <div>
          <ul>
            {analysisData.map((item) => (
              <li
                key={item.name}
                className="flex items-center justify-between border-t border-b border-black/10 px-2 py-4"
              >
                <span className="text-lg font-semibold">{item.name}</span>
                <span>{item.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default EntryPage;
