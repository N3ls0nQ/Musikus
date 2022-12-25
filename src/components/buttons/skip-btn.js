const { EmbedBuilder } = require("discord.js");
const wait = require('node:timers/promises').setTimeout;

module.exports = {
    data: {
        name: `skip-btn`
    },

    async execute(interaction, client) {
        const queue = client.player.getQueue(interaction.guildId);
    
        if (!queue) {
          await interaction.reply({
            embeds: [
                new EmbedBuilder()
                .setDescription(`:x: There are no songs in the queue.`)
                .setColor(0xff0000)
            ]
          });
          
          await wait(2500)
          return await interaction.deleteReply();
        }
    
        const currentSong = queue.current;
        queue.skip()

        await interaction.reply({
          embeds: [
              new EmbedBuilder()
              .setDescription("Skipped " + currentSong.title + " :track_next:")
              .setColor(0x00AEFF)
          ]
        })

        await wait(2500)
        return await interaction.deleteReply();
    }
}