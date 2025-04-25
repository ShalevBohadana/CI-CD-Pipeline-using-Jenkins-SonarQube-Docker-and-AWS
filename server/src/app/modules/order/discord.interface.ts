export interface CreateDiscordChannelParams {
    channelName: string;
    prefix: string;
    buyerId: string;
    sellerId: string;
  }
  
  export interface DiscordChannelResult {
    channelId: string;
    invite: string;
  }