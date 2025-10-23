import CancelPageContent from "@/components/pages/CancelPageContent";

export const runtime = "edge";

export const metadata = {
    title: "Payment canceled - Table d'Adrian",
    description: "Manage or cancel an existing Table d'Adrian booking.",
    robots: { index: false, follow: false },
    alternates: {
        canonical: "https://tabledadrian.com/cancel",
    },
    openGraph: {
        title: "Payment canceled - Table d'Adrian",
        description: "Manage or cancel an existing Table d'Adrian booking.",
        url: "https://tabledadrian.com/cancel",
        siteName: "Table d'Adrian",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Payment canceled - Table d'Adrian",
        description: "Manage or cancel an existing Table d'Adrian booking.",
    },
} as const;

export default function CancelPage() {
    return <CancelPageContent />;
}
