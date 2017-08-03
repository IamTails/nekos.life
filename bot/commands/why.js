exports.run = (client, message) => {
    client.stats.why++;
    client.db(client.stats);
    client.snekfetch.get('https://nekos.life/api/why')
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
