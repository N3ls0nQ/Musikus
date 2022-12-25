const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const wait = require('node:timers/promises').setTimeout;

module.exports = {
  data: new SlashCommandBuilder()
    .setName("quit")
    .setDescription("stops the bot"),

  async execute(interaction, client) {
    await interaction.deferReply();
    const queue = client.player.getQueue(interaction.guildId);

    if (!queue) {
        return await interaction.editReply({
          embeds: [
              new EmbedBuilder()
              .setDescription(`:x: There are no songs in the queue.`)
              .setColor(0xf00)
          ]
        });
      }

    queue.destroy()
    await interaction.editReply({
        embeds: [
            new EmbedBuilder()
                .setDescription(":wave: Bye!")
        ]
    })

    await wait(2500)
    await interaction.deleteReply();
  },
};
