import { z } from "zod";

export const customerSchema = z.object({
  walletAddress: z.string().min(1),
});