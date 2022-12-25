const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const wait = require('node:timers/promises').setTimeout;


module.exports = {
  data: new SlashCommandBuilder()
    .setName("earrape")
    .setDescription("INSERT THOMAS THE TANK ENGINE NOISE"),

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

    await queue.setFilters({
        earrape: !queue.getFiltersEnabled().includes("earrape"),
        normalizer2: !queue.getFiltersEnabled().includes("earrape")
    });

    // setTimeout(async() => {
    //     return await interaction.editReply({
    //         embeds: [
    //             new EmbedBuilder()
    //                 .setDescription(`Bassboost ${queue.getFiltersEnabled().includes("bassboost") ? "Enabled" : "Disabled"}!`)
    //         ]
    //     })
    // }, queue.options.bufferingTimeout)
    setTimeout(() => {
        return void interaction.followUp({ content: `🎵 | **Earrape ${queue.getFiltersEnabled().includes('bassboost') ? 'Disabled' : 'Enabled'}!**` });
    }, queue.options.bufferingTimeout);

    await wait(5000)
    await interaction.deleteReply();
  },
};
