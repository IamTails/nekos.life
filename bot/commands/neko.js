/**
 * Created by Tom on 7/29/2017.
 */
exports.run = async (bot, message) => {
    let stats = await bot.getStats();
    stats.neko++;
    bot.saveStats(stats);
    await bot.snekfetch.get('https://nekos.life/api/neko')
        .then(r => message.channel.send({
            embed: {
                color: bot.getRandomColor(),
                author: {
                    name: "Nekos \\o/",
                    icon_url: bot.user.avatarURL
                },
                image: {
                    url: r.body.neko
                }
            }
        }).catch(e => console.warn('wew tf happened here ' + e)));

};