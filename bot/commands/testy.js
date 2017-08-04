/**
 * Created by Tom on 8/2/2017.
 */
exports.run = async (bot, message, args) => {

    if (!bot.owners.includes(message.author.id)) return;

    bot.guilds.map(g =>
        bot.r.db("neko").table('guilds').insert({
            "id": g.id,
            "prefix": bot.prefix,
            "nekochannel": null,
            "msgcnt":0,

        }, {conflict: "update"}).run(bot.connection, function (err, result) {
            if (err) throw err;
            console.log(result)
        }))
    };