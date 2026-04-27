import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    
    if (!userId) {
      return NextResponse.json({ error: "userId is required" }, { status: 400 });
    }

    const books = await prisma.userBook.findMany({
      where: { userId },
      include: { 
        zone: {
          select: {
            id: true,
            name: true,
            isActive: true,
            createdAt: true
          }
        } 
      },
      orderBy: { createdAt: "asc" }
    });

    return NextResponse.json(books);
  } catch (error) {
    console.error("Failed to fetch user books:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { userId, zoneId } = await request.json();

    if (!userId || !zoneId) {
      return NextResponse.json({ error: "userId and zoneId are required" }, { status: 400 });
    }

    // Check if already exists
    const existing = await prisma.userBook.findUnique({
      where: {
        userId_zoneId: { userId, zoneId }
      },
      include: {
        zone: {
          select: {
            id: true,
            name: true,
            isActive: true,
            createdAt: true
          }
        }
      }
    });

    if (existing) {
      return NextResponse.json(existing);
    }

    const book = await prisma.userBook.create({
      data: { userId, zoneId },
      include: { 
        zone: {
          select: {
            id: true,
            name: true,
            isActive: true,
            createdAt: true
          }
        } 
      }
    });

    return NextResponse.json(book);
  } catch (error) {
    console.error("Failed to create user book:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const zoneId = searchParams.get("zoneId");

    if (!userId || !zoneId) {
      return NextResponse.json({ error: "userId and zoneId are required" }, { status: 400 });
    }

    await prisma.userBook.delete({
      where: {
        userId_zoneId: { userId, zoneId }
      }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete user book:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
