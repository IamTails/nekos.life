/**
 * Created by Tom on 8/2/2017.
 */
exports.run = async (bot, message, args) => {

    if (!bot.owners.includes(message.author.id)) return;
    message.channel.send("delete timeout?").then(m=>m.delete(6000))

}