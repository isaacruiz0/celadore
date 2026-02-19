export interface Channel {
  // Typically omitted on GET requests
  id?: string;
  profilePictureURL: string;
  youtubeChannelId: string;
  username: string;
  // User that owns this data
  userId?: string;
  // Category this channel is for
  categoryOwnerId?: string;
}
