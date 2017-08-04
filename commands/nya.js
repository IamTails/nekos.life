/**
 * Created by Tom on 7/29/2017.
 */
exports.run = async (client, message, args) => {
    message.reply('Mew!!').catch(e => console.warn('wew tf happened here ' + e));
    let stats = await client.getStats();
    stats.nya++;
    client.saveStats(stats);
};