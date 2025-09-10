// src/app/reviews/page.tsx
import type { Metadata } from 'next';

// ⬇️ Adjust these imports ONLY if your filenames differ.
// Common variants: '@/components/ReviewsSummary' or '@/components/ReviewForm'
import ReviewSummary from '@/components/ReviewsSummary';
import ReviewForm from '@/components/ReviewForm';

export const metadata: Metadata = {
    title: "Reviews · Table d’Adrian",
    description: "Quiet, sincere guest notes and a refined form to leave your review.",
};

export default function ReviewsPage() {
    return (
        <section className="section reviews-page">
            <div className="container container--narrow center-text">
                <h1 className="title">Reviews</h1>
                <p className="lead">Understated, honest notes that refine the details.</p>
            </div>

            <div className="container">
                {/* Fixed two-column grid, collapses cleanly on mobile */}
                <div className="reviews-grid">
                    <article className="review-card review-card--summary" aria-labelledby="guest-notes">
                        <div className="reviews-head">
                            <h2 id="guest-notes" className="h-subtle">Guest notes</h2>
                            {/* Optional small stat line — keep it subtle */}
                            <div className="avg">
                                <span className="star-row" aria-hidden>★★★★★</span>
                                <span className="avg-note">curated</span>
                            </div>
                        </div>
                        <ReviewSummary />
                    </article>

                    <aside className="review-card review-card--form" aria-labelledby="leave-review">
                        <h2 id="leave-review" className="h-subtle">Leave a review</h2>
                        <ReviewForm />
                    </aside>
                </div>
            </div>
        </section>
    );
}

/*
IMPORTANT:
- Ensure there is NO `src/app/reviews/route.ts` in this directory.
  Next.js forbids page + route at the same path.
  If you still have one, delete it or move the API under /app/api/reviews/route.ts.
*/
