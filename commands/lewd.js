/**
 * Created by Tom on 7/29/2017.
 */
exports.run = async (client, message) => {
    let stats = await client.getStats();
    stats.lewd++;
    client.saveStats(stats);
    if (message.channel.nsfw) {
        await client.snekfetch.get('https://nekos.life/api/lewd/neko')
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
       await message.channel.send({
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

