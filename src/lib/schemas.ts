import { z } from "zod";

const BoundedText = (max: number) => z.string().trim().min(1).max(max);

export const EventInputSchema = z
  .object({
    eventType: z.enum(["wedding", "birthday", "community", "other"]),
    title: BoundedText(120),
    date: z.iso.date(),
    city: BoundedText(100),
    guestCount: z.number().int().min(1).max(5000),
    budgetINR: z.number().positive(),
    vibe: BoundedText(160),
    language: z.enum(["en", "hi", "hinglish"]),
    dietary: z.array(BoundedText(100)).max(20),
    notes: z.string().max(500).optional(),
  })
  .strict();

export type EventInput = z.infer<typeof EventInputSchema>;

export const IdeasSchema = z
  .object({
    theme: z
      .object({
        name: BoundedText(120),
        description: BoundedText(600),
      })
      .strict(),
    decor: z.array(BoundedText(200)).max(20),
    menu: z.array(BoundedText(200)).max(20),
    music: z.array(BoundedText(200)).max(20),
    activities: z.array(BoundedText(200)).max(20),
  })
  .strict();

export type Ideas = z.infer<typeof IdeasSchema>;

export const VendorKitSchema = z.array(
  z
    .object({
      category: BoundedText(100),
      checklist: z.array(BoundedText(200)).max(20),
      questionsToAsk: z.array(BoundedText(300)).max(20),
      redFlags: z.array(BoundedText(200)).max(20),
    })
    .strict(),
).min(1).max(12);

export type VendorKit = z.infer<typeof VendorKitSchema>;

export const PlanContentSchema = z
  .object({
    ideas: IdeasSchema,
    vendorKit: VendorKitSchema,
  })
  .strict();

export type PlanContent = z.infer<typeof PlanContentSchema>;

export const PlanResultSchema = PlanContentSchema.extend({
  source: z.enum(["gemini", "groq", "fallback"]),
}).strict();

export type PlanResult = z.infer<typeof PlanResultSchema>;
