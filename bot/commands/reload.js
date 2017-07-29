/**
 * Created by Tom on 7/29/2017.
 */
exports.run = (client, message, args) => {
    const config = require("../config.json");
    const owners = config.owners;
    if (!owners.includes(message.author.id)) return;
    if (args < 1) return message.reply(" :x: missing args.");
    // the path is relative to the *current folder*, so just ./filename.js
    delete require.cache[require.resolve(`./${args[0]}.js`)];
    message.reply(`${args[0]} has been reloaded :ok_hand:`);
};