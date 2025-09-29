import { buildMetadataForPath } from "@/lib/metadata";
import CancelPageContent from "@/components/pages/CancelPageContent";

export const runtime = "edge";

export const metadata = buildMetadataForPath("/cancel", {
    title: "Payment canceled - Table d'Adrian",
    description: "Manage or cancel an existing Table d'Adrian booking.",
    indexable: false,
});

export default function CancelPage() {
    return <CancelPageContent />;
}
