import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/db";
import { z } from "zod";

const updateTypeSchema = z.object({
  userType: z.enum(['MERCHANT', 'CUSTOMER']),
});

export async function POST(req: NextRequest) {
  try {
    // Get the authenticated user
    const session = await auth.api.getSession({
      headers: req.headers,
    });

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { success, data, error } = updateTypeSchema.safeParse(body);

    if (!success) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    // Update user type in the database
    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: { userType: data.userType },
      select: {
        id: true,
        email: true,
        name: true,
        userType: true,
      },
    });

    return NextResponse.json({
      message: "User type updated successfully",
      user: updatedUser,
    }, { status: 200 });
  } catch (error) {
    console.error("Error updating user type:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
} 