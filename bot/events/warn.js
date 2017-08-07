/**
 * Created by Tom on 7/29/2017.
 */
exports.run = (bot,e) => {
    console.info(e);
    bot.postWebhook(bot.config.elwh,{
        "embeds": [{
            "title":"error",
            "description": e
            + require('moment')().format('MMMM Do YYYY, h:mm:ss a'),
            "color": bot.getRandomColor(),
        }]});

};