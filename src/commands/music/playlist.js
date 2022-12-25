const { QueryType } = require("discord-player");
const { SlashCommandBuilder, EmbedBuilder, ComponentAssertions } = require("discord.js");
const wait = require('node:timers/promises').setTimeout;


module.exports = {
  data: new SlashCommandBuilder()
    .setName("playlist")
    .setDescription("Adds a whole playlist to the queue")
    .addStringOption((option) => 
      option
        .setName("link")
        .setDescription("The spotify playlist link")
        .setRequired(true)
    ),

  async execute(interaction, client) {
    if (!interaction.member.voice.channel)
      return interaction.editReply(
        "Please join a voice channel to use this command."
      );

    const queue = await client.player.createQueue(interaction.guild);
    if (!queue.connection)
      await queue.connect(interaction.member.voice.channel);

    const embed = new EmbedBuilder();

      const url = interaction.options.getString("link");
        const result = await client.player.search(url, {
          requestedBy: interaction.user,
          searchEngine: QueryType.SPOTIFY_PLAYLIST,
        });
        if (result.tracks.length === 0)
          return interaction.editReply(
            "Your search returned 0 results. `" + url + "`"
          );

          const song = result.tracks[0];
        await queue.addTrack(song);

        embed
          .setDescription(
            // `**[${song.title}](${song.url})** has been added to the Queue.`
            `Your playlist has been added to the Queue.`
          )
          .setThumbnail(song.thumbnail)
          .setFooter({ text: `Duraction: ${song.duration}` });

    if(!queue.playing) await queue.play()

    await interaction.reply({
      embeds: [embed],
    });

    await wait(5000)
    await interaction.deleteReply();
  },
};
