const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("returns ping"),

  async execute(interaction, client) {
    const message = await interaction.deferReply({
      fetchReply: true,
    });

    const embed = new EmbedBuilder({
        title: "Ping Response:",
        color: 0x347ce0,
        timestamp: Date.now(),
        author: {
            iconURL: interaction.user.displayAvatarURL(),
            name: interaction.user.username
        },
        footer:{
            iconURL: client.user.displayAvatarURL(),
            text: client.user.tag,
        },
        fields: [{
            name: "API Latency:",
            value: `${client.ws.ping}ms`,
            inline: true,
        },{
            name: "Client Ping:",
            value: `${message.createdTimestamp - interaction.createdTimestamp}ms`,
            inline: true,
        }]
    })
    await interaction.editReply({
        embeds: [embed],
    })
  },
};
