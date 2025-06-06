import HistoryChart from "@/components/HistoryChart";
import { getUserByClerkID } from "@/utils/auth";
import { prisma } from "@/utils/db";

const getData = async () => {
  const user = await getUserByClerkID();
  const analyses = await prisma.analysis.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  const sum = analyses.reduce((acc, curr) => acc + curr.sentimentScore, 0);
  const avg = Math.round(sum / analyses.length);

  return { analyses, avg };
};

const History = async () => {
  const { avg, analyses } = await getData();

  console.log(analyses);

  return (
    <div className="h-full w-full p-6">
      <div>{`Avg. Sentiment ${avg}`}</div>
      <div className="h-10/12 w-full">
        <HistoryChart data={analyses} />
      </div>
    </div>
  );
};

export default History;
