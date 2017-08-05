/**
 * Created by Tom on 8/2/2017.
 */
exports.run = async (bot, message, args) => {

    if (!bot.owners.includes(message.author.id)) return;

    //bot.users.map(g =>
        //bot.r.db("neko").table('users').insert({
            "id": message.author.id,
            "nekosall": 0,
            "nekos": 0,
            "exp": 0,
            "level": 0,
            "name":
        }, {conflict: "update"}).run(bot.connection, function (err, result) {
            if (err) throw err;
        }))
    };