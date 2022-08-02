import { Guild, Message, MessageEmbed } from "discord.js";
import BaseCommand from "../../utils/structures/BaseCommand";
import DiscordClient from "../../client/client";

export default class GuildInfoCommand extends BaseCommand {
  constructor() {
    super("muteUser", "information", []);
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    
  }
}