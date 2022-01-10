const settings = require('../settings.json');
const channel = settings.rrchannelid;
module.exports = async (reaction, user) => {
    if (!reaction) {
        return;
    }
    const message = reaction.message;
    const rolept = message.guild.roles.cache.find(role => role.name === "Portuguese");
    const roleru = message.guild.roles.cache.find(role => role.name === "Russian");
    const roletr = message.guild.roles.cache.find(role => role.name === "Turkish");

    const flagpt = '🇵🇹';
    const flagru = '🇷🇺';
    const flagtr = '🇹🇷';
    if (reaction.message.partial) await reaction.message.fetch();
    if (reaction.partial) await reaction.fetch();
    if (user.bot) return;
    if (!reaction.message.guild) return;
    if (reaction.message.channel.id == channel) {
        if (reaction.emoji.name === flagpt) {
            await reaction.message.guild.members.cache.get(user.id).roles.add(rolept);
        }
        if (reaction.emoji.name === flagru) {
            await reaction.message.guild.members.cache.get(user.id).roles.add(roleru);
        }
        if (reaction.emoji.name === flagtr) {
            await reaction.message.guild.members.cache.get(user.id).roles.add(roletr);
        }
    } else {
        return;
    }

};
