import {z} from "zod";

const LogSchema = z.object({
    id: z.string(),
    userId: z.string(),
    createdAt: z.object({
        _seconds: z.number(),
        _nanoseconds: z.number()
    }),
    mealType: z.enum(["breakfast", "lunch", "snacks", "dinner", "other"]),
    rawText: z.string(),
    detectedFoods: z.array(z.string()),
    symptoms: z.array(z.string()).optional(),
    processed: z.boolean(),
    estimatedMacros: z.object({
        carbs_g: z.number(),
        fat_g: z.number(),
        protein_g: z.number(),
    }),
})

export default LogSchema
