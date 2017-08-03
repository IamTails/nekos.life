/**
 * Created by Tom on 8/2/2017.
 */
exports.run = async (client, message, args) => {
    if (!client.owners.includes(message.author.id)) return;
    if (args < 1) return message.reply(" :x: missing args.");
    await client.r.db("neko").table('guilds').get(message.guild.id).update({"prefix":args[0]}).run(client.connection, function(err, result) {
        if (err) throw err;
    });
    await message.reply(`Your guild prefix has been set to ${args[0]}`);
};