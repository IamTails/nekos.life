/**
 * Created by Tom on 7/29/2017.
 */
exports.run = (client, message) => {
    client.stats.help++;
    client.db(client.stats);
    message.channel.send({
        embed: {
            color: client.getRandomColor(),
            author: {
                name: "Command Help for " + client.user.username,
                icon_url: client.user.avatarURL
            }, fields: [{
                name: "**~**nya",
                value: "pong!"
            },
                {
                    name: "**~**neko",
                    value: "Posts a random neko from [nekos.life](https://nekos.life) \\o/."
                }, {
                    name: "**~**lewd",
                    value: "Posts a random lewd neko from [nekos.life](https://nekos.life) o.o"
                },{
                    name: "**~**pat",
                    value: "Give someone a pat O.o"
                },{
                    name: "**~**hug",
                    value: "Give someone a hug o.O"
                },{
                    name: "**~**kiss",
                    value: "Give someone a kiss O.O"
                },
                {
                    name: "**~**stats",
                    value: "Shows the stats ^^"
                }, {
                    name: "**~**invite",
                    value: "bot and support guild links."
                }, {
                    name: "Times help used since",
                    value: client.stats.help, inline: true
                }
            ],

            timestamp: new Date(),
            footer: {
                text: "Help requested by " + message.author.username
            }
        }
    }).catch(e => console.warn('wew tf happened here ' + e))
};