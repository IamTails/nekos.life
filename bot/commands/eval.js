/**
 * Created by Tom on 7/29/2017.
 */
exports.run = (client, message, args) => {
    if (!client.owners.includes(message.author.id)) return;
    try {
        const code = args.join(" ");
        let evaled = eval(code);

        if (typeof evaled !== "string")
            evaled = require("util").inspect(evaled);

        client.snekfetch.post(`http://feed-the-wump.us/documents`)
            .send(client.clean(evaled))
            .then(hb => {
                message.channel.send({
                    embed: {
                        color: client.getRandomColor(),
                        author: {
                            name: "eval",
                            icon_url: client.user.avatarURL
                        },
                        fields: [
                            {
                                name: "Result",
                                value: client.clean(evaled),
                            }, {
                                name: "wumpus",
                                value: "https://feed-the-wump.us/" + hb.body.key
                            }]
                    }
                }).catch(err => {
                    client.snekfetch.post(`http://feed-the-wump.us/documents`)
                        .send(client.clean(evaled))
                        .then(hb => {
                            message.channel.send({
                                embed: {
                                    color: client.getRandomColor(),
                                    author: {
                                        name: "eval",
                                        icon_url: client.user.avatarURL
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
        client.snekfetch.post(`http://feed-the-wump.us/documents`)
            .send(client.clean(err))
            .then(hb => {
                message.channel.send({
                    embed: {
                        color: client.getRandomColor(),
                        author: {
                            name: "eval",
                            icon_url: client.user.avatarURL
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

