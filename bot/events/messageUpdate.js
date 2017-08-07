/**
 * Created by Tom on 7/30/2017.
 */
exports.run = async (bot, OldMessage,message) => {
//bot?
    if (message.author.bot) return;
//dm?
    if (message.channel.type !== "text") return message.reply("you can only play with me in a Guild, nya~");
//guild prefix
    let gp = await bot.gprefix(message.guild.id);
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
        commandFile.run(bot, message, args);
    } catch (err) {
        console.error(" there was a err probly no command found we just going to log this to keep the console clear k" + err);
    }

};
