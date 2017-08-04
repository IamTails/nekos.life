/**
 * Created by Tom on 7/29/2017.
 */
exports.run = async (bot, message) => {
    let stats = await bot.getStats();
    stats.lewd++;
    bot.saveStats(stats);
    if (message.channel.nsfw) {
        await bot.snekfetch.get('https://nekos.life/api/lewd/neko')
            .then(r => message.channel.send({
                embed: {
                    color: bot.getRandomColor(),
                    author: {
                        name: "Lewd Nekos >.<",
                        icon_url: bot.user.avatarURL
                    },
                    image: {
                        url: r.body.neko
                    }
                }
            }).catch(e => console.warn('wew tf happened here ' + e)));

    } else {
       await message.channel.send({
            embed: {
                color: bot.getRandomColor(),
                author: {
                    name: bot.user.username,
                    icon_url: bot.user.avatarURL
                },
                description: "o.O lewd nekos are shy they can only be found in discord NSFW channels. mew!"
            }
        }).catch(e => console.warn('wew tf happened here ' + e))
    }
};

