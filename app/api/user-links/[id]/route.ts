import dbConnect from "@/lib/db";
import Url from "@/lib/url";
import { auth } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { userId } = await auth();
  if (!userId) return new Response("Unauthorized", { status: 401 });

  await dbConnect();
  const url = await Url.findOne({ _id: params.id, userId });
  if (!url) return new Response("Not found", { status: 404 });

  // clicksByDate is a Map, convert to plain object
  const clicksByDate = Object.fromEntries(url.clicksByDate);

  return Response.json({
    url: url.url,
    shorturl: url.shorturl,
    createdAt: url.createdAt,
    clicksByDate,
    totalClicks: Object.values(clicksByDate).reduce((a: any, b: any) => a + b, 0),
  });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { userId } = await auth();
  if (!userId) return new Response("Unauthorized", { status: 401 });

  await dbConnect();
  const result = await Url.deleteOne({ _id: params.id, userId });
  if (result.deletedCount === 1) {
    return new Response("Deleted", { status: 200 });
  }
  return new Response("Not found", { status: 404 });
}