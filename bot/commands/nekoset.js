/**
 * Created by Tom on 8/2/2017.
 */
//todo perms check & way to disable
exports.run = async (bot, message, args) => {
    if (!bot.owners.includes(message.author.id)) return;

    await bot.r.db("neko").table('guilds').get(message.guild.id).update({"nekochannel":message.channel.id}).run(bot.connection, function(err, result) {
        if (err) throw err;
    });
    await message.reply(`nekos on`);
};