// src/helpers/discord.helper.ts
import config from '@/config';
import ApiError from '@/errors/ApiError';
import {
  ChannelType,
  Client,
  GatewayIntentBits,
  PermissionsBitField,
  TextChannel,
  Guild,
} from 'discord.js';
import httpStatus from 'http-status';
import { CreateDiscordChannelParams, DiscordChannelResult } from './discord.interface';

const initializeDiscordClient = async (): Promise<Client> => {
  const client = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.GuildMembers,
    ],
  });

  try {
    await client.login(config.discord_bot_token);
    return client;
  } catch (error) {
    console.error('Discord login error:', error);
    throw new ApiError(
      httpStatus.SERVICE_UNAVAILABLE,
      'Unable to connect to Discord. Please try again later.',
    );
  }
};

const fetchGuild = async (client: Client): Promise<Guild> => {
  try {
    const guild = await client.guilds.fetch(config.discord_server_guild_id);
    if (!guild) {
      throw new Error('Guild not found');
    }
    return guild;
  } catch (error) {
    console.error('Failed to fetch guild:', error);
    throw new ApiError(
      httpStatus.SERVICE_UNAVAILABLE,
      'Unable to access Discord server. Please try again later.',
    );
  }
};

const createChannel = async (
  guild: Guild,
  channelName: string,
  buyerId: string,
  sellerId: string,
): Promise<TextChannel> => {
  try {
    return await guild.channels.create({
      name: channelName,
      type: ChannelType.GuildText,
      permissionOverwrites: [
        {
          id: guild.id,
          deny: [PermissionsBitField.Flags.ViewChannel],
        },
        {
          id: buyerId,
          allow: [
            PermissionsBitField.Flags.ViewChannel,
            PermissionsBitField.Flags.SendMessages,
            PermissionsBitField.Flags.ReadMessageHistory,
          ],
        },
        {
          id: sellerId,
          allow: [
            PermissionsBitField.Flags.ViewChannel,
            PermissionsBitField.Flags.SendMessages,
            PermissionsBitField.Flags.ReadMessageHistory,
          ],
        },
      ],
    });
  } catch (error) {
    console.error('Channel creation error:', error);
    throw new ApiError(
      httpStatus.SERVICE_UNAVAILABLE,
      'Unable to create Discord channel. Please contact support.',
    );
  }
};

const createInvite = async (channel: TextChannel): Promise<string> => {
  try {
    const invite = await channel.createInvite({
      maxAge: 0,
      maxUses: 0,
      unique: true,
    });
    return `https://discord.gg/${invite.code}`;
  } catch (error) {
    console.error('Invite creation error:', error);
    throw new ApiError(
      httpStatus.SERVICE_UNAVAILABLE,
      'Unable to create channel invite. Please contact support.',
    );
  }
};

export const getDiscordChannelAndInvite = async ({
  channelName,
  prefix,
  buyerId,
  sellerId,
}: CreateDiscordChannelParams): Promise<DiscordChannelResult> => {
  let client: Client | null = null;
  
  try {
    client = await initializeDiscordClient();
    const guild = await fetchGuild(client);
    
    const channel = await createChannel(
      guild,
      `${prefix}-${channelName}`,
      buyerId,
      sellerId
    );
    
    const inviteUrl = await createInvite(channel);

    return {
      channelId: channel.id,
      invite: inviteUrl,
    };
  } catch (error) {
    console.error('Discord channel creation error:', error);
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Failed to create Discord channel'
    );
  } finally {
    if (client) {
      await client.destroy();
    }
  }
};