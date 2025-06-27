import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/db";

export async function GET(req: NextRequest) {
  try {
    // Get the authenticated user
    const session = await auth.api.getSession({
      headers: req.headers,
    });

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Fetch user data with related merchant and customer profiles
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: {
        merchant: true,
        customer: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Determine user type and prepare response
    const userData = {
      id: user.id,
      email: user.email,
      name: user.name,
      image: user.image,
      userType: user.userType,
      hasProfile: {
        merchant: !!user.merchant,
        customer: !!user.customer,
      },
      profiles: {
        merchant: user.merchant ? {
          id: user.merchant.id,
          name: user.merchant.name,
          publicKey: user.merchant.publicKey,
          discountRate: user.merchant.discountRate,
        } : null,
        customer: user.customer ? {
          id: user.customer.id,
          walletAddress: user.customer.walletAddress,
        } : null,
      },
    };

    return NextResponse.json(userData, { status: 200 });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
} 