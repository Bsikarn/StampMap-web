import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const zones = await prisma.mapZone.findMany({
      where: { isActive: true },
      select: {
        id: true,
        name: true,
        isActive: true,
        createdAt: true
      },
      orderBy: { createdAt: "asc" }
    });
    return NextResponse.json(zones);
  } catch (error) {
    console.error("Failed to fetch map zones:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
