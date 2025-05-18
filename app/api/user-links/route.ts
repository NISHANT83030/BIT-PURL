import dbConnect from "@/lib/db";
import Url from "@/lib/url";
import { auth } from "@clerk/nextjs/server";

export async function GET() {
  const { userId } = await auth();
  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }
  await dbConnect();
  const links = await Url.find({ userId }).sort({ createdAt: -1 }).lean();
  const safeLinks = links.map((link: any) => ({
    _id: link._id.toString(),
    url: link.url,
    shorturl: link.shorturl,
    createdAt: link.createdAt,
  }));
  return Response.json({ links: safeLinks });
}