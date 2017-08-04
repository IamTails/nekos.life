/**
 * Created by Tom on 7/29/2017.
 */
exports.run = async(bot, message,args) => {
    const moment = require('moment');
    const Discord = require('discord.js');
    require('moment-duration-format');
    let stats = await bot.getStats();
    stats.stats++;
    if (args[0] === 'commands') {
        bot.saveStats(stats);
        await bot.snekfetch.get(`https://discordbots.org/api/bots/334186716770598912/votes?onlyids=1`)
            .set('Authorization', bot.config.dblkey)
            .then(rsp => {
                message.channel.send({
                    embed: {
                        color: bot.getRandomColor(),
                        author: {
                            name: "Command stats for " + bot.user.username,
                            icon_url: bot.user.avatarURL
                        },
                        fields: [
                            {
                                name: "Times nya used",
                                value: stats.nya, inline: true
                            },

                            {
                                name: "Times stats used",
                                value: stats.stats, inline: true
                            },
                            {
                                name: "Times neko used",
                                value: stats.neko, inline: true
                            },
                            {
                                name: "Times lewd used",
                                value: stats.lewd, inline: true
                            }, {
                                name: "Times kiss used",
                                value: stats.kiss, inline: true
                            }, {
                                name: "Times hug used",
                                value: stats.hug, inline: true
                            }, {
                                name: "Times pat used",
                                value: stats.pat, inline: true
                            }, {
                                name: "Times why used",
                                value: stats.why, inline: true
                            }, {
                                name: "Times lizard used",
                                value: stats.lizard, inline: true
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
    }else {bot.saveStats(stats);
        await bot.snekfetch.get(`https://discordbots.org/api/bots/334186716770598912/votes?onlyids=1`)
            .set('Authorization', bot.config.dblkey)
            .then(rsp => {
                message.channel.send({
                    embed: {
                        color: bot.getRandomColor(),
                        author: {
                            name: "Stats for " + bot.user.username,
                            icon_url: bot.user.avatarURL
                        },
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
                                name: "Uptime"
                                ,
                                value: moment.duration(bot.uptime).format('d[ days], h[ hours], m[ minutes, and ]s[ seconds]'),
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
                                value: "**Node**: " + process.version + " **D.js**: " + Discord.version + " **Neko**: " + bot.config.nekover,
                                inline: true

                            }, {
                                name: "Bringing you Nekos since"
                                , value: moment(bot.user.createdAt).format('LLLL'), inline: true
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
            .catch(e => console.warn('wew tf happened here ' + e)).catch(e => console.warn('wew tf happened here ' + e));}
    };
