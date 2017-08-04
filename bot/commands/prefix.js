/**
 * Created by Tom on 8/2/2017.
 */
exports.run = async (client, message, args) => {
    //todo manage_server perms check
    if (!client.owners.includes(message.author.id)) return;
    if (args[0] === 'set') {
        console.log(args[1]);
        if (args[1] === undefined){return message.reply(" :x: missing args.")}
        await client.r.db("neko").table('guilds').get(message.guild.id).update({"prefix": args[1]}).run(client.connection, function (err, result) {
            if (err) throw err;
        });
        await message.reply(`Your guild prefix has been set to ${args[1]}`);
    }else {
        let gp = await client.gprefix(message.guild.id);
        await message.reply(`Your guild prefix is ${gp}`);

    }};