const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const wait = require('node:timers/promises').setTimeout;


module.exports = {
  data: new SlashCommandBuilder()
    .setName("skip")
    .setDescription("Skips the current song"),

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

    const currentSong = queue.current

    queue.skip()
    await interaction.editReply({
        embeds: [
            new EmbedBuilder()
                .setDescription(`:track_next: ${currentSong.title} has been skipped!`)
        ]
    })

    await wait(2500)
    await interaction.deleteReply();
  },
};
