const { QueryType } = require("discord-player");
const {
  SlashCommandBuilder,
  EmbedBuilder,
  ComponentAssertions,
} = require("discord.js");
const wait = require("node:timers/promises").setTimeout;

module.exports = {
  data: new SlashCommandBuilder()
    .setName("play")
    .setDescription("Plays a given song")
    .addStringOption((option) =>
      option
        .setName("search")
        .setDescription("The songs name / url")
        .setRequired(true)
    ),

  //TODO: Extra command for playlists

  async execute(interaction, client) {

    //await interaction.deferReply({empheral: true})

    if (!interaction.member.voice.channel)
      return interaction.editReply(
        "Please join a voice channel to use this command."
      );

    const queue = await client.player.createQueue(interaction.guild);

    if (!queue.connection)  await queue.connect(interaction.member.voice.channel);

    const embed = new EmbedBuilder();

    const url = interaction.options.getString("search");

    const result = await client.player.search(url, {
      requestedBy: interaction.user,
      searchEngine: QueryType.YOUTUBE_SEARCH,
    });
    if (result.tracks.length === 0){
      return interaction.editReply(
        "Your search returned 0 results. `" + url + "`"
      );
    }

    console.log(result.tracks)
    const song = result.tracks[0];
    await queue.addTrack(song);

    embed
      .setDescription(
        `**[${song.title}](${song.url})** has been added to the Queue.`
      )
      .setThumbnail(song.thumbnail)
      .setFooter({ text: `Duraction: ${song.duration}` });

    // if(interaction.options.getSubcommand() === "song"){
    //     const url = interaction.options.getString("url");
    //     const result = await client.player.search(url, {
    //       requestedBy: interaction.user,
    //       searchEngine: QueryType.AUTO,
    //     });
    //     if (result.tracks.length === 0)
    //       return interaction.editReply(
    //         "Your search returned 0 results. ```" + url + "```"
    //       );

    //       const song = result.tracks[0];
    //     await queue.addTrack(song);

    //     embed
    //       .setDescription(
    //         `**[${song.title}](${song.url})** has been added to the Queue.`
    //       )
    //       .setThumbnail(song.thumbnail)
    //       .setFooter({ text: `Duraction: ${song.duration}` });

    // } else if(interaction.options.getSubcommand() === "playlist"){
    //     const url = interaction.options.getString("url");
    //     const result = await client.player.search(url, {
    //       requestedBy: interaction.user,
    //       searchEngine: QueryType.SPOTIFY_PLAYLIST,
    //     });
    //     if (result.tracks.length === 0)
    //       return interaction.editReply(
    //         "No results for your search ```" + url + "```"
    //       );

    //     const playlist = result.playlist;
    //     console.log(playlist)
    //     await queue.addTrack(result.tracks);

    //     embed
    //       .setDescription(
    //         `**${result.tracks.length} songs from [${playlist.title}](${playlist.url})** have been added to the Queue.`
    //       )
    //       .setThumbnail(playlist.thumbnail);
    // }

    if (!queue.playing) await queue.play();

    await interaction.reply({
      embeds: [embed],
    });

    await wait(5000);
    await interaction.deleteReply();
  },
};
