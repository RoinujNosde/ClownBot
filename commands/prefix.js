const fs = require('fs');
const settings = require('../settings.json');


exports.run = (_client, msg, args) => {

  let newPrefix = args.join(' ');
  if (!newPrefix) {
    msg.channel.send("You have to enter a new prefix.").then(msg => { msg.delete({ timeout: 3000 }) });
    return false;
  }

  settings.prefix = newPrefix;
  fs.writeFileSync('settings.json', JSON.stringify(settings, null, 2));
  msg.channel.send("Prefix changed to `" + newPrefix + "`").then(msg => { msg.delete({ timeout: 10000 }) });
  msg.delete();

};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 2
};

exports.help = {
  name: 'prefix',
  description: 'Changes the prefix..',
  usage: 'prefix <prefix>'
};
