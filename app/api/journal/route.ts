import { analyze } from "@/utils/ai";
import { getUserByClerkID } from "@/utils/auth";
import { prisma } from "@/utils/db";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export const POST = async () => {
  const user = await getUserByClerkID();

  const entry = await prisma.journalEntry.create({
    data: {
      userId: user.id,
      content: "Write about your day",
    },
  });

  const analysis = await analyze(entry.content);
  await prisma.analysis.create({
    data: {
      userId: user.id,
      entryId: entry.id,
      ...analysis,
    },
  });

  revalidatePath("/journal");

  return NextResponse.json({ data: entry });
};

export const GET = async (request: NextRequest) => {
  const user = await getUserByClerkID();

  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1");
  const pageSize = parseInt(searchParams.get("pageSize") || "6");

  const skip = (page - 1) * pageSize;

  const entries = await prisma.journalEntry.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      analysis: true,
    },
    skip,
    take: pageSize,
  });

  const total = await prisma.journalEntry.count({
    where: {
      userId: user.id,
    },
  });

  return NextResponse.json({
    data: entries,
    pagination: {
      page,
      pageSize,
      total,
      totalPages: Math.ceil(total / pageSize),
    },
  });
};
