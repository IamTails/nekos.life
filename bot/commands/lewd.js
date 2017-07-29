/**
 * Created by Tom on 7/29/2017.
 */
exports.run = (client, message, args) => {
    const snekfetch = require('snekfetch');

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
    stats.lewd++;
    fs.writeFile("./stats.json", JSON.stringify(stats), (err) => {
        if (err) console.error(err)
    });

    if (message.channel.nsfw) {
        snekfetch.get('https://nekos.life/api/lewd/neko')
            .then(r => message.channel.send({
                embed: {
                    color: getRandomColor(),
                    author: {
                        name: "Lewd Nekos >.<",
                        icon_url: client.user.avatarURL
                    },
                    image: {
                        url: r.body.neko
                    }
                }
            }).catch(e => console.warn('wew tf happened here ' + e)));

    } else {
        message.channel.send({
            embed: {
                color: getRandomColor(),
                author: {
                    name: client.user.username,
                    icon_url: client.user.avatarURL
                },
                description: "o.O lewd nekos are shy they can only be found in discord NSFW channels. mew!"
            }
        }).catch(e => console.warn('wew tf happened here ' + e))
    }
};

