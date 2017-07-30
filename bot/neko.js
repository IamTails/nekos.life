/*
 Created by ℭrystaℒ on 7/10/2017.
 */
const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require("fs");
require("./functions/functions.js")(client);
fs.readdir("./events/", (err, files) => {
    console.log(`Adding ${files.length} events.`);
    if (err) return console.error(err);
    files.forEach(file => {
        let eventFunction = require(`./events/${file}`);
        let eventName = file.split(".")[0];
        client.on(eventName, (...args) => eventFunction.run(client, ...args));
    });
});
client.on("message", async (message) => {
    if (message.author.bot) return;
    if(message.content.indexOf(client.prefix) !== 0) return;

    // This is the best way to define args. Trust me.
    const args = message.content.slice(client.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    // The list of if/else is replaced with those simple 2 lines:
    try {
        let commandFile = require(`./commands/${command}.js`);
        commandFile.run(client, message, args);
    } catch (err) {
        console.error(err);
    }
});
client.login(client.config.token).catch(e => console.warn('wew tf happened here ' + e ));
process.on('uncaughtException', err => {
    let errorMsg = err.stack.replace(new RegExp(`${__dirname}\/`, 'g'), './');
    console.error("Uncaught Exception: ", errorMsg);
});
process.on("unhandledRejection", err => {
    console.error("Uncaught Promise Error: ", err);
});