import {z} from "zod";

const MealLogSchema = z.object({
    id: z.string(),
    createdByUserId: z.string(),
    createdAt: z.object({
        _seconds: z.number(),
        _nanoseconds: z.number()
    }),
    mealType: z.enum(["breakfast", "lunch", "snack", "dinner"]),
    source: z.enum(["planned", "user_upload", "auto_generated"]),
    imgUrl: z.string().optional(),
    rawText: z.string(),
    detectedFoods: z.array(z.string()),
    symptoms: z.array(z.string()).optional(),
})

export default MealLogSchema
