const { EmbedBuilder } = require("discord.js");
const wait = require('node:timers/promises').setTimeout;

module.exports = {
    data: {
        name: `pause-btn`
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

        queue.setPaused(true)
        await interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setDescription(`**Paused** :pause_button: - ${queue.current.title}`)
                    .setColor(0x00AEFF)
            ]
        })

        await wait(5000)
        return await interaction.deleteReply()
    }
}