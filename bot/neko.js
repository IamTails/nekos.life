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
client.login(client.config.token).catch(e => console.warn('wew tf happened here ' + e));
process.on('uncaughtException', err => {
    let errorMsg = err.stack.replace(new RegExp(`${__dirname}\/`, 'g'), './');
    console.error("Uncaught Exception: ", errorMsg);
});
process.on("unhandledRejection", err => {
    console.error("Uncaught Promise Error: ", err);
});