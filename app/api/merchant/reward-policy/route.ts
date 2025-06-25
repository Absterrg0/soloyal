import { NextRequest, NextResponse } from "next/server";
import prisma from "@/db";
import { rewardSchema } from "@/types/rewardSchema";



export async function POST(req: NextRequest) {
    try{
        const body = await req.json()

        const {success, data, error} = rewardSchema.safeParse(body)

        if(!success){
            return NextResponse.json({error: error.message}, {status: 400})
        }

        const existingMerchant = await prisma.merchant.findUnique({
            where: {
                id: data.merchantId
            }
        })
        
        if(!existingMerchant){
            return NextResponse.json({error: "Merchant not found"}, {status: 404})
        }

        const rewardPolicy = await prisma.rewardPolicy.create({
            data: {
                ...data,
                merchantId: existingMerchant.id
            }
        })

        return NextResponse.json({message: "Reward policy created successfully", rewardPolicy}, {status: 200})

    }catch(error){
        return NextResponse.json({error: "Failed to create reward policy"}, {status: 500})
    }
}   

