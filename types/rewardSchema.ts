import { z } from "zod";



export const rewardSchema = z.object({
    merchantId: z.string().min(1),
    ruleType: z.string().min(1),
    ruleValue: z.number().min(0),
    bonusPercentage: z.number().min(0).max(100).optional(),
    airdropAmount: z.number().min(0).optional(),
    id: z.string().min(1),
})