import prisma from "@/db";
import { NextRequest, NextResponse } from "next/server";
import { merchantSchema } from "@/types/merchantSchema";
import { PublicKey } from "@solana/web3.js";
import { auth } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    // const session = await auth.api.getSession({
    //   headers: req.headers,
    // });

    // if (!session) {
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    // }
    const body = await req.json();
    const { success, data, error } = merchantSchema.safeParse(body);

    if (!success) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    let publicKeyStr: string;

    try {
      const publicKey = new PublicKey(data.publicKey);
      publicKeyStr = publicKey.toBase58();
    } catch {
      return NextResponse.json({ error: "Invalid public key format" }, { status: 400 });
    }

    const existingMerchant = await prisma.merchant.findUnique({
      where: { publicKey: publicKeyStr },
    });

    if (existingMerchant) {
      return NextResponse.json({ error: "Merchant already exists" }, { status: 400 });
    }

    const merchant = await prisma.merchant.create({
      data: {
        name: data.name,
        publicKey: publicKeyStr,
        loyaltyTokenMintAddress: data.loyaltyTokenMintAddress,
        discountRate: data.discountRate,
        //TODO: get user id from session and gate this endpoint
        userId: "123",
      },
    });

    return NextResponse.json(
      { message: "Merchant created successfully", merchant },
      { status: 201 }
    );
  } catch (e) {
    console.error("Merchant creation failed:", e);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
