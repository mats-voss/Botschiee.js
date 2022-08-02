import { Column, Entity } from "typeorm";

@Entity({ name: "muted_users_config" })
export class MutedUsersConfig {
    @Column({ unique: true, name: "user_id" })
    userId: number

    @Column({name: "team_member_id", })
    teamName: number

    @Column({ name: "muted_timestamp", default: null })
    mutedTimestamp: number

    @Column({ name: "reason", default: "N/A" })
    reason: string

    @Column({ name: "reported_message_id", default: "N/A"})
    reportedMessageId: number
}