/**
 * Created by Tom on 8/2/2017.
 */
exports.run = (client, message) => {
    client.r.db("neko").table('guilds').insert({"id": message.guild.id,"prefix":client.prefix,"nekochannel":null},{conflict: "replace"}).run(client.connection, function(err, result) {
        if (err) throw err;
        console.log(JSON.stringify(result, null, 2));
    })



};
