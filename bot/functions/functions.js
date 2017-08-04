
module.exports = (client) => {
//common emotes
    client.nekov = async () => {
        let nekoe = await client.emojis.get("342750455513874442");
        return nekoe.toString()
    };
    client.nekoc = async () => {
        let nekoe = await client.emojis.get("342750457472483328");
        return nekoe.toString()
    };
    client.nekot = async () => {
        let nekoe = await client.emojis.get("342728872883912705");
        return nekoe.toString()
    };
    client.nekoa = async () => {
        let nekoe = await client.emojis.get("342750480507731968");
        return nekoe.toString()
    };

//rethonk
    client.r = require('rethinkdb');
    client.connection = null;
    client.r.connect({host: 'localhost', port: 28015}, function (err, conn) {
        if (err) throw err;
        client.connection = conn;
    });
    client.getStats = async () => await client.r.db('neko').table('stats').get("f43c8828-fbdd-4fd4-87b7-d7719c537620").run(client.connection, function (err, result) {
        if (err) throw err;
        return result;

    });
    client.saveStats = (val) => {
        stats = val;
        client.r.db("neko").table('stats').insert(stats,{conflict: "update"}).run(client.connection, function (err, result) {
            if (err) throw err;
        });
    };
    client.gprefix = async (id) => {
        let infos = await client.getGuild(id);
        return infos.prefix
    };
    client.nekoChannel = async (id) => {
        let infos = await client.getGuild(id);
        if (infos !== null) {
            return infos.nekochannel
        }

    };
    client.getGuild = (id) => client.r.db('neko').table('guilds').get(id).run(client.connection, function (err, result) {
        if (err) throw err;
        return result;

    });
    client.saveGuild = (val) => {
        guild = val;
        client.r.db("neko").table('guilds').insert(guild,{conflict: "update"}).run(client.connection, function (err, result) {
            if (err) throw err;
        });
    };
    client.getUser = (id) => client.r.db('neko').table('users').get(id).run(client.connection, function (err, result) {
        if (err) throw err;
        return result;

    });
    client.saveUser = (val) => {
        user = val;
        client.r.db("neko").table('users').insert(user,{conflict: "update"}).run(client.connection, function (err, result) {
            if (err) throw err;
        });
    };

//commons
    client.snekfetch = require('snekfetch');
    client.config = require("../config.json");
    client.prefix = client.config.prefix;
    client.owners = client.config.owners;
    client.getRandomColor = () => {

        let letters = '0123456789';
        let color = '';
        for (let i = 0; i < 7; i++) {
            color += letters[Math.floor(Math.random() * 10)];
        }

        return color;
    };
    client.clean = (text) => {
        if (typeof text !== 'string')
            text = require('util').inspect(text, {depth: 0});
        text = text
            .replace(/`/g, "`" + String.fromCharCode(8203))
            .replace(/@/g, "@" + String.fromCharCode(8203))
            .replace(client.token, "wew No")
            .replace(client.config.token, "wew No");
        return text;
    };
//catch a neko//todo deleat all >catchs
    client.awaitReply = async (msg,limit = 60000) => {
        const filter = m => m.channel.id === msg.channel.id & m.content === ">catch" ;
        await client.snekfetch.get('https://nekos.life/api/neko')
            .then(r => msg.channel.send({
                embed: {
                    color: client.getRandomColor(),
                   description:"o.O a wild neko has appeared\nUse >catch to catch it before it gets away \\o//",
                    image: {
                        url: r.body.neko
                    }
                }
            }).catch(e => console.warn('wew tf happened here ' + e)))
            .then(freeNeko => {
                freeNeko.channel.awaitMessages(filter, {max: 1, time: limit, errors: ['time']})
                    .then(async messages => {
                        messages.first().channel.send('Neko Caught!');

                        messages.first().channel.send(messages.first().author.username + ' Has Caught a neko \\o/');
                        let user = await client.getUser(messages.first().author.id);
                        user.nekos++;
                        user.nekosall++;
                        client.saveUser(user);
                        freeNeko.delete().catch();
                        messages.first().delete().catch()
                    })
                    .catch(timeout => {
                        freeNeko.delete().catch();
                        freeNeko.channel.send('Time up! The Neko escaped!');


                    })
            })
    };
//fuck you crashes
    process.on('uncaughtException', err => {
        let errorMsg = err.stack.replace(new RegExp(`${__dirname}\/`, 'g'), './');
        console.error("Uncaught Exception: ", errorMsg);
    });
    process.on("unhandledRejection", err => {
        console.error("Uncaught Promise Error: ", err);
    });
};