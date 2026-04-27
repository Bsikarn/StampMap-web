import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const zoneName = searchParams.get("zoneName") || searchParams.get("region");

    if (!userId) {
      return NextResponse.json(
        { error: "userId is required to fetch stamps" },
        { status: 400 }
      );
    }

    const whereClause: any = { userId };
    if (zoneName) {
      whereClause.location = { zone: { name: zoneName } };
    }

    const stamps = await prisma.stamp.findMany({
      where: whereClause,
      include: {
        location: {
          select: { 
            name: true, 
            koreanName: true,
            zone: {
              select: {
                id: true,
                name: true
              }
            }
          }
        }
      },
      orderBy: { collectedAt: "desc" }
    });

    return NextResponse.json(stamps);
  } catch (error) {
    console.error("Failed to fetch stamps:", error);
    return NextResponse.json(
      { error: "Failed to fetch stamps" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, locationId, image, description } = body;

    if (!userId || !locationId) {
      return NextResponse.json(
        { error: "userId and locationId are required" },
        { status: 400 }
      );
    }

    // Check if already collected
    const existingStamp = await prisma.stamp.findUnique({
      where: {
        userId_locationId: { userId, locationId }
      }
    });

    if (existingStamp) {
      return NextResponse.json(
        { error: "Stamp already collected for this location" },
        { status: 409 } // Conflict
      );
    }

    const newStamp = await prisma.stamp.create({
      data: {
        userId,
        locationId,
        image,
        description,
      },
    });

    return NextResponse.json(newStamp, { status: 201 });
  } catch (error) {
    console.error("Failed to collect stamp:", error);
    return NextResponse.json(
      { error: "Failed to collect stamp" },
      { status: 500 }
    );
  }
}
