export default function Footer() {
    const IG = process.env.INSTAGRAM_PROFILE_URL ?? "https://instagram.com/tabledadrian";
    const LI =
        process.env.LINKEDIN_PROFILE_URL ??
        "https://www.linkedin.com/in/adrian-stefan-badea-82456131b";
    const ACC =
        process.env.ACCREDITATION_URL ??
        "https://eu.badgr.com/public/badges/soyVM0MMRr2r33z69W8oNQ";
    const EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "adrian@tabledadrian.com";

    return (
        <footer className="site-footer">
            <div className="editorial-container">
                <p className="site-footer__brand">Table d’Adrian</p>
                <p className="site-footer__line">Private table along the Côte d’Azur</p>
                <p className="site-footer__line">
                    <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
                    <span aria-hidden="true"> · </span>
                    <a href={IG} target="_blank" rel="noreferrer">
                        Instagram
                    </a>
                    <span aria-hidden="true"> · </span>
                    <a href={LI} target="_blank" rel="noreferrer">
                        LinkedIn
                    </a>
                    <span aria-hidden="true"> · </span>
                    <a href={ACC} target="_blank" rel="noreferrer">
                        Accreditation
                    </a>
                </p>
                <p className="site-footer__meta">© {new Date().getFullYear()} Table d’Adrian · All rights reserved</p>
            </div>
        </footer>
    );
}
