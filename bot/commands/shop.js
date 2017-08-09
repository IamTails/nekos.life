/**
 * Created by Tom on 8/6/2017.
 */
/**
 * Created by Tom on 8/2/2017.
 */
exports.run = (bot, message,args) => {

    if (!bot.owners.includes(message.author.id)) return;
    const x = args;
    switch (true)
    {
        default:
            message.channel.send({
                embed: {
                    color: bot.getRandomColor(),
                    fields: [{
                        name: "Shop",
                        value: "shop stuff here"
                    }
                    ],
                    timestamp: new Date(),
                    footer: {
                        text: "requested by " + message.author.username
                    }
                }
            }).catch(e => console.warn('wew tf happened here ' + e));
            break;
        case x[0] === 'buy' && x[1] === undefined:
            message.reply(" :x: missing args.");
            break;
        case x[0] === 'buy' && x[1] === "something":
            message.reply(`you got ${x[1]}`);
            break;
        case x[0] === 'buy' && x[1] === "something2":
            message.reply(`you got ${x[1]}`);
            break;
    }
};
