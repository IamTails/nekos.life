/**
 * Created by Tom on 7/29/2017.
 */
exports.run = (client, message, args) => {
    console.log(args);
    message.reply('Mew!!').catch(e => console.warn('wew tf happened here ' + e));
    client.stats.nya++;
    client.db(client.stats);
};