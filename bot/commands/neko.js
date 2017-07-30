/**
 * Created by Tom on 7/29/2017.
 */
exports.run = (client, message) => {
    client.stats.neko++;
    client.db(client.stats);
    client.snekfetch.get('https://nekos.life/api/neko')
        .then(r => message.channel.send({
            embed: {
                color: client.getRandomColor(),
                author: {
                    name: "Nekos \\o/",
                    icon_url: client.user.avatarURL
                },
                image: {
                    url: r.body.neko
                }
            }
        }).catch(e => console.warn('wew tf happened here ' + e)));

};