import { NextRequest, NextResponse } from "next/server";
import { customerSchema } from "@/types/customerSchema";
import prisma from "@/db";



export async function PUT(req: NextRequest) {
    try{
        const body = await req.json();
        const { success, data, error } = customerSchema.safeParse(body);

        if (!success) {
            return NextResponse.json({ error: error.message }, { status: 400 });
        }

        const existingCustomer = await prisma.customer.findUnique({
            where: { walletAddress: data.walletAddress },
        });

        if(!existingCustomer){
            return NextResponse.json({ error: "Customer not found" }, { status: 404 });
        }

        const customer = await prisma.customer.update({
            where: { walletAddress: data.walletAddress },
            data: {
                //TODO: get user id from session and gate this endpoint
                walletAddress: data.walletAddress,
            },
        });

        return NextResponse.json({ message: "Customer updated successfully", customer }, { status: 200 });
    }catch(e){
        console.error("Customer update failed:", e);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}