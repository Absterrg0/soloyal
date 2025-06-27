import prisma from "@/db";
import { customerSchema } from "@/types/customerSchema";
import { NextRequest, NextResponse } from "next/server";




export async function POST(req: NextRequest) {
  

    try{

        const body = await req.json();
        const { success, data, error } = customerSchema.safeParse(body);

        if (!success) {
            return NextResponse.json({ error: error.message }, { status: 400 });
        }

        const existingCustomer = await prisma.customer.findUnique({
            where: { walletAddress: data.walletAddress },
        });
        
        if (existingCustomer) {
            return NextResponse.json({ error: "Customer already exists" }, { status: 400 });
        }

        const customer = await prisma.customer.create({
            data: { walletAddress: data.walletAddress,
                //TODO: get user id from session and gate this endpoint
                userId: "123",
             },
        });

        return NextResponse.json({ message: "Customer created successfully", customer }, { status: 201 });
    }catch(e){
        console.error("Customer creation failed:", e);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}