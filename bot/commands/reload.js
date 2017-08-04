/**
 * Created by Tom on 7/29/2017.
 */
exports.run = (bot, message, args) => {
    if (!bot.owners.includes(message.author.id)) return;
    if (args < 1) return message.reply(" :x: missing args.");
    delete require.cache[require.resolve(`./${args[0]}.js`)];
    message.reply(`${args[0]} has been reloaded :ok_hand:`);
};