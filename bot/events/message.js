/**
 * Created by Tom on 7/30/2017.
 */
exports.run = async (client, message) => {
    if (message.author.bot) return;
    if (message.channel.type !== "text") return message.reply("you can only play with me in a Guild, nya~");
    if (await client.getGuild(message.guild.id) === null)
        return client.r.db("neko").table('guilds').insert({"id": message.guild.id,"prefix":client.prefix,"nekochannel":null},{conflict: "replace"}).run(client.connection, function(err, result) {
            if (err) throw err;
            console.log("added guild to db");//JSON.stringify(result, null, 2));
        });
    let gp = await client.gprefix(message.guild.id);
    if (message.content.startsWith("<@334186716770598912>")) message.reply('My prefix is `'+ gp +'`\n`'
    +gp +'help` to see my commands. Mew!!').catch(e => console.warn('wew tf happened here ' + e));
    if (message.content.indexOf(gp) !== 0) return;
    const args = message.content.slice(gp.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    try {
        let commandFile = require(`../commands/${command}.js`);
        commandFile.run(client, message, args);
    } catch (err) {
        console.error(" there was a err probly no command found we just going to log this to keep the console clear k" + err);
    }

};
