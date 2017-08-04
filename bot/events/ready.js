/**
 * Created by Tom on 7/29/2017.
 */
exports.run = (bot) => {
    const Discord = require('discord.js');
    const moment = require('moment');

    bot.snekfetch.post(`https://discordbots.org/api/bots/334186716770598912/stats`)
        .set('Authorization', bot.config.dblkey)
        .send({server_count: bot.guilds.size})
        .then(r => console.log(r.status + ' for dbl guild count of ' + bot.guilds.size))
        .catch(e => console.warn('wew tf happened here ' + e + ' for dbl post guild count of ' + bot.guilds.size));
    bot.snekfetch.post(`https://bots.discord.pw/api/bots/334186716770598912/stats`)
        .set('Authorization', bot.config.dbotskey)
        .send({server_count: bot.guilds.size})
        .then(r => console.log('status : ' + r.status + ' for dbots guild count of ' + bot.guilds.size))
        .catch(e => console.warn('wew tf happened here ' + e + ' for dbots post guild count of ' + bot.guilds.size));
    bot.user.setGame(`With Nekos \\o/`).catch(e => console.warn('wew tf happened here ' + e));
    bot.channels.get("334471388289302539").send({
        embed: {
            color: bot.getRandomColor(),
            title: "I restarted",
            author: {
                name: bot.user.username,
                icon_url: bot.user.avatarURL
            }
            ,
            fields: [
                {
                    name: "Guilds",
                    value: bot.guilds.size
                    , inline: true
                },
                {
                    name: "Users",
                    value: bot.users.filter(g => !g.bot).size, inline: true
                },
                {
                    name: "Bots",
                    value: bot.users.filter(g => g.bot).size, inline: true
                }, {
                    name: "Ping",
                    value: bot.ping.toFixed(0) + 'ms', inline: true
                },

                {
                    name: "Ram used",
                    value: `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB`, inline: true
                },
                {
                    name: "Version info",
                    value: "**Node**: " + process.version + " **D.js**: " + Discord.version, inline: true

                }, {
                    name: "Bringing you Nekos since"
                    , value: moment(bot.user.createdAt).format('LLLL'), inline: true
                }
            ],
            timestamp: new Date(),
        }

    }).catch(e => console.warn('wew tf happened here ' + e));
    console.log(`Ready to serve on ${bot.guilds.size} servers, for ${bot.users.size} users.`);
};
