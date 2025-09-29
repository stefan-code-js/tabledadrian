import { buildMetadataForPath } from "@/lib/metadata";
import RemovePageContent from "@/components/pages/RemovePageContent";

export const metadata = buildMetadataForPath("/remove", {
    title: "Remove my data",
    description:
        "Request deletion of your personal data, leads, and communications related to Table d’Adrian. We respond the same day.",
    indexable: false,
});

export default function RemovePage() {
    return <RemovePageContent />;
}
