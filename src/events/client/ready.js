const {
  EmbedBuilder,
  Embed,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
} = require("discord.js");

module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    console.log(`Online! ${client.user.tag} is logged in.`);

    const skipBtn = new ButtonBuilder()
      .setCustomId("skip-btn")
      .setLabel("Skip")
      // .setEmoji(":track_next:")
      .setStyle(ButtonStyle.Primary);

    const pauseBtn = new ButtonBuilder()
      .setCustomId("pause-btn")
      .setLabel("Pause")
      // .setEmoji(":track_next:")
      .setStyle(ButtonStyle.Primary);

    const playBtn = new ButtonBuilder()
      .setCustomId("play-btn")
      .setLabel("Play")
      // .setEmoji(":track_next:")
      .setStyle(ButtonStyle.Primary);

    client.channels.cache.get(client.musicChannelId).send({
      embeds: [new EmbedBuilder().setTitle(`Music Channel`)],
      components: [
        new ActionRowBuilder().addComponents(pauseBtn, playBtn, skipBtn),
      ],
    });
  },
};
