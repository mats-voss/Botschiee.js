import { Guild, Message, MessageEmbed } from "discord.js";
import BaseCommand from "../../utils/structures/BaseCommand";
import DiscordClient from "../../client/client";

export default class GuildInfoCommand extends BaseCommand {
  constructor() {
    super("guildInfo", "information", []);
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    const guild = message.guild;

    const embed = new MessageEmbed()
      .setColor("#0099ff")
      .setTitle("Test title")
      .setAuthor({ name: "Test author" });
    message.channel.send("Guild ID: " + guild?.id);
    message.channel.send({ embeds: [embed] });
  }
}
