exports.run = async (client, message) => {
    let stats = await client.getStats();
    stats.why++;
    client.saveStats(stats);
    await client.snekfetch.get('https://nekos.life/api/why')
        .then(r => message.channel.send({
            embed: {
                color: client.getRandomColor(),
                author: {
                    name: "Why? \\o/",
                    icon_url: client.user.avatarURL
                },fields: [
                    {
                        name: message.author.username + "Asks ",
                        value: r.body.why
                    }]
            }
        }).catch(e => console.warn('wew tf happened here ' + e)));

};
