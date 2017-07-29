/**
 * Created by Tom on 7/29/2017.
 */
exports.run = (client, guild) => {
    const moment = require('moment');
    const snekfetch = require('snekfetch');
    const config = require("../config.json");
    const path = require('path');
    const prefixes = path.join('./prefixes.json');
    const dblkey = config.dblkey;
    const dbotskey = config.dbotskey;
    snekfetch.post(`https://discordbots.org/api/bots/334186716770598912/stats`)
        .set('Authorization', dblkey)
        .send({server_count: client.guilds.size})
        .then(r => console.log(r.status + ' for dbl guild count of ' + client.guilds.size))
        .catch(e => console.warn('wew tf happened here ' + e + ' for dbl post guild count of ' + client.guilds.size));
    snekfetch.post(`https://bots.discord.pw/api/bots/334186716770598912/stats`)
        .set('Authorization', dbotskey)
        .send({server_count: client.guilds.size})
        .then(r => console.log('status : ' + r.status + ' for dbots guild count of ' + client.guilds.size))
        .catch(e => console.warn('wew tf happened here ' + e + ' for dbots post guild count of ' + client.guilds.size));
    client.user.setGame(`With Nekos \\o/`);


    guild.defaultChannel.createInvite({
        maxAge: 0
    }).then(inv =>

        client.channels.get("334471388289302539").send({
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
                        value: client.guilds.size
                    }
                ],
                timestamp: new Date(),
            }
        })).catch(err => { client.channels.get("334471388289302539").send({
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
                    value: client.guilds.size
                }
            ],
            timestamp: new Date(),
        }
    })});

    console.log(`joined ${guild.name}.`);
    
    const prefix = JSON.parse(fs.readFileSync(prefixes, 'utf8'));
    prefix.prefix = config.prefix;
    fs.writeFileSync(prefixes, JSON.stringify(data, null, 2))
};
