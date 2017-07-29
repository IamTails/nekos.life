exports.run = (client, message, args) => {
  function getRandomColor() {

        let letters = '0123456789';
        let color = '';
        for (let i = 0; i < 7; i++) {
            color += letters[Math.floor(Math.random() * 10)];
        }

        return color;
    }
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
        msg.reply(`wew set my prefix to ${param}.`)
      }
    } else {
      message.channel.send({
        embed: {
            color: getRandomColor(),
            author: {
                name: "Prefix for " + message.guild.name
                icon_url: message.guild.iconURL()
            },
            description: 'huh use ' + prefix[message.guild.id].prefix + 'help for my beautiful commands wew',
            timestamp: new Date(),
            footer: {
                text: "Help requested by " + message.author.username
            }
        }
    }).catch(e => console.warn('wew tf happened here ' + e))
    }
};
