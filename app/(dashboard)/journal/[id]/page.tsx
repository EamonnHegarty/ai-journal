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

  return (
    <div className="h-full w-full">
      <Editor entry={entry as Entry} />
    </div>
  );
};

export default EntryPage;
