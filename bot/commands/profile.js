/**
 * Created by Tom on 7/29/2017.
 */
//todo add a way to see aother users profile on tag
exports.run = async(client, message) => {
    let user = await client.getUser(message.author.id);
    message.channel.send({
        embed: {
            color: client.getRandomColor(),
            author: {
                name: "Profile for " + message.author.username,
                icon_url: client.user.avatarURL
            },
            thumbnail: {
                url: message.author.displayAvatarURL
            },
            fields: [{
                name: "Level ",
                value: user.level
            },
                {
                    name: "Total experience ",
                    value: user.exp
                }, {
                    name: "Total nekos caught "+await client.nekoc(),
                    value: user.nekosall
                },{
                    name: "Current nekos "+await client.nekov(),
                    value: user.nekos
                }
            ],
            timestamp: new Date(),
            footer: {
                text: "Profile for " + message.author.username
            }
        }
    }).catch(e => console.warn('wew tf happened here ' + e));
};