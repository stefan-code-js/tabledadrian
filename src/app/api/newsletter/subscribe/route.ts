import { NextResponse } from "next/server";
import { z } from "zod";
import { addSubscriber } from "@/lib/newsletter";

const schema = z.object({
    email: z.string().email("Enter a valid email address."),
});

export async function POST(request: Request) {
    try {
        const payload = await request.json();
        const { email } = schema.parse(payload);
        const subscriber = await addSubscriber(email);
        return NextResponse.json(
            {
                status: "subscribed",
                subscriber,
            },
            { status: 201 },
        );
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ message: "The email address is invalid." }, { status: 400 });
        }
        console.error("Newsletter subscription failed", error);
        return NextResponse.json({ message: "Unable to add subscriber at this time." }, { status: 500 });
    }
}
