// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-guildCreate
import { Guild } from "discord.js";
import BaseEvent from "../utils/structures/BaseEvent";
import DiscordClient from "../client/client";
import { getRepository } from "typeorm";
import { GuildConfiguration } from "../typeorm/entities/GuildConfiguration";

export default class GuildCreateEvent extends BaseEvent {
  constructor(
    private readonly guildConfigRepo = getRepository(GuildConfiguration)
  ) {
    super("guildCreate");
  }

  async run(client: DiscordClient, guild: Guild) {
    const config = await this.guildConfigRepo.findOneBy({
      guildId: guild.id,
    });
    if (config) {
      return;
    } else {
      const newConfig = this.guildConfigRepo.create({
        guildId: guild.id,
        guildOwnerId: guild.ownerId,
        welcomeChannelId: guild.systemChannelId || "0",
      });
      return this.guildConfigRepo.save(newConfig);
    }
  }
}
