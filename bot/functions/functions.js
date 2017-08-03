
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
    client.awaitReply = async (msg, question, limit = 60000) => {
        const filter = m => m.author.id = msg.author.id;
        await msg.channel.send(question);
        try {
            const collected = await msg.channel.awaitMessages(filter, {max: 1, time: limit, errors: ['time']});
            return collected.first().content;
        } catch (e) {
            return false;
        }
    };
    client.answer = (msg, contents, options = {}) => {
        options.delay = (options.delay || 2000);
        if (msg.flags.includes("delme")) options.deleteAfter = true;
        options.deleteAfter = (options.deleteAfter || false);
        msg.edit(contents);
        if (options.deleteAfter) msg.delete({timeout: options.delay});
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

//fuck you crashes
    process.on('uncaughtException', err => {
        let errorMsg = err.stack.replace(new RegExp(`${__dirname}\/`, 'g'), './');
        console.error("Uncaught Exception: ", errorMsg);
    });
    process.on("unhandledRejection", err => {
        console.error("Uncaught Promise Error: ", err);
    });
};