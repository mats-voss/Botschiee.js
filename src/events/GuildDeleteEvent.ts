// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-guildDelete
import { Guild } from "discord.js";
import BaseEvent from "../utils/structures/BaseEvent";
import DiscordClient from "../client/client";
import { getRepository } from "typeorm";
import { GuildConfiguration } from "../typeorm/entities/GuildConfiguration";

export default class GuildDeleteEvent extends BaseEvent {
    constructor(
        private readonly guildConfigRepo = getRepository(GuildConfiguration)
    ) {
        super("guildDelete");
    }
    async run(client: DiscordClient, guild: Guild) {
        const guildToArchive = await this.guildConfigRepo.findOneBy({
            guildId: guild.id,
        });
        if (guildToArchive != null) {
            // getting new Date
            var current = new Date();
            current.setMonth(current.getMonth() + 1)
            current.setHours(2, 0, 0)
            
            // setting new Values in DB
            guildToArchive.inGuild = false;
            guildToArchive.deleteTimestamp = Math.round(current.getTime() / 1000);
            await this.guildConfigRepo.save(guildToArchive);

            // deleting guild from collection
            client.configs.delete(guild.id);
        } else {
            console.error("GuildDeleteEvent | Guild to archive not found!", {guild: guild.id, values: {guildToArchive: guildToArchive}, collection: client.configs, time: Date.now()})
        }
    }
}
