/**
 * Created by Tom on 8/2/2017.
 */
exports.run = async (bot, message,) => {

    let user = await bot.getUser(message.author.id);
    if(user.nekos === 0) return message.reply(":x: o.O You don't have any Nekos to release :(");
    user.nekos--;
    bot.saveUser(user);
    bot.awaitReply(message);};