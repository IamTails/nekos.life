/*
 Created by ℭrystaℒ on 7/10/2017.
 */
const config = require("./config.json");
const Discord = require('discord.js');
const client = new Discord.Client();
const token = config.token;
const fs = require("fs");
const path = require('path');
const prefixes = path.join('./prefixes,json');
fs.readdir("./events/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        let eventFunction = require(`./events/${file}`);
        let eventName = file.split(".")[0];
        // super-secret recipe to call events with all their proper arguments *after* the `client` var.
        client.on(eventName, (...args) => eventFunction.run(client, ...args));
    });
});
client.on("message", async (message) => {
    const prefix = JSON.parse(fs.readFileSync(prefixes, 'utf8'));
    if (message.author.bot) return;
    if(message.content.indexOf(prefix[message.guild.id].prefix) !== 0) return;

    // This is the best way to define args. Trust me.
    const args = message.content.slice(prefix[message.guild.id]prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    // The list of if/else is replaced with those simple 2 lines:
    try {
        let commandFile = require(`./commands/${command}.js`);
        commandFile.run(client, message, args);
    } catch (err) {
        console.error(err);
    }
});
client.login(token).catch(e => console.warn('wew tf happened here ' + e ));
process.on('unhandledRejection', e => {console.log(e)});
