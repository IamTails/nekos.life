/**
 * Created by Oliver(AnounFX™) on 8/01/2017.
 */
exports.run = async (bot, message) => {
    let stats = await bot.getStats();
    stats.lizard++;
    bot.saveStats(stats);
    await bot.snekfetch.get(`https://discordbots.org/api/bots/334186716770598912/votes?onlyids=1`)
        .set('Authorization', bot.config.dblkey)
        .then(rsp => {
        if (!rsp.body.includes(message.author.id)) return message.reply(`hmmmm, you must upvote at https://discordbots.org/api/bots/${bot.user.id}`);
    bot.snekfetch.get('https://nekos.life/api/lizard')
    .then(r => message.channel.send({
        embed: {
            color: bot.getRandomColor(),
            author: {
                name: "Lizard \\o/",
                icon_url: bot.user.avatarURL
            },
            image: {
                url: r.body.url
            }
        }
    }).catch(e => console.warn('wew tf happened here ' + e)));
        });

};