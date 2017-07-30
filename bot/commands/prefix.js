exports.run = (client, message, args) => {
    const param = args.slice(1).join(' ');
  
    if (args[0] === ' set') {
      if (!prefix[message.guild.id]) prefix = {'prefix', config.prefix};
      if (param === 'default') {
        client.prefixes[message.guild.id].prefix = client.prefix;
        client.pdb(client.prefixes);
        msg.reply(`wew set my prefix back to **${config.prefix}**.`)
      } else {
        client.prefixes[message.guild.id].prefix = param;
        client.pdb(client.prefixes);
        msg.reply(`wew set my prefix to **${param}**.`)
      }
    } else {
      message.channel.send({
        embed: {
            color: client.getRandomColor(),
            author: {
                name: "Prefix for " + message.guild.name
                icon_url: message.guild.iconURL()
            },
            description: 'huh use ' + client.prefixes[message.guild.id].prefix + 'help for my beautiful commands wew',
            timestamp: new Date(),
            footer: {
                text: "Help requested by " + message.author.username
            }
        }
    }).catch(e => console.warn('wew tf happened here ' + e))
    }
};
