import { BaseEntity, Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "welcome_message_config" })
export class WelcomeMessageConfig {
  @PrimaryColumn({ name: "guildUid", unique: true})
  id: number;

  @Column({name: "is_embed", default: false})
  isEmbed: boolean;

  @Column({ default: "Hey! Welcome on this Server!"})
  message: string | JSON;
}
