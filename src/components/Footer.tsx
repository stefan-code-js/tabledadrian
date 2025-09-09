// Server component – clean, centered
export default function Footer() {
    const IG =
        process.env.INSTAGRAM_PROFILE_URL ?? "https://instagram.com/tabledadrian";
    const LI =
        process.env.LINKEDIN_PROFILE_URL ??
        "https://www.linkedin.com/in/adrian-stefan-badea-82456131b";
    const ACC =
        process.env.ACCREDITATION_URL ??
        "https://eu.badgr.com/public/badges/soyVM0MMRr2r33z69W8oNQ";

    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-wrap">
                    {/* Experience & Accreditation (centered) */}
                    <div className="footer-block center-text">
                        <nav className="footer-social" aria-label="Experience and accreditation">
                            <a href={LI} target="_blank" rel="noreferrer" className="u-underline">
                                Experience
                            </a>
                            <a href={ACC} target="_blank" rel="noreferrer" className="u-underline">
                                Accreditation
                            </a>
                        </nav>
                    </div>

                    {/* Social row */}
                    <nav className="footer-social" aria-label="Social">
                        <a href={IG} target="_blank" rel="noreferrer" className="u-underline">
                            instagram
                        </a>
                        <a href={LI} target="_blank" rel="noreferrer" className="u-underline">
                            linkedin
                        </a>
                    </nav>

                    <div className="footer-legal">
                        <small>&copy; {new Date().getFullYear()} Table d’Adrian</small>
                    </div>
                </div>
            </div>
        </footer>
    );
}
