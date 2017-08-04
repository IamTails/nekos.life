/**
 * Created by Tom on 7/29/2017.
 */
exports.run = (client) => {
    const Discord = require('discord.js');
    const moment = require('moment');

    client.snekfetch.post(`https://discordbots.org/api/bots/334186716770598912/stats`)
        .set('Authorization', client.config.dblkey)
        .send({server_count: client.guilds.size})
        .then(r => console.log(r.status + ' for dbl guild count of ' + client.guilds.size))
        .catch(e => console.warn('wew tf happened here ' + e + ' for dbl post guild count of ' + client.guilds.size));
    client.snekfetch.post(`https://bots.discord.pw/api/bots/334186716770598912/stats`)
        .set('Authorization', client.config.dbotskey)
        .send({server_count: client.guilds.size})
        .then(r => console.log('status : ' + r.status + ' for dbots guild count of ' + client.guilds.size))
        .catch(e => console.warn('wew tf happened here ' + e + ' for dbots post guild count of ' + client.guilds.size));
    client.user.setGame(`With Nekos \\o/`).catch(e => console.warn('wew tf happened here ' + e));
    client.channels.get("334471388289302539").send({
        embed: {
            color: client.getRandomColor(),
            title: "I restarted",
            author: {
                name: client.user.username,
                icon_url: client.user.avatarURL
            }
            ,
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
                    name: "Ram used",
                    value: `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB`, inline: true
                },
                {
                    name: "Version info",
                    value: "**Node**: " + process.version + " **D.js**: " + Discord.version, inline: true

                }, {
                    name: "Bringing you Nekos since"
                    , value: moment(client.user.createdAt).format('LLLL'), inline: true
                }
            ],
            timestamp: new Date(),
        }

    }).catch(e => console.warn('wew tf happened here ' + e));
    console.log(`Ready to serve on ${client.guilds.size} servers, for ${client.users.size} users.`);


};
