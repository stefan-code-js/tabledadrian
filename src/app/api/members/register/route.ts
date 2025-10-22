import { NextResponse } from "next/server";
import { z } from "zod";
import { createMember } from "@/lib/members";

const schema = z.object({
    fullName: z.string().min(3).max(80),
    email: z.string().email(),
    password: z
        .string()
        .min(8, "Choose a password with at least 8 characters.")
        .max(128, "Password must be 128 characters or fewer."),
    walletAddress: z
        .string()
        .regex(/^0x[a-fA-F0-9]{40}$/)
        .transform((value) => value.toLowerCase())
        .optional(),
});

export async function POST(request: Request) {
    try {
        const payload = await request.json();
        const parsed = schema.parse(payload);
        const member = await createMember({
            email: parsed.email,
            fullName: parsed.fullName,
            password: parsed.password,
            walletAddress: parsed.walletAddress,
        });
        return NextResponse.json(member, { status: 201 });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { message: "Registration data invalid", issues: error.flatten() },
                { status: 400 },
            );
        }
        if (error instanceof Error && error.message === "Member already exists") {
            return NextResponse.json({ message: "Member already exists" }, { status: 409 });
        }
        console.error("Registration failed", error);
        return NextResponse.json({ message: "Unable to register member" }, { status: 500 });
    }
}
