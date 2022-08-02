// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-guildCreate
import { Guild, MessageEmbed } from "discord.js";
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
    var configInfoEmbed: MessageEmbed;
    const config = await this.guildConfigRepo.findOneBy({
      guildId: guild.id,
    });
    if (config) {
      // setting config back active
      config.deleteTimestamp = 0;
      config.inGuild = true;
      await this.guildConfigRepo.save(config)

      // restoring config
      client.configs.set(guild.id, config)

      // sending condition specific embed
      configInfoEmbed = new MessageEmbed()
      .setAuthor({name: "Old Guild-Configuration restored!"})
      .setDescription(`Thank you for using <@${client.user?.id}> **again**!\nOn our [Dashboard](https://mats-voss.com) can you customize the settings and configure the Bot.`)
      .addFields(
        {name: "Guild Configuration", value: "We found an old Guild-Configuration for this server. If you don't want to use this configuration you can reset everything in your Dashboard."}
      )
      .setFooter({ text: "Botschiee", iconURL: client.user?.displayAvatarURL()});
    } else {
      const newConfig = this.guildConfigRepo.create({
        guildId: guild.id,
        guildOwnerId: guild.ownerId,
        welcomeChannelId: guild.systemChannelId || "0",
      });
      const savedConfig = await this.guildConfigRepo.save(newConfig);
      client.configs.set(guild.id, savedConfig);

      configInfoEmbed = new MessageEmbed()
      .setAuthor({name: "New GuildConfiguration created!"})
      .setDescription(`Thank you for using <@${client.user?.id}>!\nOn our [Dashboard](https://mats-voss.com) can you customize the settings and configure the Bot.`)
      .addFields(
        {name: "Guild Configuration", value: "A new guild configuration got created for your server. It looks like you don't have a archived configuration. If you think thats a mistake or if you need other support feel free to join our support server!"},
        {name: "General Information", value: "You have several configuration options in our Dashboard, if you want more customization possibility's you can you subscribe the Pro version."}
      )
      .setFooter({ text: "Botschiee", iconURL: client.user?.displayAvatarURL()});
    }
    if(guild.systemChannel) guild.systemChannel.send({embeds: [configInfoEmbed]})
  }
}
