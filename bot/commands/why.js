exports.run = async (bot, message) => {
    let stats = await bot.getStats();
    stats.why++;
    bot.saveStats(stats);
    await bot.snekfetch.get('https://nekos.life/api/why')
        .then(r => message.channel.send({
            embed: {
                color: bot.getRandomColor(),
                author: {
                    name: "Why? \\o/",
                    icon_url: bot.user.avatarURL
                },fields: [
                    {
                        name: message.author.username + "Asks ",
                        value: r.body.why
                    }]
            }
        }).catch(e => console.warn('wew tf happened here ' + e)));

};
