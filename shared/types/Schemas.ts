export interface Channel {
  // Typically omitted on GET requests
  id?: string;
  profilePictureURL: string;
  youtubeChannelId: string;
  username: string;
  // User that owns this data
  userId?: string;
  // Theme this channel is for
  parentFeedThemeId?: string;
}

export interface FeedTheme {
  id: string;
  name: string;
  // In the case of themes within themes
  parentFeedThemeId: string | null;
}
