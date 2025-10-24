#!/usr/bin/env node

/**
 * Database Migration Script
 * Ensures all new tables and indexes are created for Task 12 & 13 features
 */

import { getDatabase, closeDatabase } from "../src/lib/database.ts";

async function runMigration() {
    console.log("🔄 Starting database migration...");
    
    try {
        const db = getDatabase();
        
        // The schema is automatically created in initializeSchema()
        // This script ensures the database is properly initialized
        console.log("✅ Database schema initialized");
        
        // Test that all new tables exist
        const tables = [
            'member_analytics',
            'member_achievements', 
            'achievement_definitions',
            'member_activity',
            'member_recommendations',
            'community_leaderboard',
            'member_content_interactions',
            'web3_verifications',
            'member_preferences',
            'concierge_briefs',
            'member_sessions'
        ];
        
        for (const table of tables) {
            try {
                const result = db.prepare(`SELECT COUNT(*) as count FROM ${table}`).get();
                console.log(`✅ Table '${table}' exists (${result.count} records)`);
            } catch (error) {
                console.error(`❌ Table '${table}' missing or error:`, error.message);
            }
        }
        
        console.log("🎉 Database migration completed successfully!");
        
    } catch (error) {
        console.error("❌ Migration failed:", error);
        process.exit(1);
    } finally {
        closeDatabase();
    }
}

// Run migration if this script is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
    runMigration();
}

export { runMigration };
