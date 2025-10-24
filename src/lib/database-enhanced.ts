import { getDatabase } from "./database";
import { randomUUID } from "node:crypto";

// Enhanced database operations for Task 12 & 13 features

export interface MemberAnalyticsRecord {
    id: string;
    member_id: string;
    metric_name: string;
    metric_value: number;
    recorded_at: string;
    metadata?: string;
}

export interface MemberAchievementRecord {
    id: string;
    member_id: string;
    achievement_id: string;
    unlocked_at: string;
    progress: number;
    max_progress: number;
    points_earned: number;
}

export interface MemberActivityRecord {
    id: string;
    member_id: string;
    activity_type: string;
    activity_data: string;
    created_at: string;
    metadata?: string;
}

export interface MemberRecommendationRecord {
    id: string;
    member_id: string;
    recommendation_type: string;
    title: string;
    description: string;
    action_text?: string;
    action_href?: string;
    priority: string;
    is_active: number;
    created_at: string;
}

export interface CommunityLeaderboardRecord {
    id: string;
    member_id: string;
    points: number;
    level: number;
    rank?: number;
    badges?: string;
    achievements_count: number;
    recipes_viewed: number;
    forum_posts: number;
    has_collectible: number;
    last_updated: string;
}

export interface Web3VerificationRecord {
    id: string;
    member_id: string;
    verification_type: string;
    status: string;
    verified_at?: string;
    expires_at?: string;
    metadata?: string;
}

export interface MemberPreferenceRecord {
    id: string;
    member_id: string;
    preference_key: string;
    preference_value: string;
    updated_at: string;
}

export interface ConciergeBriefRecord {
    id: string;
    member_id: string;
    brief_content: string;
    status: string;
    created_at: string;
    processed_at?: string;
    response?: string;
}

export interface MemberSessionRecord {
    id: string;
    member_id: string;
    session_start: string;
    session_end?: string;
    duration_minutes?: number;
    page_views: number;
    actions_count: number;
}

// Analytics Operations
export function recordMemberAnalytics(
    memberId: string,
    metricName: string,
    metricValue: number,
    metadata?: Record<string, any>
): void {
    const db = getDatabase();
    const record: MemberAnalyticsRecord = {
        id: randomUUID(),
        member_id: memberId,
        metric_name: metricName,
        metric_value: metricValue,
        recorded_at: new Date().toISOString(),
        metadata: metadata ? JSON.stringify(metadata) : undefined,
    };

    const stmt = db.prepare(`
        INSERT INTO member_analytics (id, member_id, metric_name, metric_value, recorded_at, metadata)
        VALUES (@id, @member_id, @metric_name, @metric_value, @recorded_at, @metadata)
    `);
    stmt.run(record);
}

export function getMemberAnalytics(memberId: string, metricName?: string): MemberAnalyticsRecord[] {
    const db = getDatabase();
    let query = "SELECT * FROM member_analytics WHERE member_id = ?";
    const params: any[] = [memberId];

    if (metricName) {
        query += " AND metric_name = ?";
        params.push(metricName);
    }

    query += " ORDER BY recorded_at DESC";

    return db.prepare(query).all(...params) as MemberAnalyticsRecord[];
}

// Achievement Operations
export function unlockMemberAchievement(
    memberId: string,
    achievementId: string,
    progress: number = 1,
    maxProgress: number = 1,
    pointsEarned: number = 0
): void {
    const db = getDatabase();
    const record: MemberAchievementRecord = {
        id: randomUUID(),
        member_id: memberId,
        achievement_id: achievementId,
        unlocked_at: new Date().toISOString(),
        progress,
        max_progress: maxProgress,
        points_earned: pointsEarned,
    };

    const stmt = db.prepare(`
        INSERT OR REPLACE INTO member_achievements (id, member_id, achievement_id, unlocked_at, progress, max_progress, points_earned)
        VALUES (@id, @member_id, @achievement_id, @unlocked_at, @progress, @max_progress, @points_earned)
    `);
    stmt.run(record);
}

export function getMemberAchievements(memberId: string): MemberAchievementRecord[] {
    const db = getDatabase();
    return db.prepare(`
        SELECT ma.*, ad.title, ad.description, ad.category, ad.rarity, ad.points
        FROM member_achievements ma
        JOIN achievement_definitions ad ON ma.achievement_id = ad.id
        WHERE ma.member_id = ?
        ORDER BY ma.unlocked_at DESC
    `).all(memberId) as MemberAchievementRecord[];
}

// Activity Operations
export function recordMemberActivity(
    memberId: string,
    activityType: string,
    activityData: Record<string, any>,
    metadata?: Record<string, any>
): void {
    const db = getDatabase();
    const record: MemberActivityRecord = {
        id: randomUUID(),
        member_id: memberId,
        activity_type: activityType,
        activity_data: JSON.stringify(activityData),
        created_at: new Date().toISOString(),
        metadata: metadata ? JSON.stringify(metadata) : undefined,
    };

    const stmt = db.prepare(`
        INSERT INTO member_activity (id, member_id, activity_type, activity_data, created_at, metadata)
        VALUES (@id, @member_id, @activity_type, @activity_data, @created_at, @metadata)
    `);
    stmt.run(record);
}

export function getMemberActivity(memberId: string, limit: number = 50): MemberActivityRecord[] {
    const db = getDatabase();
    return db.prepare(`
        SELECT * FROM member_activity 
        WHERE member_id = ? 
        ORDER BY created_at DESC 
        LIMIT ?
    `).all(memberId, limit) as MemberActivityRecord[];
}

// Recommendation Operations
export function createMemberRecommendation(
    memberId: string,
    recommendationType: string,
    title: string,
    description: string,
    actionText?: string,
    actionHref?: string,
    priority: string = "medium"
): void {
    const db = getDatabase();
    const record: MemberRecommendationRecord = {
        id: randomUUID(),
        member_id: memberId,
        recommendation_type: recommendationType,
        title,
        description,
        action_text: actionText,
        action_href: actionHref,
        priority,
        is_active: 1,
        created_at: new Date().toISOString(),
    };

    const stmt = db.prepare(`
        INSERT INTO member_recommendations (id, member_id, recommendation_type, title, description, action_text, action_href, priority, is_active, created_at)
        VALUES (@id, @member_id, @recommendation_type, @title, @description, @action_text, @action_href, @priority, @is_active, @created_at)
    `);
    stmt.run(record);
}

export function getMemberRecommendations(memberId: string): MemberRecommendationRecord[] {
    const db = getDatabase();
    return db.prepare(`
        SELECT * FROM member_recommendations 
        WHERE member_id = ? AND is_active = 1 
        ORDER BY 
            CASE priority 
                WHEN 'high' THEN 1 
                WHEN 'medium' THEN 2 
                WHEN 'low' THEN 3 
            END,
            created_at DESC
    `).all(memberId) as MemberRecommendationRecord[];
}

// Leaderboard Operations
export function updateMemberLeaderboard(
    memberId: string,
    points: number,
    level: number,
    achievementsCount: number,
    recipesViewed: number,
    forumPosts: number,
    hasCollectible: boolean,
    badges?: string[]
): void {
    const db = getDatabase();
    const record: CommunityLeaderboardRecord = {
        id: randomUUID(),
        member_id: memberId,
        points,
        level,
        achievements_count: achievementsCount,
        recipes_viewed: recipesViewed,
        forum_posts: forumPosts,
        has_collectible: hasCollectible ? 1 : 0,
        last_updated: new Date().toISOString(),
        badges: badges ? JSON.stringify(badges) : undefined,
    };

    // Check if member already exists in leaderboard
    const existing = db.prepare("SELECT id FROM community_leaderboard WHERE member_id = ?").get(memberId);
    
    if (existing) {
        const stmt = db.prepare(`
            UPDATE community_leaderboard 
            SET points = @points, level = @level, achievements_count = @achievements_count, 
                recipes_viewed = @recipes_viewed, forum_posts = @forum_posts, 
                has_collectible = @has_collectible, badges = @badges, last_updated = @last_updated
            WHERE member_id = @member_id
        `);
        stmt.run({ ...record, member_id: memberId });
    } else {
        const stmt = db.prepare(`
            INSERT INTO community_leaderboard (id, member_id, points, level, achievements_count, recipes_viewed, forum_posts, has_collectible, badges, last_updated)
            VALUES (@id, @member_id, @points, @level, @achievements_count, @recipes_viewed, @forum_posts, @has_collectible, @badges, @last_updated)
        `);
        stmt.run(record);
    }

    // Update ranks
    updateLeaderboardRanks();
}

export function getCommunityLeaderboard(limit: number = 20): CommunityLeaderboardRecord[] {
    const db = getDatabase();
    return db.prepare(`
        SELECT cl.*, m.full_name, m.email
        FROM community_leaderboard cl
        JOIN members m ON cl.member_id = m.id
        ORDER BY cl.points DESC, cl.last_updated DESC
        LIMIT ?
    `).all(limit) as CommunityLeaderboardRecord[];
}

function updateLeaderboardRanks(): void {
    const db = getDatabase();
    const members = db.prepare("SELECT member_id FROM community_leaderboard ORDER BY points DESC").all() as { member_id: string }[];
    
    const stmt = db.prepare("UPDATE community_leaderboard SET rank = ? WHERE member_id = ?");
    members.forEach((member, index) => {
        stmt.run(index + 1, member.member_id);
    });
}

// Web3 Verification Operations
export function recordWeb3Verification(
    memberId: string,
    verificationType: string,
    status: string,
    verifiedAt?: Date,
    expiresAt?: Date,
    metadata?: Record<string, any>
): void {
    const db = getDatabase();
    const record: Web3VerificationRecord = {
        id: randomUUID(),
        member_id: memberId,
        verification_type: verificationType,
        status,
        verified_at: verifiedAt?.toISOString(),
        expires_at: expiresAt?.toISOString(),
        metadata: metadata ? JSON.stringify(metadata) : undefined,
    };

    const stmt = db.prepare(`
        INSERT OR REPLACE INTO web3_verifications (id, member_id, verification_type, status, verified_at, expires_at, metadata)
        VALUES (@id, @member_id, @verification_type, @status, @verified_at, @expires_at, @metadata)
    `);
    stmt.run(record);
}

export function getMemberWeb3Verifications(memberId: string): Web3VerificationRecord[] {
    const db = getDatabase();
    return db.prepare(`
        SELECT * FROM web3_verifications 
        WHERE member_id = ? 
        ORDER BY verified_at DESC
    `).all(memberId) as Web3VerificationRecord[];
}

// Preference Operations
export function setMemberPreference(
    memberId: string,
    preferenceKey: string,
    preferenceValue: string
): void {
    const db = getDatabase();
    const record: MemberPreferenceRecord = {
        id: randomUUID(),
        member_id: memberId,
        preference_key: preferenceKey,
        preference_value: preferenceValue,
        updated_at: new Date().toISOString(),
    };

    const stmt = db.prepare(`
        INSERT OR REPLACE INTO member_preferences (id, member_id, preference_key, preference_value, updated_at)
        VALUES (@id, @member_id, @preference_key, @preference_value, @updated_at)
    `);
    stmt.run(record);
}

export function getMemberPreferences(memberId: string): Record<string, string> {
    const db = getDatabase();
    const preferences = db.prepare(`
        SELECT preference_key, preference_value 
        FROM member_preferences 
        WHERE member_id = ?
    `).all(memberId) as { preference_key: string; preference_value: string }[];

    return preferences.reduce((acc, pref) => {
        acc[pref.preference_key] = pref.preference_value;
        return acc;
    }, {} as Record<string, string>);
}

// Concierge Brief Operations
export function createConciergeBrief(
    memberId: string,
    briefContent: string
): string {
    const db = getDatabase();
    const briefId = randomUUID();
    const record: ConciergeBriefRecord = {
        id: briefId,
        member_id: memberId,
        brief_content: briefContent,
        status: "pending",
        created_at: new Date().toISOString(),
    };

    const stmt = db.prepare(`
        INSERT INTO concierge_briefs (id, member_id, brief_content, status, created_at)
        VALUES (@id, @member_id, @brief_content, @status, @created_at)
    `);
    stmt.run(record);

    return briefId;
}

export function getMemberConciergeBriefs(memberId: string): ConciergeBriefRecord[] {
    const db = getDatabase();
    return db.prepare(`
        SELECT * FROM concierge_briefs 
        WHERE member_id = ? 
        ORDER BY created_at DESC
    `).all(memberId) as ConciergeBriefRecord[];
}

// Session Operations
export function startMemberSession(memberId: string): string {
    const db = getDatabase();
    const sessionId = randomUUID();
    const record: MemberSessionRecord = {
        id: sessionId,
        member_id: memberId,
        session_start: new Date().toISOString(),
        page_views: 0,
        actions_count: 0,
    };

    const stmt = db.prepare(`
        INSERT INTO member_sessions (id, member_id, session_start, page_views, actions_count)
        VALUES (@id, @member_id, @session_start, @page_views, @actions_count)
    `);
    stmt.run(record);

    return sessionId;
}

export function endMemberSession(sessionId: string): void {
    const db = getDatabase();
    const session = db.prepare("SELECT * FROM member_sessions WHERE id = ?").get(sessionId) as MemberSessionRecord;
    
    if (session) {
        const startTime = new Date(session.session_start).getTime();
        const endTime = new Date().getTime();
        const durationMinutes = Math.round((endTime - startTime) / (1000 * 60));

        const stmt = db.prepare(`
            UPDATE member_sessions 
            SET session_end = @session_end, duration_minutes = @duration_minutes
            WHERE id = @id
        `);
        stmt.run({
            id: sessionId,
            session_end: new Date().toISOString(),
            duration_minutes: durationMinutes,
        });
    }
}

export function updateSessionActivity(sessionId: string, pageViews?: number, actionsCount?: number): void {
    const db = getDatabase();
    const updates: Record<string, any> = {};
    
    if (pageViews !== undefined) updates.page_views = pageViews;
    if (actionsCount !== undefined) updates.actions_count = actionsCount;

    if (Object.keys(updates).length > 0) {
        const setClause = Object.keys(updates).map(key => `${key} = @${key}`).join(", ");
        const stmt = db.prepare(`UPDATE member_sessions SET ${setClause} WHERE id = @id`);
        stmt.run({ id: sessionId, ...updates });
    }
}

// Content Interaction Operations
export function recordContentInteraction(
    memberId: string,
    contentType: string,
    contentId: string,
    interactionType: string,
    metadata?: Record<string, any>
): void {
    const db = getDatabase();
    const record = {
        id: randomUUID(),
        member_id: memberId,
        content_type: contentType,
        content_id: contentId,
        interaction_type: interactionType,
        created_at: new Date().toISOString(),
        metadata: metadata ? JSON.stringify(metadata) : undefined,
    };

    const stmt = db.prepare(`
        INSERT INTO member_content_interactions (id, member_id, content_type, content_id, interaction_type, created_at, metadata)
        VALUES (@id, @member_id, @content_type, @content_id, @interaction_type, @created_at, @metadata)
    `);
    stmt.run(record);
}

export function getMemberContentInteractions(
    memberId: string,
    contentType?: string,
    limit: number = 50
): any[] {
    const db = getDatabase();
    let query = "SELECT * FROM member_content_interactions WHERE member_id = ?";
    const params: any[] = [memberId];

    if (contentType) {
        query += " AND content_type = ?";
        params.push(contentType);
    }

    query += " ORDER BY created_at DESC LIMIT ?";
    params.push(limit);

    return db.prepare(query).all(...params);
}
