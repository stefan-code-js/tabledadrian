import type { Metadata } from 'next';
import ReviewsSummary from '@/components/ReviewsSummary';
import ReviewForm from '@/components/ReviewForm';

export const metadata: Metadata = {
    title: 'Reviews · Table d’Adrian',
    description: 'Share your experience and read the overall guest rating.',
};

export default function ReviewsPage() {
    return (
        <section className="section">
            <div className="container container--narrow">
                <h1 className="title">reviews</h1>
                <p className="lead center-text">
                    Your voice shapes our craft. Leave a rating and an optional note.
                </p>

                <div className="grid" style={{ marginTop: 18 }}>
                    <ReviewsSummary />
                    <div className="card">
                        <ReviewForm />
                    </div>
                </div>
            </div>
        </section>
    );
}
