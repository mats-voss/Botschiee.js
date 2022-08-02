import { Message, MessageEmbed } from 'discord.js';
import BaseCommand from '../../utils/structures/BaseCommand';
import DiscordClient from '../../client/client';
import { getRepository } from 'typeorm';
import { GuildConfiguration } from '../../typeorm/entities/GuildConfiguration';

export default class SetPrefixCommand extends BaseCommand {
  constructor( private readonly guildConfigRepo = getRepository(GuildConfiguration)) {
    super('setPrefix', 'configControls', []);
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    const guildConfig = await this.guildConfigRepo.findOneBy({guildId: message.guild?.id})
    if(guildConfig && message.guild && args.length == 1){
      // changing DB
      guildConfig.prefix = args[0]
      await this.guildConfigRepo.save(guildConfig)

      // changing collection
      client.configs.set(message.guild.id, guildConfig);
      
      // sending embed
      const successEmbed = new MessageEmbed()
        .setColor('GREEN')
        .setAuthor({name: "Prefix Changed"})
        .setDescription(`Your prefix has been changed to "**${args[0]}**" by <@${message.author.id}>`)
        .setFooter({ text: "Botschiee", iconURL: client.user?.displayAvatarURL()});
      message.channel.send({embeds: [successEmbed]})
    } else {
      message.channel.send("Something went wrong! Please use only letters and numbers **without** space for the prefix!")
    }
  }
}