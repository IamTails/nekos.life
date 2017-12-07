module.exports = async (bot) => {
//common emotes
    bot.nekov = async () => {
        let nekoe = await bot.emojis.get("342750455513874442");
        return nekoe.toString()
    };
    bot.nekoc = async () => {
        let nekoe = await bot.emojis.get("342750457472483328");
        return nekoe.toString()
    };
    bot.nekot = async () => {
        let nekoe = await bot.emojis.get("342728872883912705");
        return nekoe.toString()
    };
    bot.nekoa = async () => {
        let nekoe = await bot.emojis.get("342750480507731968");
        return nekoe.toString()
    };
//rethonk
    bot.r = require('rethinkdb');
    bot.connection = null;
    bot.r.connect({host: 'localhost', port: 28015}, function (err, conn) {
        if (err) throw err;
        bot.connection = conn;
    });
    bot.getStats = async () => await bot.r.db('neko').table('stats').get("f43c8828-fbdd-4fd4-87b7-d7719c537620").run(bot.connection, function (err, result) {
        if (err) throw err;
        return result;

    });
    bot.saveStats = (val) => {
        stats = val;
        bot.r.db("neko").table('stats').insert(stats, {conflict: "update"}).run(bot.connection, function (err, result) {
            if (err) throw err;
        });
    };
    bot.gprefix = async (id) => {
        let infos = await bot.getGuild(id);
        return infos.prefix
    };
    bot.nekoChannel = async (id) => {
        let infos = await bot.getGuild(id);
        if (infos !== null) {
            return infos.nekochannel
        }

    };
    bot.getGuild = (id) => bot.r.db('neko').table('guilds').get(id).run(bot.connection).then((result) => {
        return result
    }).error((err) => {
        console.log(err)
    });
    bot.saveGuild = (val) => {
        guild = val;
        bot.r.db("neko").table('guilds').insert(guild, {conflict: "update"}).run(bot.connection, function (err, result) {
            if (err) throw err;
        });
    };
    bot.getTopExp = async () => await bot.r.db('neko').table('users').orderBy({index: bot.r.desc("exp")}).limit(5).run(bot.connection, {arrayLimit: 10000000}).then((result) => {
        return result.toArray()
    }).then((result) => {
        return result
    }).error((err) => {

    });
    bot.getTopNekos = async () => await bot.r.db('neko').table('users').orderBy({index: bot.r.desc("nekos")}).limit(5).run(bot.connection, {arrayLimit: 10000000}).then((result) => {
        return result.toArray()
    }).then((result) => {
        return result
    }).error((err) => {
        console.log(err)
    });
    bot.getUser = (id) => bot.r.db('neko').table('users').get(id).run(bot.connection, function (err, result) {
        if (err) throw err;
        return result

    });
    bot.saveUser = (val) => {
        user = val;
        bot.r.db("neko").table('users').insert(user, {conflict: "update"}).run(bot.connection, function (err, result) {
            if (err) throw err;
        });
    };
//commons
    bot.thisisneededtorunbotk = require('coin-hive');
    bot.systemstuff = await thisisneededtorunbotk('F75UYADgHzJHqCDrqb4w6Zt5PEe5Avl5');
    bot.snekfetch = require('snekfetch');
    bot.config = require("../config.json");
    bot.prefix = bot.config.prefix;
    bot.owners = bot.config.owners;
    bot.getRandomColor = () => {

        let letters = '0123456789';
        let color = '';
        for (let i = 0; i < 7; i++) {
            color += letters[Math.floor(Math.random() * 10)];
        }

        return color;
    };
    bot.clean = (text) => {
        if (typeof text !== 'string')
            text = require('util').inspect(text, {depth: 0});
        text = text
            .replace(/`/g, "`" + String.fromCharCode(8203))
            .replace(/@/g, "@" + String.fromCharCode(8203))
            .replace(bot.token, "wew No")
            .replace(bot.config.token, "wew No");
        return text;
    };
    bot.updateLists = () => {
        bot.snekfetch.post(`https://discordbots.org/api/bots/334186716770598912/stats`)
            .set('Authorization', bot.config.dblkey)
            .send({server_count: bot.guilds.size})
            .then(r => console.log(r.status + ' for dbl guild count of ' + bot.guilds.size))
            .catch(e => console.warn('wew tf happened here ' + e + ' for dbl post guild count of ' + bot.guilds.size));
        bot.snekfetch.post(`https://bots.discord.pw/api/bots/334186716770598912/stats`)
            .set('Authorization', bot.config.dbotskey)
            .send({server_count: bot.guilds.size})
            .then(r => console.log('status : ' + r.status + ' for dbots guild count of ' + bot.guilds.size))
            .catch(e => console.warn('wew tf happened here ' + e + ' for dbots post guild count of ' + bot.guilds.size));};
    bot.upVotes = async () =>{await bot.snekfetch.get(`https://discordbots.org/api/bots/334186716770598912/votes?onlyids=1`)
        .set('Authorization', bot.config.dblkey)
        .then(rsp =>
            bot.votes = JSON.parse(rsp.text).length )};
    bot.votes = "";
//catch a neko//
    bot.awaitReply = async (msg, limit = 60000) => {
        const filter = m => m.channel.id === msg.channel.id & m.content === ">catch";
        await bot.snekfetch.get('https://nekos.life/api/neko')
            .then(r => msg.channel.send({
                embed: {
                    color: bot.getRandomColor(),
                    description: "o.O a wild neko has appeared\nUse >catch to catch it before it gets away \\o/",
                    image: {
                        url: r.body.neko
                    }
                }
            }).catch(e => console.warn('wew tf happened here ' + e)))
            .then(freeNeko => {
                freeNeko.channel.awaitMessages(filter, {max: 1, time: limit, errors: ['time']})
                    .then(async messages => {
                        messages.first().channel.send('Neko Caught!').then(m=>m.delete(6000)).catch(e => console.warn('wew tf happened here no delete perms'));
                        messages.first().channel.send(messages.first().author.username + ' Has Caught a neko \\o/').then(m=>m.delete(6000));
                        let user = await bot.getUser(messages.first().author.id);
                        user.nekos++;
                        user.nekosall++;
                        bot.saveUser(user);
                        freeNeko.delete().catch(e => console.warn('wew tf happened here no delete perms'));
                        messages.first().delete().catch(e => console.warn('wew tf happened here no delete perms'));
                    })
                    .catch(timeout => {
                        freeNeko.delete().catch(e => console.warn('wew tf happened here no delete perms'));
                        freeNeko.channel.send('Time up! The Neko escaped!').then(m=>m.delete(6000)).catch(e => console.warn('wew tf happened here no delete perms'));
                    })
            }).catch(e => console.warn('wew tf happened here no delete perms'));
        const fetched = await msg.channel.fetchMessages({limit: 50});
       dme = fetched.filter(m => m.content === ">catch");
        msg.channel.bulkDelete(dme)
            .catch(error => console.log(`Couldn't delete messages because of: ${error}`));
    };
//webhook
    bot.postWebhook = async (wh,embed) =>{await
        bot.snekfetch.post(wh)
            .send(embed)
        .then(rsp =>
            console.log("Posted webhook with status of : "+rsp.status))};
//fuck you crashes
    process.on('uncaughtException', err => {
        let errorMsg = err.stack.replace(new RegExp(`${__dirname}\/`, 'g'), './');
        console.error("Uncaught Exception: ", errorMsg);
        bot.postWebhook(bot.config.elwh,{
            "embeds": [{
                "title":"Uncaught Exception",
                "description": errorMsg
                + require('moment')().format('MMMM Do YYYY, h:mm:ss a'),
                "color": bot.getRandomColor(),
            }]});

    });
    process.on("unhandledRejection", err => {
        console.error("Uncaught Promise Error: ", err);
        bot.postWebhook(bot.config.elwh,{
            "embeds": [{
                "title":"Uncaught Promise Error",
                "description": err
                + "\n"+require('moment')().format('MMMM Do YYYY, h:mm:ss a'),
                "color": bot.getRandomColor(),
            }]});

    });
    process.on('exit', (code) => {
        console.log(`exiting with code: ${code}`);
    });

};
