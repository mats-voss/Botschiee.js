import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "guild_configuration" })
export class GuildConfiguration {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "pro_subscription", default: false })
  proSubscription: boolean

  @Column({ unique: true, name: "guild_id" })
  guildId: string;

  @Column({ name: "guild_owner_id" })
  guildOwnerId: string;

  @Column({ default: "?" })
  prefix: string;

  @Column({ name: "welcome_channel_id" })
  welcomeChannelId: string;

  @Column({ name: "in_guild",default: true})
  inGuild: boolean;

  @Column({ name: "delete_timestamp" })
  deleteTimestamp: number;
}
