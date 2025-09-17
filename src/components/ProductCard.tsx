import Image from 'next/image';
import PayButton from './PayButton';
import type { Product } from '@/data/products';

export default function ProductCard({ product }: { product: Product }) {
    return (
        <article className="product-card">
            <div className="product-card__image">
                <Image src={product.image} alt={product.alt} fill sizes="(max-width: 900px) 100vw, 320px" loading="lazy" />
            </div>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <PayButton priceId={product.priceId} mode="payment">
                purchase
            </PayButton>
        </article>
    );
}
