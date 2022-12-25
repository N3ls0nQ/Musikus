const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const wait = require('node:timers/promises').setTimeout;


module.exports = {
  data: new SlashCommandBuilder()
    .setName("pause")
    .setDescription("Pauses the playing song"),

  async execute(interaction, client) {
    await interaction.deferReply();
    const queue = client.player.getQueue(interaction.guildId);

    if (!queue) {
      return await interaction.editReply({
        embeds: [
            new EmbedBuilder()
            .setDescription(`:x: There are no songs in the queue.`)
            .setColor(0x00AEFF)
        ]
      });
    }

    queue.setPaused(true);

    await interaction.editReply({
        embeds: [
            new EmbedBuilder()
                .setDescription(":pause_button: Song paused! `/resume` to resume the music.")
        ]
    })

    await wait(2500)
    await interaction.deleteReply();
  },
};
