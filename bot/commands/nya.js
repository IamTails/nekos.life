/**
 * Created by Tom on 7/29/2017.
 */
exports.run = (client, message, args) => {
    const fs = require("fs");
    let stats = JSON.parse(fs.readFileSync("./stats.json", "utf8"));
    message.reply('Mew!!').catch(e => console.warn('wew tf happened here ' + e));
    stats.nya++;
    fs.writeFile("./stats.json", JSON.stringify(stats), (err) => {
        if (err) console.error(err)
    });
};