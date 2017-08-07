/**
 * Created by Tom on 7/29/2017.
 */
exports.run = (bot,r) => {
    console.info("resumed "+r);
    bot.postWebhook(bot.config.bwh,{
        "embeds": [{
            "description": "**Resumed at ** \n"
            + require('moment')().format('MMMM Do YYYY, h:mm:ss a'),
            "color": bot.getRandomColor(),
            }]})};