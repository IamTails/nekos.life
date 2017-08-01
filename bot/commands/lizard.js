/**
 * Created by Oliver(AnounFX™) on 8/01/2017.
 */
exports.run = (client, message) => {
    client.stats.lizard++;
    client.db(client.stats);
    client.snekfech.get(`https://discordbots.org/api/bots/${client.user.id}/votes?onlyids=1`)
    .set('Authorization', client.config.dblkey)
    .then(r => {
        if (!r.body.includes(message.author.id)) return message.reply(`hmmmm, you must upvote at https://discordbots.org/api/bots/${client.user.id}`);
        client.snekfetch.get('https://nekos.life/api/lizard')
        .then(r => message.channel.send({
            embed: {
                color: client.getRandomColor(),
                author: {
                    name: "Lizard \\o/",
                    icon_url: client.user.avatarURL
                },
                image: {
                    url: r.body.url
                }
            }
        }).catch(e => console.warn('wew tf happened here ' + e)));
    });

};