import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = 'force-dynamic';

// GET all available souvenirs
export async function GET(request: Request) {
  try {
    const souvenirs = await prisma.souvenir.findMany({
      select: {
        id: true,
        name: true,
        image: true,
        stampsRequired: true,
        inStock: true,
        createdAt: true
      },
      orderBy: { stampsRequired: 'asc' }
    });

    return NextResponse.json(souvenirs);
  } catch (error: any) {
    console.error("Failed to fetch souvenirs:", error.message || error);
    return NextResponse.json(
      { error: "Failed to fetch souvenirs", details: error.message },
      { status: 500 }
    );
  }
}
