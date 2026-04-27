import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const zoneName = searchParams.get("zoneName");
    const whereClause = zoneName ? { zone: { name: zoneName } } : {};

    const locations = await prisma.location.findMany({
      where: whereClause,
      include: {
        zone: {
          select: {
            id: true,
            name: true,
            isActive: true,
            createdAt: true
          }
        },
        _count: {
          select: { stamps: true, reviews: true },
        },
      },
    });

    return NextResponse.json(locations);
  } catch (error: any) {
    console.error("Failed to fetch locations:", error.message || error);
    return NextResponse.json(
      { error: "Failed to fetch locations", details: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { zoneId, name, koreanName, description, latitude, longitude, rating, reviewsCount, distance, openTime } = body;

    // Basic validation
    if (!zoneId || !name || latitude === undefined || longitude === undefined) {
      return NextResponse.json(
        { error: "Missing required fields (zoneId, name, latitude, longitude)" },
        { status: 400 }
      );
    }

    const newLocation = await prisma.location.create({
      data: {
        zoneId,
        name,
        koreanName,
        description,
        latitude,
        longitude,
        rating: rating || 0.0,
        reviewsCount: reviewsCount || 0,
        distance,
        openTime,
      },
    });

    return NextResponse.json(newLocation, { status: 201 });
  } catch (error) {
    console.error("Failed to create location:", error);
    return NextResponse.json(
      { error: "Failed to create location" },
      { status: 500 }
    );
  }
}
