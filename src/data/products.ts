export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    priceId: string;
    image?: string;
    alt?: string;
}

export const products: Product[] = [
    {
        id: 'dinner',
        name: 'Private Chef Dinner',
        description: 'Seasonal tasting menu for up to 8 guests.',
        price: 500,
        priceId: process.env.NEXT_PUBLIC_PRICE_DINNER || 'price_DINNER',
    },
];
