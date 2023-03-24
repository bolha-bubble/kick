const { Client } = require('discord.js-selfbot-v13');
const { guildID, memberID, selfToken } = require("./config.json");
const client = new Client({
  checkUpdate: false
}); 

client.on('ready', () => {

  const guild = client.guilds.cache.get(guildID);
  const voiceChannels = guild.channels.cache.filter(channel => channel.type === "GUILD_VOICE");

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

client.login(selfToken);