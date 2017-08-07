/**
 * Created by Tom on 8/6/2017.
 */
/**
 * Created by Tom on 8/2/2017.
 */
exports.run = async (bot, message) => {

    if (!bot.owners.includes(message.author.id)) return;
    message.delete();};
