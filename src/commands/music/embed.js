const { SlashCommandBuilder, EmbedBuilder} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("embed")
    .setDescription("Returns an Embed"),

  async execute(interaction, client) {
    const embed = new EmbedBuilder({
        title: "Title",
        description: "This is a description, woah",
        color: 0x3268a8,
        timestamp: Date.now(),
        author: {
            iconURL: interaction.user.displayAvatarURL(),
            name: interaction.user.tag
        },
        footer:{
            iconURL: client.user.displayAvatarURL(),
            text: client.user.tag,
        },
        fields: [{
            name: "Field 1",
            value: "This is a field"
        },{
            name: "Field 2",
            value: "This is another field"
        }]
    })
    await interaction.reply({
        embeds: [embed]
    })
  }, 
};
