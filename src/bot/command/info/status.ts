import { SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js';
import { loadavg, freemem } from 'os';

const data = new SlashCommandBuilder().setName('status').setDescription('Show bot status');
const execute = async (interaction: ChatInputCommandInteraction) => {
  const { heapUsed, heapTotal } = process.memoryUsage();
  const mem = freemem();
  const load = loadavg();
  const embed = {
    title: 'Status',
    fields: [
      {
        name: 'Memory',
        value: `${(heapUsed / 1024 / 1024).toFixed(2)} / ${(heapTotal / 1024 / 1024).toFixed(2)} MB`,
        inline: true,
      },
      {
        name: 'Free Memory',
        value: `${(mem / 1024 / 1024).toFixed(2)} MB`,
        inline: true,
      },
      {
        name: 'Load Average',
        value: `${load[0].toFixed(2)} ${load[1].toFixed(2)} ${load[2].toFixed(2)}`,
        inline: true,
      },
      {
        name: 'Uptime',
        value: `${Math.floor(process.uptime() / 60)} minutes`,
        inline: true,
      },
    ],
  };
  await interaction.reply({
    embeds: [embed],
    ephemeral: true,
  });
};

export default {
  data: data,
  execute: execute,
};
