/**
 * Created by Tom on 7/29/2017.
 */

exports.run = async(bot) => {
    const Discord = require('discord.js');
    const moment = require('moment');
    console.log("booted on "+moment().format('MMMM Do YYYY, h:mm:ss a'));
    bot.updateLists();
    await bot.upVotes();
    console.log("upvotes "+bot.votes);
    bot.user.setGame(`~help | Guilds: ${bot.guilds.size} | Users: ${bot.users.filter(g => !g.bot).size}` ).catch(e => console.warn('wew tf happened here ' + e));
    console.log("Logged in as "+bot.user.tag);
    console.log("" +
        "prefix "+bot.prefix);
    console.log(`Status set to: ~help | Guilds: ${bot.guilds.size} | Users: ${bot.users.filter(g => !g.bot).size}` );
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
