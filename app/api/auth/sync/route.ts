import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const { id, email } = await request.json();
    
    if (!id || !email) {
      return NextResponse.json({ error: "Missing id or email" }, { status: 400 });
    }

    // Upsert the user to keep Supabase Auth in sync with public.User
    const user = await prisma.user.upsert({
      where: { id },
      update: {}, // Do nothing if already exists
      create: {
        id,
        email,
        name: email.split('@')[0],
      }
    });
    
    return NextResponse.json(user);
  } catch (error) {
    console.error("Failed to sync user:", error);
    return NextResponse.json({ error: "Failed to sync user" }, { status: 500 });
  }
}
