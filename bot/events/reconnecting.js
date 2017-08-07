/**
 * Created by Tom on 7/29/2017.
 */
exports.run = () => {
    console.info("Reconnecting");
    bot.postWebhook(bot.config.bwh,{
        "embeds": [{
            "description": "**attempting to reconnect at ** \n"
            + require('moment')().format('MMMM Do YYYY, h:mm:ss a'),
            "color": bot.getRandomColor(),
            }]})};