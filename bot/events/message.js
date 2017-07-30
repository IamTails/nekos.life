/**
 * Created by Tom on 7/30/2017.
 */
exports.run = async (client, message) => {
    if (message.author.bot) return;
    if (message.content.startsWith("<@334186716770598912>")) message.reply('My prefix is `~`\n`~help` to see my commands. Mew!!').catch(e => console.warn('wew tf happened here ' + e));
    if (message.content.indexOf(client.prefix) !== 0) return;
    const args = message.content.slice(client.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    try {
        let commandFile = require(`../commands/${command}.js`);
        commandFile.run(client, message, args);
    } catch (err) {
        console.error(err);
    }
};
