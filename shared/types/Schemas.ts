export interface Channel {
  // Typically omitted on GET requests
  id?: string;
  profilePictureURL: string;
  channelId: string;
  username: string;
  displayName: string;
  // User that owns this data
  userId: string;
  // Category this channel is for
  categoryOwnerId: string;
}
