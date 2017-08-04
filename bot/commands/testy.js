/**
 * Created by Tom on 8/2/2017.
 */
exports.run = async (client, message, args) => {

    if (!client.owners.includes(message.author.id)) return;

    client.guilds.map(g =>
        client.r.db("neko").table('guilds').insert({
            "id": g.id,
            "prefix": client.prefix,
            "nekochannel": null,
            "msgcnt":0,

        }, {conflict: "update"}).run(client.connection, function (err, result) {
            if (err) throw err;
            console.log(result)
        }))
    };