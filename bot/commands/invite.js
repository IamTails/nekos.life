/**
 * Created by Tom on 7/29/2017.
 */
exports.run = (bot, message) => {
    message.channel.send({
        embed: {
            color: bot.getRandomColor(),
            fields: [{
                name: "Support Guild",
                value: "[Support Guild click here](https://discord.gg/Edw4FhF)"
            },
                {
                    name: "Bot",
                    value: "[oauth click here](https://discordapp.com/oauth2/authorize?client_id=334186716770598912&scope=bot&permissions=16384)"
                }
            ],
            timestamp: new Date(),
            footer: {
                text: "Links requested by " + message.author.username
            }
        }
    }).catch(e => console.warn('wew tf happened here ' + e));
};