/**
 * Created by Tom on 7/29/2017.
 */
exports.run = async (bot, message, args) => {
    if (!bot.owners.includes(message.author.id)) return;
    try {
        const code = args.join(" ");
        let evaled = await eval(code);
        if (typeof evaled !== "string")
            evaled = require("util").inspect(evaled);
        bot.snekfetch.post(`http://feed-the-wump.us/documents`)
            .send(bot.clean(evaled))
            .then(hb => {
                message.channel.send({
                    embed: {
                        color: bot.getRandomColor(),
                        author: {
                            name: "eval",
                            icon_url: bot.user.avatarURL
                        },
                        fields: [
                            {
                                name: "Result",
                                value: bot.clean(evaled),
                            }, {
                                name: "wumpus",
                                value: "https://feed-the-wump.us/" + hb.body.key
                            }]
                    }
                }).catch(err => {
                    bot.snekfetch.post(`http://feed-the-wump.us/documents`)
                        .send(bot.clean(evaled))
                        .then(hb => {
                            message.channel.send({
                                embed: {
                                    color: bot.getRandomColor(),
                                    author: {
                                        name: "eval",
                                        icon_url: bot.user.avatarURL
                                    },
                                    fields: [
                                        {
                                            name: "wumpus",
                                            value: "https://feed-the-wump.us/" + hb.body.key
                                        }]
                                }
                            })
                        });
                })
            })
    } catch (err) {
        bot.snekfetch.post(`http://feed-the-wump.us/documents`)
            .send(bot.clean(err))
            .then(hb => {
                message.channel.send({
                    embed: {
                        color: bot.getRandomColor(),
                        author: {
                            name: "eval",
                            icon_url: bot.user.avatarURL
                        },
                        fields: [{
                            name: "wumpus",
                            value: "https://feed-the-wump.us/" + hb.body.key
                        }]
                    }
                })
            })
    }
};

