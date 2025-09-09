export type TeamMember = {
    slug: string;
    name: string;
    role: string;
    bio: string;
    specialties: string[];           // “fermentation”, “pastry”, “wine”, etc.
    linkedin?: string;
    image: string;                   // /team/adrian.jpg (place files in /public/team)
};

export const team: TeamMember[] = [
    {
        slug: "adrian-stefan",
        name: "Adrian Stefan",
        role: "Chef-Patron",
        bio: "Michelin-trained, ingredient-driven tasting menus shaped by season and place.",
        specialties: ["Menu architecture", "Consommés", "Ferments", "Seafood"],
        linkedin: "https://www.linkedin.com/in/YOUR-LINKEDIN",
        image: "/team/adrian.jpg",
    },
    // add more members here
];
