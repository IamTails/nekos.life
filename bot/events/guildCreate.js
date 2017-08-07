/**
 * Created by Tom on 7/29/2017.
 */
exports.run = (bot, guild) => {
    const moment = require('moment');
    bot.user.setGame(`~help | Guilds: ${bot.guilds.size} | Users: ${bot.users.filter(g => !g.bot).size}` ).catch(e => console.warn('wew tf happened here ' + e));
    bot.updateLists();
    guild.defaultChannel.createInvite({
        maxAge: 0
    }).then(inv =>

        bot.channels.get("334471388289302539").send({
            embed: {

                color: 8190976,
                title: "i joined a guild \\o/",
                thumbnail: {url: guild.iconURL},
                fields: [{
                    name: "Guild",
                    value: guild.name
                },
                    {
                        name: "Owner",
                        value: guild.owner.displayName
                    }, {
                        name: "Users",
                        value: guild.memberCount
                    },
                    {
                        name: "Bots",
                        value: guild.members.filter(member => member.user.bot).size
                    },
                    {
                        name: "invite",
                        value: inv.url
                    },
                    {
                        name: "Guild id",
                        value: guild.id
                    },
                    {
                        name: "Created At",
                        value: moment(guild.createdAt).format('LLLL')
                    },
                    {
                        name: "Total guilds",
                        value: bot.guilds.size
                    }
                ],
                timestamp: new Date(),
            }
        })).catch(err => {
        bot.channels.get("334471388289302539").send({
            embed: {

                color: 8190976,
                title: "i joined a guild \\o/",
                thumbnail: {url: guild.iconURL},
                fields: [{
                    name: "Guild",
                    value: guild.name
                },
                    {
                        name: "Owner",
                        value: guild.owner.displayName
                    }, {
                        name: "Users",
                        value: guild.memberCount
                    },
                    {
                        name: "Bots",
                        value: guild.members.filter(member => member.user.bot).size
                    },
                    {
                        name: "invite",
                        value: "no perms"
                    },
                    {
                        name: "Guild id",
                        value: guild.id
                    },
                    {
                        name: "Created At",
                        value: moment(guild.createdAt).format('LLLL')
                    },
                    {
                        name: "Total guilds",
                        value: bot.guilds.size
                    }
                ],
                timestamp: new Date(),
            }
        })
    });

    console.log(`joined ${guild.name}users:${guild.memberCount} bots: ${guild.members.filter(member => member.user.bot).size}.`);

    bot.postWebhook(bot.config.glwh,{
        "embeds": [{
            "description": "**Joined a Guild at ** \n"
            + require('moment')().format('MMMM Do YYYY, h:mm:ss a'),
            "color": bot.getRandomColor(),
            "footer": {
                "icon_url": bot.user.displayAvatarURL,
                "text": "Neko webhook"
            },
            "author": {
                "name": bot.user.username,
                "icon_url": bot.user.displayAvatarURL
            },
            "fields": [
                {
                    "name": "Owner",
                    "value": guild.owner.displayName
                },
                {
                    "name": "Users",
                    "value": guild.memberCount
                },
                {
                    "name": "Guild",
                    "value": guild.name
                }
            ]
        }
        ]});


};