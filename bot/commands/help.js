/**
 * Created by Tom on 7/29/2017.
 */
exports.run = (client, message, args) => {
    function getRandomColor() {

        let letters = '0123456789';
        let color = '';
        for (let i = 0; i < 7; i++) {
            color += letters[Math.floor(Math.random() * 10)];
        }

        return color;
    }

    const fs = require("fs");
    let stats = JSON.parse(fs.readFileSync("./stats.json", "utf8"));
    stats.help++;
    fs.writeFile("./stats.json", JSON.stringify(stats), (err) => {
        if (err) console.error(err)
    });
    message.channel.send({
        embed: {
            color: getRandomColor(),
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
                },
                {
                    name: "**~**stats",
                    value: "Shows the stats ^^"
                }, {
                    name: "**~**invite",
                    value: "bot and support guild links."
                }, {
                    name: "Times help used since",
                    value: stats.help, inline: true
                }
            ],

            timestamp: new Date(),
            footer: {
                text: "Help requested by " + message.author.username
            }
        }
    }).catch(e => console.warn('wew tf happened here ' + e))
};