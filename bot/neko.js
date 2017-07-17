/*
 Created by ℭrystaℒ on 7/10/2017.
 */
//consts
const snekfetch = require('snekfetch');
const Discord = require('discord.js');
const client = new Discord.Client();
const moment = require('moment');
// r = require('rethinkdb');
const dprefix = "~";
const prefix = "~";
const dblkey = "Owo";
const token = 'Whats';
const owners = ["326080439662149633", "312238004653785088","139800365393510400"];
const dbotskey = 'This';
const clean = text => {
    if (typeof(text) === "string")

        return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    else
        return text;
};
//vars
let nyac = 0;
let helpc = 0;
let lewdc = 0;
let statsc = 0;
let nekoc = 0;
let voters = "";
let link = "No perms";
//funcs
/*
r.connect( {host: 'localhost', port: 28015}, function(err, conn) {
    if (err) throw err;
    const connection = conn;
});
r.db('neko').tableCreate('prefixs').run(connection, function(err, result) {
    if (err) throw err;
    console.log(JSON.stringify(result, null, 2));
});
function getPrefix(guildID) {
r.table('prefix').get(guildID).
run(connection, function(err, result) {
    if (err) return dprefix;
    return result;
})}
*/
function getRandomColor() {

    let letters = '0123456789';
    let color = '';
    for (let i = 0; i < 7; i++) {
        color += letters[Math.floor(Math.random() * 10)];
    }

    return color;
}
function nya() {
    nyac += 1;
}
function help() {
    helpc += 1;
}
function lewd() {
    lewdc += 1;
}
function neko() {
    nekoc += 1;
}
function stats() {
    statsc += 1;
}
function getVotes() {
snekfetch.get(`https://discordbots.org/api/bots/334186716770598912/votes?onlyids=1`)
 .set('Authorization', dblkey)
 .then(rsp => {voters = rsp.body})
 .catch(e => console.warn('wew tf happened here ' + e ));
return voters;
}
function getInvite(guild) {
    guild.defaultChannel.createInvite({
        maxAge: 0
    }).then(rsp => {
        link = rsp.url
    })
        .catch(e => {link = "no perms"; console.warn('wew tf happened here ' + e)});
    return link;
}
//errors
client.on("error", (e) => console.warn(e));
client.on("warn", (e) => console.warn(e));
/*client.on("debug", (e) => console.info(e));*/
//ready
client.on('ready', () => {
    snekfetch.post(`https://discordbots.org/api/bots/334186716770598912/stats`)
        .set('Authorization', dblkey)
        .send({server_count: client.guilds.size})
        .then(r => console.log(r.status + ' for dbl guild count of ' + client.guilds.size))
        .catch(e => console.warn('wew tf happened here ' + e + ' for dbl post guild count of ' + client.guilds.size));
    snekfetch.post(`https://bots.discord.pw/api/bots/334186716770598912/stats`)
        .set('Authorization', dbotskey)
        .send({server_count: client.guilds.size})
        .then(r => console.log('status : ' + r.status + ' for dbots guild count of ' + client.guilds.size))
        .catch(e => console.warn('wew tf happened here ' + e + ' for dbots post guild count of ' + client.guilds.size));
    client.user.setGame(`With Nekos \\o/`);
    //TODO
    //fucked up hacky thing to make votes not 0 on first ~stats use idefk
    console.log('wew '+ getVotes().length); //this prints nothing but with out it ~stats is 0 ?????
    client.channels.get("334471388289302539").send({
        embed: {
            color: getRandomColor(),
            title: "I restarted",
            fields: [{
                name: "Guilds",
                value: client.guilds.size
            },
                {
                    name: "Users",
                    value: client.users.filter(g => !g.bot).size
                },
                {
                    name: "Bots",
                    value: client.users.filter(g => g.bot).size
                }
            ],
            timestamp: new Date(),
        }

    });
    console.log(`Ready to serve on ${client.guilds.size} servers, for ${client.users.size} users.`);

});

//Nya
client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    if (message.content.startsWith(prefix + "nya")) {
        message.reply('Mew!!');
       nya();

    }
});
//help
client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    if (message.content.startsWith(prefix + "help")) {
        help();
        message.channel.send({
            embed: {
                color: getRandomColor(),
                author: {
                    name: "Command Help for " + client.user.username,
                    icon_url: client.user.avatarURL
                }, fields: [{
                    name: "**~**nya",
                    value: "pong!"
                },
                    {
                        name: "**~**neko",
                        value: "Posts a random neko from [nekos.life](https://nekos.life) \\o/."
                    },{
                        name: "**~**lewd",
                        value: "Posts a random lewd neko from [nekos.life](https://nekos.life) o.o"
                    },
                    {
                        name: "**~**stats",
                        value: "Shows the stats ^^"
                    },{
                        name: "**~**invite",
                        value: "bot and support guild links."
                    }
                ],

                timestamp: new Date(),
                footer: {
                    text: "Help requested by " + message.author.username
                }
            }
        })
    }

});
//neko
client.on('message', message => {

    if (!message.content.startsWith(prefix) || message.author.bot) return;
    if (message.content.startsWith(prefix + "neko")) {
        neko();

        snekfetch.get('https://nekos.life/api/neko')
            .then(r => message.channel.send({
                embed: {
                    color: getRandomColor(),
                    author: {
                        name: "Nekos \\o/",
                        icon_url: client.user.avatarURL
                    },
                    image: {
                        url: r.body.neko
                    }
                }
            }));

    }});
//lewd
client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    if (message.content.startsWith(prefix + "lewd")) {
        lewd();
        if (message.channel.nsfw) {
            snekfetch.get('https://nekos.life/api/lewd/neko')
                .then(r => message.channel.send({
                    embed: {
                        color: getRandomColor(),
                        author: {
                            name: "Lewd Nekos >.<",
                            icon_url: client.user.avatarURL
                        },
                        image: {
                            url: r.body.neko
                        }
                    }
                }));

        } else {
            message.channel.send({
                embed: {
                    color: getRandomColor(),
                    author: {
                        name: client.user.username,
                        icon_url: client.user.avatarURL
                    },
                    description: "o.O lewd nekos are shy they can only be found in discord NSFW channels. mew!"
                }
            })
        }
    }

});
//invite
client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    if (message.content.startsWith(prefix + "invite")) {
        message.channel.send({
            embed: {
                color: getRandomColor(),
                fields: [{
                    name: "Support Guild",
                    value: "[Support Guild click here](https://discord.gg/Edw4FhF)"
                },
                    {
                        name: "Bot",
                        value: "[oauth click here](https://discordapp.com/oauth2/authorize?client_id=334186716770598912&scope=bot&permissions=16384)"
                    }
                ],
                timestamp: new Date(),
                footer: {
                    text: "Links requested by " + message.author.username
                }
            }
        })
    }
});
//stats
client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    if (message.content.startsWith(prefix + "stats")) {
        message.channel.send({
            embed: {
                color: getRandomColor(),
                author: {
                    name: "Stats for " + client.user.username,
                    icon_url: client.user.avatarURL
                },
                fields: [
                    {
                        name: "Guilds",
                        value: client.guilds.size
                    },
                    {
                        name: "Users",
                        value: client.users.filter(g => !g.bot).size
                    },
                    {
                        name: "Bots",
                        value: client.users.filter(g => g.bot).size
                    },{
                        name: "ping",
                    value: client.ping.toFixed(0)+'ms'
                    },
                    {
                    name: "Times nya used since restart",
                    value: nyac
                },
                    {
                        name: "Times help used since restart",
                        value: helpc
                    },
                    {
                        name: "Times neko used since restart",
                        value: nekoc
                    },   {
                        name: "Times stats used since restart",
                        value: statsc
                    },
                    {
                        name: "Times lewd used since restart",
                        value: lewdc
                    },{
                        name: "Upvotes",
                        value: getVotes().length
                    },
                    {
                        name: "Links" ,
                        value:"[Upvote](https://discordbots.org/bot/334186716770598912)" + " | [GitHub](https://github.com/TomsUsername/nekos.life/tree/master/bot)"
                        }
                ],

                timestamp: new Date(),
                footer: {
                    text: "Stats requested by " + message.author.username
                }
            }
        })
    }
    stats();
});
//eval
client.on("message", message => {
    const args = message.content.split(" ").slice(1);

    if (message.content.startsWith(prefix + "eval")) {
        if(!owners.includes(message.author.id)) return;
        try {
            const code = args.join(" ");
            let evaled = eval(code);

            if (typeof evaled !== "string")
                evaled = require("util").inspect(evaled);

            message.channel.send(clean(evaled), {code:"xl"});
        } catch (err) {
            message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
        }
    }
});
//guild logs
client.on('guildCreate', guild => {
    snekfetch.post(`https://discordbots.org/api/bots/334186716770598912/stats`)
        .set('Authorization', dblkey)
        .send({server_count: client.guilds.size})
        .then(r => console.log(r.status + ' for dbl guild count of ' + client.guilds.size))
        .catch(e => console.warn('wew tf happened here ' + e + ' for dbl post guild count of ' + client.guilds.size));
    snekfetch.post(`https://bots.discord.pw/api/bots/334186716770598912/stats`)
        .set('Authorization', dbotskey)
        .send({server_count: client.guilds.size})
        .then(r => console.log('status : ' + r.status + ' for dbots guild count of ' + client.guilds.size))
        .catch(e => console.warn('wew tf happened here ' + e + ' for dbots post guild count of ' + client.guilds.size));
    client.user.setGame(`With Nekos \\o/`);


    guild.defaultChannel.createInvite({
        maxAge: 0}).then(inv => console.log(inv.url +" "+ inv.guild)).catch(console.log);

    client.channels.get("334471388289302539").send({
        embed: {

    color: 8190976,
            title: "i joined a guild \\o/",
            thumbnail: {url: guild.iconURL},
            fields: [{
                name: "Guild",
                value: guild.name
            },
                {
                    name: "Owner",
                    value: guild.owner.displayName
                },{
                    name: "Users",
                    value: guild.memberCount
                },
                {
                    name: "Bots",
                    value: guild.members.filter(member => member.user.bot).size
                },
                {
                    name: "invite",
                    value: getInvite(guild)
                },
                {
                    name: "Guild id",
                    value: guild.id
                },
                {
                    name: "Created At",
                    value: moment(guild.createdAt).format('LLLL')
                },
                {
                    name: "Total guilds",
                    value: client.guilds.size
                }
            ],
            timestamp: new Date(),
        }
    }).catch(console.log);
    console.log(`joined ${guild.name}.`);
});
client.on('guildDelete', guild => {
    snekfetch.post(`https://discordbots.org/api/bots/334186716770598912/stats`)
        .set('Authorization', dblkey)
        .send({server_count: client.guilds.size})
        .then(r => console.log(r.status + ' for dbl guild count of ' + client.guilds.size))
        .catch(e => console.warn('wew tf happened here ' + e + ' for dbl post guild count of ' + client.guilds.size));
    snekfetch.post(`https://bots.discord.pw/api/bots/334186716770598912/stats`)
        .set('Authorization', dbotskey)
        .send({server_count: client.guilds.size})
        .then(r => console.log('status : ' + r.status + ' for dbots guild count of ' + client.guilds.size))
        .catch(e => console.warn('wew tf happened here ' + e + ' for dbots post guild count of ' + client.guilds.size));
    client.user.setGame(`With Nekos \\o/`);
    client.channels.get("334471388289302539").send({
        embed: {
            color: 16711680,
            title: "i left a guild :/",
            thumbnail: {url: guild.iconURL},
            fields: [{
                name: "Guild",
                value: guild.name
            },
                {
                name: "Owner",
                value: guild.owner.displayName
            },
                {
                name: "Users",
                value: guild.memberCount
            },
                {
                    name: "Bots",
                    value: guild.members.filter(member => member.user.bot).size
                },
                {
                    name: "Guild id",
                    value: guild.id
                },
                {
                    name: "Created At",
                    value: moment(guild.createdAt).format('LLLL')
                },
                {
                    name: "Total guilds",
                    value: client.guilds.size
                }
            ],
            timestamp: new Date(),
        }
    });
    console.log(`left ${guild.name}.`);
});
//login
client.login(token);
