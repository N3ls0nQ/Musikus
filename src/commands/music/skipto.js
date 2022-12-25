const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const wait = require('node:timers/promises').setTimeout;


module.exports = {
  data: new SlashCommandBuilder()
    .setName("skipto")
    .setDescription("Skips to the given song in the queue")
    .addNumberOption((option) =>
      option
        .setName("tracknumber")
        .setDescription("Track to skip to")
        .setMinValue(1)
        .setRequired(true)
    ),

  async execute(interaction, client) {
    await interaction.deferReply();
    const queue = client.player.getQueue(interaction.guildId);

    if (!queue) {
      return await interaction.editReply({
        embeds: [
          new EmbedBuilder()
            .setDescription(`:x: There are no songs in the queue.`)
            .setColor(0xf00),
        ],
      });
    }
    const trackNum = interaction.options.getNumber("tracknumber")
    if(trackNum > queue.tracks.length){
        return await interaction.editReply({
            embeds: [
              new EmbedBuilder()
                .setDescription(`:x: Invalid track number.`)
                .setColor(0xf00),
            ],
          });
    }
    queue.skipTo(trackNum - 1)

    await interaction.editReply({
      embeds: [new EmbedBuilder().setDescription(`:track_next: Skipped to track number ${trackNum}.`)],
    });

    await wait(2500)
    await interaction.deleteReply();
  },
};
