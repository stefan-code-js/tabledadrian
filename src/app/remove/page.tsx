import RemovePageContent from "@/components/pages/RemovePageContent";

export const metadata = {
    title: "Remove my data - Table d'Adrian",
    description:
        "Request deletion of your personal data, leads, and communications related to Table d'Adrian. We respond the same day.",
    robots: { index: false, follow: false },
    alternates: {
        canonical: "https://tabledadrian.com/remove",
    },
    openGraph: {
        title: "Remove my data - Table d'Adrian",
        description:
            "Request deletion of your personal data, leads, and communications related to Table d'Adrian. We respond the same day.",
        url: "https://tabledadrian.com/remove",
        siteName: "Table d'Adrian",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Remove my data - Table d'Adrian",
        description:
            "Request deletion of your personal data, leads, and communications related to Table d'Adrian. We respond the same day.",
    },
} as const;

export default function RemovePage() {
    return <RemovePageContent />;
}
