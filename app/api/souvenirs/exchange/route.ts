import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// POST a redemption request
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, souvenirId } = body;

    if (!userId || !souvenirId) {
      return NextResponse.json(
        { error: "userId and souvenirId are required" },
        { status: 400 }
      );
    }

    // Process redemption inside a transaction to ensure data integrity
    const result = await prisma.$transaction(async (tx) => {
      // 1. Get the souvenir
      const souvenir = await tx.souvenir.findUnique({
        where: { id: souvenirId }
      });

      if (!souvenir) throw new Error("Souvenir not found");
      if (!souvenir.inStock) throw new Error("Souvenir out of stock");

      // 2. Count user's stamps
      const stampCount = await tx.stamp.count({
        where: { userId }
      });

      // 3. Count already redeemed points (assuming 1 stamp = 1 point)
      // This logic can be adjusted based on exact business rules
      const pastRedemptions = await tx.souvenirRedemption.findMany({
        where: { userId },
        include: { souvenir: true }
      });
      
      const spentStamps = pastRedemptions.reduce((acc, curr) => acc + curr.souvenir.stampsRequired, 0);
      const availableStamps = stampCount - spentStamps;

      if (availableStamps < souvenir.stampsRequired) {
        throw new Error("Not enough stamps available for this redemption");
      }

      // 4. Create redemption
      const redemption = await tx.souvenirRedemption.create({
        data: {
          userId,
          souvenirId
        }
      });

      return redemption;
    });

    return NextResponse.json(result, { status: 201 });
  } catch (error: any) {
    console.error("Failed to process redemption:", error);
    const message = error instanceof Error ? error.message : "Failed to process redemption";
    
    // Distinguish between client error (400) and server error (500)
    const status = ["not found", "out of stock", "Not enough"].some(phrase => message.includes(phrase)) ? 400 : 500;

    return NextResponse.json(
      { error: message },
      { status }
    );
  }
}
