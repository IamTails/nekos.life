/**
 * Created by Tom on 7/29/2017.
 */
exports.run = (client, message) => {
    const moment = require('moment');
    const Discord = require('discord.js');
    require('moment-duration-format');
    client.stats.stats++;
    client.db(client.stats);
    client.snekfetch.get(`https://discordbots.org/api/bots/334186716770598912/votes?onlyids=1`)
        .set('Authorization', client.config.dblkey)
        .then(rsp => {
            message.channel.send({
                embed: {
                    color: client.getRandomColor(),
                    author: {
                        name: "Stats for " + client.user.username,
                        icon_url: client.user.avatarURL
                    },
                    fields: [
                        {
                            name: "Guilds",
                            value: client.guilds.size
                            , inline: true
                        },
                        {
                            name: "Users",
                            value: client.users.filter(g => !g.bot).size, inline: true
                        },
                        {
                            name: "Bots",
                            value: client.users.filter(g => g.bot).size, inline: true
                        }, {
                            name: "Ping",
                            value: client.ping.toFixed(0) + 'ms', inline: true
                        },
                        {
                            name: "Uptime"
                            ,
                            value: moment.duration(client.uptime).format('d[ days], h[ hours], m[ minutes, and ]s[ seconds]'),
                            inline: true
                        }, {
                            name: "Upvotes",
                            value: rsp.body.length, inline: true
                        },
                        {
                            name: "Ram used",
                            value: `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB`, inline: true
                        },
                        {
                            name: "Version info",
                            value: "**Node**: " + process.version + " **D.js**: " + Discord.version + " **Neko**: " + client.config.nekover,
                            inline: true

                        }, {
                            name: "Bringing you Nekos since"
                            , value: moment(client.user.createdAt).format('LLLL'), inline: true
                        },
                        {
                            name: "Times nya used",
                            value: client.stats.nya, inline: true
                        },

                        {
                            name: "Times stats used",
                            value: client.stats.stats, inline: true
                        },
                        {
                            name: "Times neko used",
                            value: client.stats.neko, inline: true
                        },
                        {
                            name: "Times lewd used",
                            value: client.stats.lewd, inline: true
                        },{
                            name: "Times kiss used",
                            value: client.stats.kiss, inline: true
                        },{
                            name: "Times hug used",
                            value: client.stats.hug, inline: true
                        },{
                            name: "Times pat used",
                            value: client.stats.pat, inline: true
                        }, {
                            name: "Times why used",
                            value: client.stats.why, inline: true
                        },

                        {
                            name: "Links",
                            value: "[WebSite](https://nekos.life) | [Upvote](https://discordbots.org/bot/334186716770598912) | [GitHub](https://github.com/TomsUsername/nekos.life/tree/master/bot) " +
                            "| [DBL](https://discordbots.org/bot/334186716770598912) | [Dbots](https://bots.discord.pw/bots/334186716770598912)"
                        }
                    ],

                    timestamp: new Date(),
                    footer: {
                        text: "Stats requested by " + message.author.username
                    }
                }
            })
        })
        .catch(e => console.warn('wew tf happened here ' + e)).catch(e => console.warn('wew tf happened here ' + e));
};
