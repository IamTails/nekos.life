/**
 * Created by Tom on 7/29/2017.
 */
exports.run = async (bot, message) => {
    message.reply('Mew!!').catch(e => console.warn('wew tf happened here ' + e));
    let stats = await bot.getStats();
    stats.nya++;
    bot.saveStats(stats);
};