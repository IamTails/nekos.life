/**
 * Created by Tom on 7/29/2017.
 */
exports.run = (client, message) => {
    client.stats.lewd++;
    client.db(client.stats);

    if (message.channel.nsfw) {
        client.snekfetch.get('https://nekos.life/api/lewd/neko')
            .then(r => message.channel.send({
                embed: {
                    color: client.getRandomColor(),
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
                color: client.getRandomColor(),
                author: {
                    name: client.user.username,
                    icon_url: client.user.avatarURL
                },
                description: "o.O lewd nekos are shy they can only be found in discord NSFW channels. mew!"
            }
        }).catch(e => console.warn('wew tf happened here ' + e))
    }
};

