# Database Setup and Usage

## Overview

The Table d'Adrian application uses SQLite with better-sqlite3 for data persistence. The database is automatically initialized with comprehensive schemas for all Task 12 and 13 features.

## Database Schema

### Core Tables (Existing)
- `members` - User accounts and authentication
- `collectibles` - NFT collectible definitions
- `collectible_holders` - Wallet addresses with collectibles
- `recipes` - Recipe content and metadata
- `recipe_steps` - Step-by-step recipe instructions
- `newsletter_subscribers` - Newsletter subscription data
- `forum_posts` - Community forum content

### Enhanced Tables (Task 12 & 13)

#### Member Analytics
- `member_analytics` - Track user engagement metrics
- `member_activity` - Log user actions and interactions
- `member_sessions` - Session tracking and duration

#### Community Features
- `member_achievements` - User achievement unlocks
- `achievement_definitions` - Achievement templates and requirements
- `community_leaderboard` - Member rankings and points
- `member_recommendations` - Personalized content suggestions

#### Content Management
- `member_content_interactions` - Track content engagement
- `member_preferences` - User preference storage
- `concierge_briefs` - Concierge service requests

#### Web3 Integration
- `web3_verifications` - Blockchain verification status

## Database Operations

### Enhanced Database Functions

The `src/lib/database-enhanced.ts` file provides comprehensive database operations:

#### Analytics Operations
```typescript
// Record user analytics
recordMemberAnalytics(memberId, metricName, metricValue, metadata);

// Get member analytics
getMemberAnalytics(memberId, metricName?);
```

#### Achievement Operations
```typescript
// Unlock member achievement
unlockMemberAchievement(memberId, achievementId, progress, maxProgress, pointsEarned);

// Get member achievements
getMemberAchievements(memberId);
```

#### Activity Tracking
```typescript
// Record member activity
recordMemberActivity(memberId, activityType, activityData, metadata);

// Get member activity
getMemberActivity(memberId, limit);
```

#### Community Features
```typescript
// Update leaderboard
updateMemberLeaderboard(memberId, points, level, achievementsCount, recipesViewed, forumPosts, hasCollectible, badges);

// Get community leaderboard
getCommunityLeaderboard(limit);
```

#### Recommendations
```typescript
// Create member recommendation
createMemberRecommendation(memberId, recommendationType, title, description, actionText, actionHref, priority);

// Get member recommendations
getMemberRecommendations(memberId);
```

## API Endpoints

### Member Analytics
- `POST /api/members/analytics` - Record analytics data
- `GET /api/members/analytics` - Retrieve analytics data

### Member Achievements
- `POST /api/members/achievements` - Unlock achievements
- `GET /api/members/achievements` - Get member achievements

### Member Activity
- `POST /api/members/activity` - Record activity
- `GET /api/members/activity` - Get activity history

### Community Leaderboard
- `GET /api/community/leaderboard` - Get leaderboard
- `POST /api/community/leaderboard` - Update member stats

### Member Recommendations
- `POST /api/members/recommendations` - Create recommendations
- `GET /api/members/recommendations` - Get recommendations

## Database Initialization

### Automatic Initialization
The database is automatically initialized when the application starts. The schema is created and seeded with initial data.

### Manual Migration
To manually run database migrations:

```bash
npm run migrate
```

### Seed Data
The database is automatically seeded with:
- Collectible tier definitions
- Recipe content
- Forum posts
- Achievement definitions
- Initial analytics data

## Performance Optimization

### Indexes
The database includes comprehensive indexes for optimal performance:

- `idx_member_analytics_member_id` - Fast analytics lookups
- `idx_member_analytics_metric_name` - Metric-based queries
- `idx_member_activity_member_id` - Activity history queries
- `idx_leaderboard_points` - Leaderboard sorting
- `idx_content_interactions_member_id` - Content engagement tracking

### WAL Mode
The database uses Write-Ahead Logging (WAL) mode for better concurrency and performance.

## Data Persistence

### File Location
- **Production**: `content/database.sqlite`
- **Development**: In-memory database for testing

### Backup Strategy
- Database files are included in version control
- Regular backups recommended for production
- WAL files provide additional safety

## Error Handling

### Graceful Degradation
- Database errors are caught and logged
- Application continues to function with warnings
- Fallback data provided when database unavailable

### Build-Time Safety
- Database operations wrapped in try-catch blocks
- Static generation continues even if database unavailable
- Warnings logged instead of build failures

## Usage Examples

### Recording User Analytics
```typescript
import { recordMemberAnalytics } from '@/lib/database-enhanced';

// Track page view
recordMemberAnalytics('user@example.com', 'page_view', 1, {
  page: '/members',
  timestamp: new Date().toISOString()
});

// Track engagement
recordMemberAnalytics('user@example.com', 'engagement_score', 85.5, {
  recipes_viewed: 5,
  time_spent: 1200
});
```

### Managing Achievements
```typescript
import { unlockMemberAchievement } from '@/lib/database-enhanced';

// Unlock achievement
unlockMemberAchievement('user@example.com', 'first-collectible', 1, 1, 25);
```

### Community Leaderboard
```typescript
import { updateMemberLeaderboard } from '@/lib/database-enhanced';

// Update member stats
updateMemberLeaderboard(
  'user@example.com',
  150, // points
  5,   // level
  3,   // achievements
  10,  // recipes viewed
  2,   // forum posts
  true, // has collectible
  ['chef', 'explorer'] // badges
);
```

## Troubleshooting

### Common Issues

1. **Database not found**: Ensure `content/` directory exists
2. **Permission errors**: Check file system permissions
3. **Memory issues**: Use in-memory database for testing
4. **Build failures**: Database errors are now handled gracefully

### Debug Mode
Enable debug logging by setting environment variables:
```bash
DEBUG=database npm run dev
```

## Security Considerations

- All database operations use prepared statements
- User input is properly sanitized
- Foreign key constraints enforced
- Authentication required for sensitive operations

## Future Enhancements

- Database connection pooling
- Read replicas for analytics
- Automated backup scheduling
- Performance monitoring
- Data archiving strategies
