exports.run = (client, message, args) => {
  const config = require("../config.json");
    const path = require('path');
    const prefixes = path.join('../prefixes.json')
    const prefix = JSON.parse(fs.readFileSync(prefixes, 'utf8'));
    const param = args.slice(1).join(' ');
    const fs = require('fs');
  
    if (args[0] === ' set') {
      if (!prefix[message.guild.id]) prefix = {'prefix', config.prefix};
      if (param === 'default') {
        prefix[message.guild.id].prefix = config.prefix;
        fs.writeFileSync(prefixes, JSON.stringify(data, null, 2))
        msg.reply(`wew set my prefix back to ${config.prefix}.`)
      } else {
        prefix[message.guild.id].prefix = param;
        fs.writeFileSync(prefixes, JSON.stringify(data, null, 2))
        msg.reply('wew set my prefix to ${param}.`)
      }
    }
};
