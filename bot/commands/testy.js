/**
 * Created by Tom on 8/2/2017.
 */
exports.run = async (bot, message, args) => {

    if (!bot.owners.includes(message.author.id)) return;
    bot.postWebhook(bot.config.bwh,{
        "embeds": [{
        "description": "**Resumed at ** \n"
        + require('moment')().format('MMMM Do YYYY, h:mm:ss a'),
        "color": bot.getRandomColor(),
        "footer": {
            "icon_url": bot.user.displayAvatarURL,
            "text": "Neko webhook"
        },
        "author": {
            "name": bot.user.username,
            "icon_url": bot.user.displayAvatarURL
        }
        /*"fields": [
            {
                "name": bot.user.displayAvatarURL,
                "value": bot.user.displayAvatarURL
            },
            {
                "name": bot.user.displayAvatarURL,
                "value": bot.user.displayAvatarURL,
                "inline": true
            },
            {
                "name": bot.user.displayAvatarURL,
                "value":bot.user.displayAvatarURL,
                "inline": true
            }
        ]*/
    }
    ]}
    )

};