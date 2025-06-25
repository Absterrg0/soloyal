import { z } from "zod";

export const merchantSchema = z.object({
  id: z.string().min(1).optional(),
  name: z.string().min(1),
  publicKey: z.string().min(44).max(44),
  loyaltyTokenMintAddress: z.string().min(1),
  discountRate: z.number().min(0).max(1),
  rewardPolicy: z.array(z.object({
    merchantId: z.string().min(1),
    ruleType: z.string().min(1),
    ruleValue: z.number().min(0),
    bonusPercentage: z.number().min(0).max(100).optional(),
    airdropAmount: z.number().min(0).optional(),
  })).optional(),
  purchases: z.array(z.object({
    customerId: z.string().min(1),
    amountPaid: z.number().min(0),
    tokenUsed: z.string().min(1),
  })).optional(),   
});