import {z} from 'zod';

const UserSchema = z.object({

    cycle: z.object({
        cycleLength: z.number(),

        // Required — user must have at least 1 period date
        lastPeriodStart: z.string(),

        // Optional + Nullable — user may not enter 2nd & 3rd dates
        previousPeriodStart: z.string().nullable().optional(),
        thirdLastPeriodStart: z.string().nullable().optional()
    }),

    onboarding: z.object({
        completed: z.boolean(),

        // When completed = false → completedAt can be missing
        completedAt: z.string().optional(),

        version: z.string()
    }),

    preference: z.object({
        proteinTarget_g: z.number(),
        sensitivities: z.array(z.object({
            ingredient: z.string(),
            isSensitive: z.boolean(),
        })),
        vegetarian: z.boolean()
    }),

    id: z.string()
});

export default UserSchema;
