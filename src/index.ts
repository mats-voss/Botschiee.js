require("dotenv").config();
import "reflect-metadata";
import { registerCommands, registerEvents } from "./utils/registry";
import config from "../slappey.json";
import DiscordClient from "./client/client";
import { Collection, Intents } from "discord.js";
import { createConnection, getRepository, Timestamp } from "typeorm";
import { GuildConfiguration } from "./typeorm/entities/GuildConfiguration";
import { WelcomeMessageConfig } from "./typeorm/entities/WelcomeMessageConfig";
const client = new DiscordClient({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

(async () => {
  await createConnection({
    type: "mysql",
    host: process.env.MYSQL_DB_HOST,
    port: 3306,
    username: process.env.MYSQL_DB_USERNAME,
    password: process.env.MYSQL_DB_PASSWORD,
    database: process.env.MYSQL_DB_DATABASE,
    synchronize: true,
    entities: [GuildConfiguration, WelcomeMessageConfig],
  });

  const configRepo = getRepository(GuildConfiguration);
  const guildConfigs = await configRepo.find();
  const configs = new Collection<string, GuildConfiguration>();
  guildConfigs.forEach((config) => configs.set(config.guildId, config));
  client.configs = configs;
  console.log(client.configs);

  await registerCommands(client, "../commands");
  await registerEvents(client, "../events");
  await client.login(process.env.DISCORD_BOT_TOKEN);
  
  // creating schedule for every day 23:59
  const schedule = require('node-schedule');
  const job = schedule.scheduleJob({hour: 23, minute: 59}, async function(){
    console.log("Schedule triggered...")
    var current = new Date();
    current.setMonth(current.getMonth() + 1)
    current.setHours(2, 0, 0)

    // TODO: Round the current time and divide it with 1000 to get the same number!
    const entitiesToDelete = await configRepo.find({ where: {deleteTimestamp: current.getTime()}})
    console.log("guilds:", entitiesToDelete)
    await configRepo.remove(entitiesToDelete)
    console.log("Guilds deleted...")
  });
})();
