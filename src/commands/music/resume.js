const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const wait = require('node:timers/promises').setTimeout;


module.exports = {
  data: new SlashCommandBuilder()
    .setName("resume")
    .setDescription("Resumes the playing song"),

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

    queue.setPaused(false)
    await interaction.editReply({
        embeds: [
            new EmbedBuilder()
                .setDescription(":arrow_forward: Resumed song! ```/pause``` to pause the music.")
        ]
    })

    await wait(2500)
    await interaction.deleteReply();
  },
};
