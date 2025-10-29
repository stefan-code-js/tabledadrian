import fs from "node:fs";
import path from "node:path";
import { randomUUID } from "node:crypto";
import type { Database as BetterSqliteDatabase, Statement as BetterSqliteStatement } from "better-sqlite3";

const isTestEnvironment = process.env.VITEST === "true" || process.env.NODE_ENV === "test";

if (typeof window !== "undefined" && !isTestEnvironment) {
    throw new Error("Database utilities must run on the server context.");
}

type SqliteDatabase = BetterSqliteDatabase | MemoryDatabase;

type SqlStatement = BetterSqliteStatement | MemoryStatement;

let BetterSqlite3: typeof import("better-sqlite3") | null = null;

if (!isTestEnvironment) {
    try {
        const req = Function("return require")();
        BetterSqlite3 = req("better-sqlite3");
    } catch {
        BetterSqlite3 = null;
    }
}

type CollectibleRow = {
    id: string;
    tier: string;
    headline: string;
    focus: string;
    perks: string;
    artwork: string;
    mint_price_eth: string;
    edition_size: number;
};

type CollectibleHolderRow = {
    wallet_address: string;
    tier_id: string;
};

type RecipeRow = {
    id: string;
    title: string;
    summary: string;
    focus: string;
    tags: string;
    image: string;
    pairing: string;
    requires_collectible: number;
};

type RecipeStepRow = {
    recipe_id: string;
    step_order: number;
    description: string;
};

type MemberRow = {
    id: string;
    email: string;
    full_name: string;
    password_hash: string;
    wallet_address: string | null;
    roles: string;
    created_at: string;
};

type NewsletterRow = {
    id: string;
    email: string;
    created_at: string;
};

type ForumPostRow = {
    id: string;
    author_email: string;
    title: string;
    body: string;
    created_at: string;
    status: string;
};

type AchievementDefinitionRow = {
    id: string;
    title: string;
    description: string;
    category: string;
    rarity: string;
    points: number;
    requirements: string;
    is_active: number;
};

class MemoryStatement {
    constructor(private readonly db: MemoryDatabase, private readonly sql: string) {}

    run(params: unknown = {}): { changes: number } {
        this.db.executeRun(this.sql, params);
        return { changes: 1 };
    }

    get(params: unknown = {}): any {
        return this.db.executeGet(this.sql, params);
    }

    all(params: unknown = {}): any[] {
        return this.db.executeAll(this.sql, params);
    }
}

class MemoryDatabase {
    private collectibles = new Map<string, CollectibleRow>();
    private collectibleHolders = new Map<string, CollectibleHolderRow>();
    private recipes = new Map<string, RecipeRow>();
    private recipeSteps: RecipeStepRow[] = [];
    private members = new Map<string, MemberRow>();
    private newsletter = new Map<string, NewsletterRow>();
    private forumPosts = new Map<string, ForumPostRow>();
    private achievementDefinitions = new Map<string, AchievementDefinitionRow>();

    prepare(sql: string): MemoryStatement {
        return new MemoryStatement(this, sql.trim());
    }

    exec(_sql: string): MemoryDatabase {
        return this;
    }

    pragma(_text: string): void {}

    close(): void {
        this.collectibles.clear();
        this.collectibleHolders.clear();
        this.recipes.clear();
        this.recipeSteps = [];
        this.members.clear();
        this.newsletter.clear();
        this.forumPosts.clear();
        this.achievementDefinitions.clear();
    }

    executeRun(sql: string, params: unknown): void {
        if (sql.startsWith("INSERT OR IGNORE INTO collectibles")) {
            const record = params as any;
            if (!this.collectibles.has(record.id)) {
                this.collectibles.set(record.id, {
                    id: record.id,
                    tier: record.tier,
                    headline: record.headline,
                    focus: record.focus,
                    perks: typeof record.perks === "string" ? record.perks : JSON.stringify(record.perks ?? []),
                    artwork: record.artwork,
                    mint_price_eth: record.mintPriceEth,
                    edition_size: Number(record.editionSize),
                });
            }
            return;
        }

        if (sql.startsWith("INSERT OR IGNORE INTO collectible_holders")) {
            const record = params as any;
            if (!this.collectibleHolders.has(record.walletAddress)) {
                this.collectibleHolders.set(record.walletAddress, {
                    wallet_address: record.walletAddress,
                    tier_id: record.tierId,
                });
            }
            return;
        }

        if (sql.startsWith("INSERT OR IGNORE INTO recipes")) {
            const record = params as any;
            if (!this.recipes.has(record.id)) {
                this.recipes.set(record.id, {
                    id: record.id,
                    title: record.title,
                    summary: record.summary,
                    focus: record.focus,
                    tags: typeof record.tags === "string" ? record.tags : JSON.stringify(record.tags ?? []),
                    image: record.image,
                    pairing: record.pairing,
                    requires_collectible: Number(record.requiresCollectible ?? 0),
                });
            }
            return;
        }

        if (sql.startsWith("INSERT OR IGNORE INTO achievement_definitions")) {
            const record = params as any;
            if (!this.achievementDefinitions.has(record.id)) {
                this.achievementDefinitions.set(record.id, {
                    id: record.id,
                    title: record.title,
                    description: record.description,
                    category: record.category,
                    rarity: record.rarity,
                    points: Number(record.points),
                    requirements:
                        typeof record.requirements === "string"
                            ? record.requirements
                            : JSON.stringify(record.requirements ?? {}),
                    is_active: typeof record.is_active === "number" ? record.is_active : 1,
                });
            }
            return;
        }

        if (sql.startsWith("INSERT OR IGNORE INTO recipe_steps")) {
            const record = params as any;
            const exists = this.recipeSteps.some(
                (step) => step.recipe_id === record.recipeId && step.step_order === record.order,
            );
            if (!exists) {
                this.recipeSteps.push({
                    recipe_id: record.recipeId,
                    step_order: Number(record.order),
                    description: record.description,
                });
            }
            return;
        }

        if (sql.startsWith("INSERT INTO members")) {
            const record = params as any;
            this.members.set(record.id, {
                id: record.id,
                email: record.email,
                full_name: record.fullName,
                password_hash: record.passwordHash,
                wallet_address: record.walletAddress ?? null,
                roles: typeof record.roles === "string" ? record.roles : JSON.stringify(record.roles ?? []),
                created_at: record.createdAt,
            });
            return;
        }

        if (sql.startsWith("INSERT INTO newsletter_subscribers")) {
            const record = params as any;
            if (!this.newsletter.has(record.email)) {
                this.newsletter.set(record.email, {
                    id: record.id,
                    email: record.email,
                    created_at: record.createdAt,
                });
            }
            return;
        }

        if (sql.startsWith("INSERT OR IGNORE INTO forum_posts")) {
            const record = params as any;
            if (!this.forumPosts.has(record.id)) {
                this.forumPosts.set(record.id, {
                    id: record.id,
                    author_email: record.authorEmail,
                    title: record.title,
                    body: record.body,
                    created_at: record.createdAt,
                    status: record.status,
                });
            }
        }
    }

    executeGet(sql: string, params: unknown): any {
        if (sql.startsWith("SELECT COUNT(*) as count FROM collectibles")) {
            return { count: this.collectibles.size };
        }
        if (sql.startsWith("SELECT COUNT(*) as count FROM recipes")) {
            return { count: this.recipes.size };
        }
        if (sql.startsWith("SELECT COUNT(*) as count FROM forum_posts")) {
            return { count: this.forumPosts.size };
        }
        if (sql.startsWith("SELECT COUNT(*) as count FROM achievement_definitions")) {
            return { count: this.achievementDefinitions.size };
        }
        if (sql.startsWith("SELECT * FROM members WHERE email")) {
            const email =
                typeof params === "string"
                    ? params.toLowerCase()
                    : Array.isArray(params)
                        ? String(params[0]).toLowerCase()
                        : "";
            for (const member of this.members.values()) {
                if (member.email.toLowerCase() === email) {
                    return member;
                }
            }
        }
        return undefined;
    }

    executeAll(sql: string, params: unknown): any[] {
        if (sql.startsWith("SELECT * FROM collectibles ORDER BY")) {
            return Array.from(this.collectibles.values()).sort((a, b) => a.tier.localeCompare(b.tier));
        }
        if (sql.startsWith("SELECT wallet_address FROM collectible_holders")) {
            return Array.from(this.collectibleHolders.values());
        }
        if (sql.startsWith("SELECT * FROM recipes ORDER BY")) {
            return Array.from(this.recipes.values()).sort((a, b) => a.title.localeCompare(b.title));
        }
        if (sql.startsWith("SELECT recipe_id, step_order, description FROM recipe_steps")) {
            return [...this.recipeSteps].sort((a, b) => {
                if (a.recipe_id === b.recipe_id) {
                    return a.step_order - b.step_order;
                }
                return a.recipe_id.localeCompare(b.recipe_id);
            });
        }
        if (sql.startsWith("SELECT * FROM members ORDER BY")) {
            return Array.from(this.members.values()).sort((a, b) => (a.created_at < b.created_at ? 1 : -1));
        }
        if (sql.startsWith("SELECT * FROM newsletter_subscribers ORDER BY")) {
            const limit =
                typeof params === "number" ? params : Array.isArray(params) ? Number(params[0]) : undefined;
            const rows = Array.from(this.newsletter.values()).sort((a, b) => (a.created_at < b.created_at ? 1 : -1));
            return typeof limit === "number" && limit > 0 ? rows.slice(0, limit) : rows;
        }
        if (sql.startsWith("SELECT * FROM forum_posts WHERE status = 'published'")) {
            const limit =
                typeof params === "number" ? params : Array.isArray(params) ? Number(params[0]) : undefined;
            const rows = Array.from(this.forumPosts.values())
                .filter((row) => row.status === "published")
                .sort((a, b) => (a.created_at < b.created_at ? 1 : -1));
            return typeof limit === "number" && limit > 0 ? rows.slice(0, limit) : rows;
        }
        return [];
    }
}

let databaseInstance: SqliteDatabase | null = null;

const DATABASE_PATH = path.join(process.cwd(), "content", "database.sqlite");

type SeedOptions = {
    db: SqliteDatabase;
};

function ensureDirectories(isMemory: boolean) {
    if (isMemory) return;
    const dir = path.dirname(DATABASE_PATH);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
}

function readJsonFile<T>(relativePath: string): T | null {
    const absolutePath = path.join(process.cwd(), relativePath);
    if (!fs.existsSync(absolutePath)) {
        return null;
    }
    const raw = fs.readFileSync(absolutePath, "utf8");
    try {
        return JSON.parse(raw) as T;
    } catch {
        return null;
    }
}

function seedCollectibles({ db }: SeedOptions) {
    try {
        const tierRows = db.prepare("SELECT COUNT(*) as count FROM collectibles").get() as { count: number };
        if (tierRows.count === 0) {
        const tiers = readJsonFile<Array<{
            id: string;
            name: string;
            headline: string;
            description: string;
            editionSize: number;
            mintPriceEth: string;
            artwork: string;
            benefits: string[];
        }>>("content/collectibles/tiers.json");

        if (tiers) {
            const statement = db.prepare(`
                INSERT OR IGNORE INTO collectibles
                (id, tier, headline, focus, perks, artwork, mint_price_eth, edition_size)
                VALUES (@id, @tier, @headline, @focus, @perks, @artwork, @mintPriceEth, @editionSize)
            `);
            const holderStatement = db.prepare(`
                INSERT OR IGNORE INTO collectible_holders (wallet_address, tier_id)
                VALUES (@walletAddress, @tierId)
            `);

            for (const tier of tiers) {
                statement.run({
                    id: tier.id,
                    tier: tier.name,
                    headline: tier.headline,
                    focus: tier.description,
                    perks: JSON.stringify(tier.benefits),
                    artwork: tier.artwork,
                    mintPriceEth: tier.mintPriceEth,
                    editionSize: tier.editionSize,
                });
            }

            const holders = readJsonFile<string[]>("content/collectibles/holders.json") ?? [];
            for (const wallet of holders) {
                holderStatement.run({
                    walletAddress: wallet.toLowerCase(),
                    tierId: tiers[0]?.id ?? "aurum",
                });
            }
        }
    }
    } catch (error) {
        console.warn("Warning: Could not seed collectibles:", error);
    }
}

function seedRecipes({ db }: SeedOptions) {
    try {
        const row = db.prepare("SELECT COUNT(*) as count FROM recipes").get() as { count: number };
        if (row.count === 0) {
        const recipes = readJsonFile<Array<{
            id: string;
            title: string;
            summary: string;
            focus: string;
            ritual: string[];
            pairing: string;
            image: string;
            requiresCollectible: boolean;
            tags: string[];
        }>>("content/recipes/recipes.json");

        if (recipes) {
            const recipeStatement = db.prepare(`
                INSERT OR IGNORE INTO recipes
                (id, title, summary, focus, tags, image, pairing, requires_collectible)
                VALUES (@id, @title, @summary, @focus, @tags, @image, @pairing, @requiresCollectible)
            `);
            const stepStatement = db.prepare(`
                INSERT OR IGNORE INTO recipe_steps
                (recipe_id, step_order, description)
                VALUES (@recipeId, @order, @description)
            `);

            for (const recipe of recipes) {
                recipeStatement.run({
                    id: recipe.id,
                    title: recipe.title,
                    summary: recipe.summary,
                    focus: recipe.focus,
                    tags: JSON.stringify(recipe.tags ?? []),
                    image: recipe.image,
                    pairing: recipe.pairing,
                    requiresCollectible: recipe.requiresCollectible ? 1 : 0,
                });
                recipe.ritual.forEach((description, index) => {
                    stepStatement.run({
                        recipeId: recipe.id,
                        order: index + 1,
                        description,
                    });
                });
            }
        }
    }
    } catch (error) {
        console.warn("Warning: Could not seed recipes:", error);
    }
}

function seedForum({ db }: SeedOptions) {
    try {
        const existing = db.prepare("SELECT COUNT(*) as count FROM forum_posts").get() as { count: number };
        if (existing.count === 0) {
            const posts = [
                {
                    id: randomUUID(),
                    authorEmail: "concierge@tabledadrian.com",
                    title: "Vault tasting itinerary preview",
                    body: "Preview the Monaco midnight atelier line-up, including restorative tonics and yacht provisions.",
                    createdAt: new Date().toISOString(),
                    status: "published",
                },
                {
                    id: randomUUID(),
                    authorEmail: "dr.antonia@tabledadrian.com",
                    title: "Wellness residency briefing",
                    body: "Dr. Antonia outlines circadian protocols and adaptogenic pairings for alpine residencies.",
                    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
                    status: "published",
                },
            ];

            const statement = db.prepare(`
            INSERT OR IGNORE INTO forum_posts (id, author_email, title, body, created_at, status)
            VALUES (@id, @authorEmail, @title, @body, @createdAt, @status)
        `);

            posts.forEach((post) => statement.run(post));
        }
    } catch (error) {
        console.warn("Warning: Could not seed forum:", error);
    }
}

function seedAchievementDefinitions({ db }: SeedOptions) {
    try {
        const existing = db.prepare("SELECT COUNT(*) as count FROM achievement_definitions").get() as
            | { count: number }
            | undefined;
        if (!existing || existing.count === 0) {
            const achievements = [
                {
                    id: "first-collectible",
                    title: "First Collectible",
                    description: "Mint your first Alchemy collectible",
                    category: "collectible",
                    rarity: "common",
                    points: 25,
                    requirements: JSON.stringify({ collectible_count: 1 }),
                },
                {
                    id: "recipe-explorer",
                    title: "Recipe Explorer",
                    description: "View 10 recipes in the vault",
                    category: "engagement",
                    rarity: "common",
                    points: 15,
                    requirements: JSON.stringify({ recipes_viewed: 10 }),
                },
                {
                    id: "forum-champion",
                    title: "Forum Champion",
                    description: "Make 25 posts in the community forum",
                    category: "community",
                    rarity: "rare",
                    points: 40,
                    requirements: JSON.stringify({ forum_posts: 25 }),
                },
                {
                    id: "concierge-client",
                    title: "Concierge Client",
                    description: "Submit your first concierge brief",
                    category: "special",
                    rarity: "epic",
                    points: 60,
                    requirements: JSON.stringify({ concierge_briefs: 1 }),
                },
                {
                    id: "loyal-member",
                    title: "Loyal Member",
                    description: "Be active for 30 days",
                    category: "milestone",
                    rarity: "rare",
                    points: 35,
                    requirements: JSON.stringify({ days_active: 30 }),
                },
            ];

            const statement = db.prepare(`
            INSERT OR IGNORE INTO achievement_definitions (id, title, description, category, rarity, points, requirements)
            VALUES (@id, @title, @description, @category, @rarity, @points, @requirements)
        `);

            achievements.forEach((achievement) => statement.run(achievement));
        }
    } catch (error) {
        console.warn("Warning: Could not seed achievement definitions:", error);
    }
}

function seedMemberAnalytics({ db }: SeedOptions) {
    // This will be populated by actual user interactions
    // For now, we just ensure the table exists
    console.log("Member analytics table initialized");
}

function seedCommunityLeaderboard({ db }: SeedOptions) {
    // This will be populated by actual user data
    // For now, we just ensure the table exists
    console.log("Community leaderboard table initialized");
}

function initializeSchema(db: SqliteDatabase) {
    if ("pragma" in db) {
        db.pragma("journal_mode = WAL");
    }

    db.exec(`
        CREATE TABLE IF NOT EXISTS members (
            id TEXT PRIMARY KEY,
            email TEXT UNIQUE NOT NULL,
            full_name TEXT NOT NULL,
            password_hash TEXT NOT NULL,
            wallet_address TEXT,
            roles TEXT NOT NULL,
            created_at TEXT NOT NULL
        );

        CREATE TABLE IF NOT EXISTS collectibles (
            id TEXT PRIMARY KEY,
            tier TEXT NOT NULL,
            headline TEXT NOT NULL,
            focus TEXT NOT NULL,
            perks TEXT NOT NULL,
            artwork TEXT NOT NULL,
            mint_price_eth TEXT NOT NULL,
            edition_size INTEGER NOT NULL
        );

        CREATE TABLE IF NOT EXISTS collectible_holders (
            wallet_address TEXT PRIMARY KEY,
            tier_id TEXT NOT NULL,
            FOREIGN KEY (tier_id) REFERENCES collectibles(id)
        );

        CREATE TABLE IF NOT EXISTS recipes (
            id TEXT PRIMARY KEY,
            title TEXT NOT NULL,
            summary TEXT NOT NULL,
            focus TEXT NOT NULL,
            tags TEXT NOT NULL,
            image TEXT NOT NULL,
            pairing TEXT NOT NULL,
            requires_collectible INTEGER NOT NULL DEFAULT 0
        );

        CREATE TABLE IF NOT EXISTS recipe_steps (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            recipe_id TEXT NOT NULL,
            step_order INTEGER NOT NULL,
            description TEXT NOT NULL,
            FOREIGN KEY (recipe_id) REFERENCES recipes(id)
        );

        CREATE UNIQUE INDEX IF NOT EXISTS recipe_steps_unique_idx
            ON recipe_steps (recipe_id, step_order);

        CREATE TABLE IF NOT EXISTS newsletter_subscribers (
            id TEXT PRIMARY KEY,
            email TEXT UNIQUE NOT NULL,
            created_at TEXT NOT NULL
        );

        CREATE TABLE IF NOT EXISTS forum_posts (
            id TEXT PRIMARY KEY,
            author_email TEXT NOT NULL,
            title TEXT NOT NULL,
            body TEXT NOT NULL,
            created_at TEXT NOT NULL,
            status TEXT NOT NULL
        );

        -- Task 12 & 13: Enhanced Member Analytics and Community Features
        CREATE TABLE IF NOT EXISTS member_analytics (
            id TEXT PRIMARY KEY,
            member_id TEXT NOT NULL,
            metric_name TEXT NOT NULL,
            metric_value REAL NOT NULL,
            recorded_at TEXT NOT NULL,
            metadata TEXT,
            FOREIGN KEY (member_id) REFERENCES members(id)
        );

        CREATE TABLE IF NOT EXISTS member_achievements (
            id TEXT PRIMARY KEY,
            member_id TEXT NOT NULL,
            achievement_id TEXT NOT NULL,
            unlocked_at TEXT NOT NULL,
            progress REAL DEFAULT 0,
            max_progress REAL DEFAULT 1,
            points_earned INTEGER DEFAULT 0,
            FOREIGN KEY (member_id) REFERENCES members(id)
        );

        CREATE TABLE IF NOT EXISTS achievement_definitions (
            id TEXT PRIMARY KEY,
            title TEXT NOT NULL,
            description TEXT NOT NULL,
            category TEXT NOT NULL,
            rarity TEXT NOT NULL,
            points INTEGER NOT NULL,
            requirements TEXT NOT NULL,
            is_active INTEGER DEFAULT 1
        );

        CREATE TABLE IF NOT EXISTS member_activity (
            id TEXT PRIMARY KEY,
            member_id TEXT NOT NULL,
            activity_type TEXT NOT NULL,
            activity_data TEXT NOT NULL,
            created_at TEXT NOT NULL,
            metadata TEXT,
            FOREIGN KEY (member_id) REFERENCES members(id)
        );

        CREATE TABLE IF NOT EXISTS member_recommendations (
            id TEXT PRIMARY KEY,
            member_id TEXT NOT NULL,
            recommendation_type TEXT NOT NULL,
            title TEXT NOT NULL,
            description TEXT NOT NULL,
            action_text TEXT,
            action_href TEXT,
            priority TEXT NOT NULL,
            is_active INTEGER DEFAULT 1,
            created_at TEXT NOT NULL,
            FOREIGN KEY (member_id) REFERENCES members(id)
        );

        CREATE TABLE IF NOT EXISTS community_leaderboard (
            id TEXT PRIMARY KEY,
            member_id TEXT NOT NULL,
            points INTEGER NOT NULL DEFAULT 0,
            level INTEGER NOT NULL DEFAULT 1,
            rank INTEGER,
            badges TEXT,
            achievements_count INTEGER DEFAULT 0,
            recipes_viewed INTEGER DEFAULT 0,
            forum_posts INTEGER DEFAULT 0,
            has_collectible INTEGER DEFAULT 0,
            last_updated TEXT NOT NULL,
            FOREIGN KEY (member_id) REFERENCES members(id)
        );

        CREATE TABLE IF NOT EXISTS member_content_interactions (
            id TEXT PRIMARY KEY,
            member_id TEXT NOT NULL,
            content_type TEXT NOT NULL,
            content_id TEXT NOT NULL,
            interaction_type TEXT NOT NULL,
            created_at TEXT NOT NULL,
            metadata TEXT,
            FOREIGN KEY (member_id) REFERENCES members(id)
        );

        CREATE TABLE IF NOT EXISTS web3_verifications (
            id TEXT PRIMARY KEY,
            member_id TEXT NOT NULL,
            verification_type TEXT NOT NULL,
            status TEXT NOT NULL,
            verified_at TEXT,
            expires_at TEXT,
            metadata TEXT,
            FOREIGN KEY (member_id) REFERENCES members(id)
        );

        CREATE TABLE IF NOT EXISTS member_preferences (
            id TEXT PRIMARY KEY,
            member_id TEXT NOT NULL,
            preference_key TEXT NOT NULL,
            preference_value TEXT NOT NULL,
            updated_at TEXT NOT NULL,
            FOREIGN KEY (member_id) REFERENCES members(id),
            UNIQUE(member_id, preference_key)
        );

        CREATE TABLE IF NOT EXISTS concierge_briefs (
            id TEXT PRIMARY KEY,
            member_id TEXT NOT NULL,
            brief_content TEXT NOT NULL,
            status TEXT NOT NULL,
            created_at TEXT NOT NULL,
            processed_at TEXT,
            response TEXT,
            FOREIGN KEY (member_id) REFERENCES members(id)
        );

        CREATE TABLE IF NOT EXISTS member_sessions (
            id TEXT PRIMARY KEY,
            member_id TEXT NOT NULL,
            session_start TEXT NOT NULL,
            session_end TEXT,
            duration_minutes INTEGER,
            page_views INTEGER DEFAULT 0,
            actions_count INTEGER DEFAULT 0,
            FOREIGN KEY (member_id) REFERENCES members(id)
        );

        -- Indexes for performance
        CREATE INDEX IF NOT EXISTS idx_member_analytics_member_id ON member_analytics(member_id);
        CREATE INDEX IF NOT EXISTS idx_member_analytics_metric_name ON member_analytics(metric_name);
        CREATE INDEX IF NOT EXISTS idx_member_analytics_recorded_at ON member_analytics(recorded_at);
        
        CREATE INDEX IF NOT EXISTS idx_member_achievements_member_id ON member_achievements(member_id);
        CREATE INDEX IF NOT EXISTS idx_member_achievements_achievement_id ON member_achievements(achievement_id);
        
        CREATE INDEX IF NOT EXISTS idx_member_activity_member_id ON member_activity(member_id);
        CREATE INDEX IF NOT EXISTS idx_member_activity_type ON member_activity(activity_type);
        CREATE INDEX IF NOT EXISTS idx_member_activity_created_at ON member_activity(created_at);
        
        CREATE INDEX IF NOT EXISTS idx_leaderboard_points ON community_leaderboard(points DESC);
        CREATE INDEX IF NOT EXISTS idx_leaderboard_member_id ON community_leaderboard(member_id);
        
        CREATE INDEX IF NOT EXISTS idx_content_interactions_member_id ON member_content_interactions(member_id);
        CREATE INDEX IF NOT EXISTS idx_content_interactions_type ON member_content_interactions(content_type);
        
        CREATE INDEX IF NOT EXISTS idx_web3_verifications_member_id ON web3_verifications(member_id);
        CREATE INDEX IF NOT EXISTS idx_web3_verifications_type ON web3_verifications(verification_type);
        
        CREATE INDEX IF NOT EXISTS idx_member_preferences_member_id ON member_preferences(member_id);
        CREATE INDEX IF NOT EXISTS idx_member_preferences_key ON member_preferences(preference_key);
        
        CREATE INDEX IF NOT EXISTS idx_concierge_briefs_member_id ON concierge_briefs(member_id);
        CREATE INDEX IF NOT EXISTS idx_concierge_briefs_status ON concierge_briefs(status);
        
        CREATE INDEX IF NOT EXISTS idx_member_sessions_member_id ON member_sessions(member_id);
        CREATE INDEX IF NOT EXISTS idx_member_sessions_start ON member_sessions(session_start);
    `);

    seedCollectibles({ db });
    seedRecipes({ db });
    seedForum({ db });
    seedAchievementDefinitions({ db });
    seedMemberAnalytics({ db });
    seedCommunityLeaderboard({ db });
}

export function getDatabase(): SqliteDatabase {
    if (databaseInstance) {
        return databaseInstance;
    }
    if (BetterSqlite3) {
        ensureDirectories(false);
        const instance = new BetterSqlite3.default(DATABASE_PATH);
        databaseInstance = instance;
        initializeSchema(instance);
    } else {
        ensureDirectories(true);
        const memoryInstance = new MemoryDatabase();
        databaseInstance = memoryInstance;
        initializeSchema(memoryInstance);
    }
    return databaseInstance!;
}

export function closeDatabase(): void {
    if (databaseInstance) {
        databaseInstance.close();
        databaseInstance = null;
    }
}
