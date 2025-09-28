import type { PriceKey } from "@/lib/pricing";

export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    priceHandle: PriceKey;
    image?: string;
    alt?: string;
}

export const products: Product[] = [
    {
        id: "dinner",
        name: "Private Chef Dinner",
        description: "Seasonal tasting menu for up to 8 guests.",
        price: 500,
        priceHandle: "experienceSignature",
    },
];
