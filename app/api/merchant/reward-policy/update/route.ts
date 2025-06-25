import prisma from "@/db";
import { merchantSchema } from "@/types/merchantSchema";
import { NextRequest, NextResponse } from "next/server";
import { PublicKey } from "@solana/web3.js";

export async function PUT(req: NextRequest) {
    try{
        const body = await req.json()

        const {success, data, error} = merchantSchema.safeParse(body)

        if(!success){
            return NextResponse.json({error: error.message}, {status: 400})
        }
        
        let publicKeyStr: string;

        try {
            const publicKey = new PublicKey(data.publicKey);
            publicKeyStr = publicKey.toBase58();
        } catch {
            return NextResponse.json({ error: "Invalid public key format" }, { status: 400 });
        }

        const existingMerchant = await prisma.merchant.findUnique({
            where: {
                id: data.id
            }
        })
        
        if(!existingMerchant){
            return NextResponse.json({error: "Merchant not found"}, {status: 404})
        }

        await prisma.merchant.update({
            where: {id: existingMerchant.id},
            data: {
                publicKey: publicKeyStr,
                discountRate: data.discountRate,
            }
        })
        
        return NextResponse.json({message: "Merchant details updated successfully"}, {status: 200})
    }
    catch(error){
        return NextResponse.json({error: "Failed to update merchant details"}, {status: 500})
    }
}   