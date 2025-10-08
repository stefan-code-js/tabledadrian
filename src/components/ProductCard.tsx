import Image from "@/components/StaticImage";
import PayButton from "./PayButton";
import type { Product } from "@/data/products";

export default function ProductCard({ product }: { product: Product }) {
    return (
        <article className="product-card">
            <div className="product-card__image">
                {product.image ? (
                    <Image
                        src={product.image}
                        alt={product.alt ?? ""}
                        fill
                        sizes="(max-width: 900px) 100vw, 320px"
                        loading="lazy"
                        unoptimized
                    />
                ) : (
                    <span aria-hidden="true" className="product-card__placeholder" />
                )}
            </div>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <PayButton priceHandle={product.priceHandle}>
                purchase
            </PayButton>
        </article>
    );
}

