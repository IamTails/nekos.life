/**
 * Created by Tom on 7/29/2017.
 */
//todo add a way to see aother users profile on tag
exports.run = async(bot, message) => {
    let member = message.mentions.members.first();
    let user = await bot.getUser(message.author.id);
    if(!member) {
        message.channel.send({
            embed: {
                color: bot.getRandomColor(),
                author: {
                    name: "Profile for " + message.author.username,
                    icon_url: bot.user.avatarURL
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
                        name: "Total nekos caught " + await bot.nekoc(),
                        value: user.nekosall
                    }, {
                        name: "Current nekos " + await bot.nekov(),
                        value: user.nekos
                    }, {
                        name: "Date registered",
                        value: user.regdate
                    }
                ],
                timestamp: new Date(),
                footer: {
                    text: "Profile for " + message.author.username
                }
            }
        }).catch(e => console.warn('wew tf happened here ' + e));
    }else{
        memberi = await bot.getUser(member.id);
        message.channel.send({
        embed: {
            color: bot.getRandomColor(),
            author: {
                name: "Profile for " + member.user.username,
                icon_url: bot.user.avatarURL
            },
            thumbnail: {
                url: member.user.displayAvatarURL
            },
            fields: [{
                name: "Level ",
                value: memberi.level
            },
                {
                    name: "Total experience ",
                    value: memberi.exp
                }, {
                    name: "Total nekos caught " + await bot.nekoc(),
                    value: memberi.nekosall
                }, {
                    name: "Current nekos " + await bot.nekov(),
                    value: memberi.nekos
                }, {
                    name: "Date registered",
                    value: memberi.regdate
                }
            ],
            timestamp: new Date(),
            footer: {
                text: "Profile for " + member.user.username
            }
        }
    }).catch(e => console.warn('wew tf happened here ' + e));}
};