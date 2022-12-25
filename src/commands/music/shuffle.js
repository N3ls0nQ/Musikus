const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const wait = require('node:timers/promises').setTimeout;


module.exports = {
  data: new SlashCommandBuilder()
    .setName("shuffle")
    .setDescription("Shuffles the queue"),

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

    queue.shuffle()
    await interaction.editReply({
        embeds: [
            new EmbedBuilder()
                .setDescription(`:white_check_mark: The queue of ${queue.tracks.length} songs has been shuffled.`)
        ]
    })

    await wait(2500)
    await interaction.deleteReply();
  },
};
