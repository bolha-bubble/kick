const { Client, GatewayIntentBits } = require('discord.js');
const { guildID, memberID, botToken } = require("./config.json");
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMembers
  ]
});

client.on('ready', () => {

  const guild = client.guilds.cache.get(guildID);
  const voiceChannels = guild.channels.cache.filter(channel => channel.type === 2);

  setInterval(() => {
    voiceChannels.forEach((channel) => {
      channel.members.forEach((member) => {
        if (member.user.id === memberID) {
          member.voice.disconnect();
        };
      });
    });
  }, 1000);
});

client.login(botToken);