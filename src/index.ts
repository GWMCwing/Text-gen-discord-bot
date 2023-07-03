import { Client, Events } from 'discord.js';
import { config } from 'dotenv';
config();

const client = new Client({
  intents: ['Guilds', 'GuildMembers', 'GuildMessageTyping', 'GuildMessages', 'MessageContent'],
});

client.once(Events.ClientReady, (c) => {
  console.log(`Logged in as ${c.user?.tag}`);
});

client.login(process.env.TOKEN);
