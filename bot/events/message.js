/**
 * Created by Tom on 7/30/2017.
 */let cnt = 0;
exports.run = async (client, message) => {
//bot?
    if (message.author.bot) return;
//dm?
    if (message.channel.type !== "text") return message.reply("you can only play with me in a Guild, nya~");
//have a neko^^
//todo wew this is fucked
    if (await client.nekoChannel(message.guild.id).catch() !== null && await client.nekoChannel(message.guild.id) === message.channel.id) {
        cnt++;
        console.log(cnt);
        if (cnt===5){ client.awaitReply(message,"neko?"); cnt = 0}
    }
//no guild? lets add it
    if (await client.getGuild(message.guild.id) === null)
        return client.r.db("neko").table('guilds').insert({
            "id": message.guild.id,
            "prefix": client.prefix,
            "nekochannel": null
        }, {conflict: "replace"}).run(client.connection, function (err, result) {
            if (err) throw err;
        });
//no user? lets add
    if (await client.getUser(message.author.id) === null) return client.r.db("neko").table('users').insert({
        "id": message.author.id,
        "nekosall": 0,
        "nekos": 0,
        "exp": 0,
        "level": 0
    }, {conflict: "update"}).run(client.connection, function (err, result) {
        if (err) throw err;
    });
//levels!gay right??
    let user = await client.getUser(message.author.id);
    user.exp++;
    let curLevel = Math.floor(0.1 * Math.sqrt(user.exp));
    if (curLevel > user.level) {
        user.level = curLevel;
    }
    client.saveUser(user);
//guild prefix
    let gp = await client.gprefix(message.guild.id);
    //if (message.content.startsWith("<@334186716770598912>")) message.reply('My prefix is `' + gp + '`\n`'
    //+ gp + 'help` to see my commands. Mew!!').catch(e => console.warn('wew tf happened here ' + e));
//got prefix?
    if (message.content.indexOf(gp) !== 0) return;
//got args??
    const args = message.content.slice(gp.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
//got command//
    try {
        let commandFile = require(`../commands/${command}.js`);
        commandFile.run(client, message, args);
    } catch (err) {
        console.error(" there was a err probly no command found we just going to log this to keep the console clear k" + err);
    }

};
