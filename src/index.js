require("dotenv").config();

const { TOKEN } = process.env;
const { Player } = require("discord-player");
const { Client, Collection, GatewayIntentBits, } = require("discord.js");
const fs = require("fs");

const client = new Client({ intents: [GatewayIntentBits.Guilds, "GuildVoiceStates"]});
client.commands = new Collection();
client.commandArray = []
client.colour = "#f00";
client.buttons = new Collection();
// client.musicChannelId = "1022904952152137768";
client.musicChannelId = "1023679714679857272";
client.player = new Player(client, {
  ytdlOptions: {
    quality: "highestaudio",
    highWaterMark: 1 << 25,
    //spotifyBridge: false,
  }
})

const functionFolders = fs.readdirSync(`./src/functions`);
for (const folder of functionFolders) {
  const functionFiles = fs
    .readdirSync(`./src/functions/${folder}`)
    .filter((file) => file.endsWith(".js"));
  for (const file of functionFiles)
    require(`./functions/${folder}/${file}`)(client);
}

client.handleEvents();
client.handleCommands();
client.handleComponents();
client.login(TOKEN)
