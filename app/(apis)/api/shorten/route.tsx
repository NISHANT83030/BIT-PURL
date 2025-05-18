import dbConnect from "@/lib/db";
import Url from "@/lib/url";
import { auth } from "@clerk/nextjs/server";

export async function POST(req: Request) {
  const { url, shorturl } = await req.json();
  const { userId } = await auth(); 
  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }
  await dbConnect();
  const shortenedUrl = await Url.create({
    url,
    shorturl,
    userId: userId || null,
  });

  return Response.json({ shortenedUrl});
}