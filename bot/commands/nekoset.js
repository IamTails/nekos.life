/**
 * Created by Tom on 8/2/2017.
 */
exports.run = async (client, message, args) => {
    if (!client.owners.includes(message.author.id)) return;

    await client.r.db("neko").table('guilds').get(message.guild.id).update({"nekochannel":message.channel.id}).run(client.connection, function(err, result) {
        if (err) throw err;
    });
    await message.reply(`nekos on`);
};