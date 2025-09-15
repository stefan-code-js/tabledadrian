import Image from 'next/image';
import PayButton from './PayButton';
import { formatCurrency } from '@/lib/utils';
import type { Product } from '@/data/products';

export default function ProductCard({ product }: { product: Product }) {
    return (
        <article className="lux-card">
            <Image
                src={product.image}
                alt={product.alt}
                width={400}
                height={300}
                loading="lazy"
                className="w-full h-auto mb-4"
            />
            <h2 className="lux-h">{product.name}</h2>
            <p className="lux-body">{product.description}</p>
            <p className="lux-price">{formatCurrency(product.price)}</p>
            <div className="lux-cta">
                <PayButton priceId={product.priceId} mode="payment">
                    purchase
                </PayButton>
            </div>
        </article>
    );
}
