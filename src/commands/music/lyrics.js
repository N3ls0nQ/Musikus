const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const wait = require("node:timers/promises").setTimeout;
const finder = require("lyrics-finder");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("lyrics")
    .setDescription("Finds the corresponding lyrics")
    .addStringOption((option) =>
      option.setName("song").setDescription("The songs name").setRequired(true)
    ),

  async execute(interaction, client) {
    await interaction.deferReply();
    const queue = client.player.getQueue(interaction.guildId);

    // if (!queue) {
    //   return await interaction.editReply({
    //     embeds: [
    //         new EmbedBuilder()
    //         .setDescription(`:x: There are no songs in the queue.`)
    //         .setColor(0x00AEFF)
    //     ]
    //   });
    // }

    //let lyrics = null;
    //let track = queue.current;
    //track = track.title;
    const track = "olivia"
    let search = interaction.options.getString("song");
    console.log(search)

    if(search !== null){
      try {
        lyrics = await finder(search, "");
        if (!lyrics) lyrics = `:x: No Lyrics Found!`;
      } catch (e) {
        lyrics = `:x: No Lyrics Found!`;
      }
    } else {
      try {
        lyrics = await finder(track, "");
        if (!lyrics) lyrics = `:x: No Lyrics Found!`;
      } catch (e) {
        lyrics = `:x: No Lyrics Found!`;
      }
    }


    let embed = new EmbedBuilder()
      .setTitle(`Lyrics for ${search}`)
      .setDescription(lyrics)
      .setColor(`Random`)
      //.setThumbnail(`${queue.current.thumbnail}`)
      .setColor(0x00aeff);

    if (embed.data.description.length >= 4096)
      embed.data.description = `${embed.data.description.substring(
        0,
        4096
      )}...`;

    await interaction.editReply({
      embeds: [embed],
    });
  },
};
