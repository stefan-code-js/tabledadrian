import Link from "next/link";

export default function Footer() {
    const year = new Date().getFullYear();
    const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "adrian@tabledadrian.com";

    return (
        <footer className="site-footer">
            <div className="footer-inner">
                <p>© {year} Table d’Adrian</p>
                <p>Antibes · Cannes · Monaco</p>
                <p>
                    <Link href={`mailto:${email}`} className="footer-link">
                        {email}
                    </Link>
                </p>
            </div>
        </footer>
    );
}
