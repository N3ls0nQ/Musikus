const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const wait = require('node:timers/promises').setTimeout;


module.exports = {
  data: new SlashCommandBuilder()
    .setName("np")
    .setDescription("Displays info about the currently playing song."),

  async execute(interaction, client) {
    await interaction.deferReply();
    const queue = client.player.getQueue(interaction.guildId);

    if (!queue) {
      return await interaction.editReply("There are no songs in the queue.");
    }

    let bar = queue.createProgressBar({
        queue: true,
        length: 19
    })

    const song = queue.current

    await interaction.editReply({
        embeds: [
            new EmbedBuilder()
                .setThumbnail(song.thumbnail)
                .setDescription(`Currently playing: [${song.title}](${song.url})\n\n` + bar)
        ]
    })

    await wait(5000)
    await interaction.deleteReply();
  },
};
