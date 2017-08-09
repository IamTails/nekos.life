/*
 Created by ℭrystaℒ on 7/10/2017.
 */
const Discord = require('discord.js');
const bot = new Discord.Client();
const fs = require("fs");
require("./functions/functions.js")(bot);
console.log(`Setting max listeners to:] :${bot.config.maxL}`);
bot.setMaxListeners(bot.config.maxL);
console.log(`Max listeners :${bot.getMaxListeners()}`);
fs.readdir("./events/", (err, files) => {
console.log(`Logging in Neko
  \\    /\\
   )  ( \')
   (  /  )
    \\(__)|
Adding The following events`);
    console.log(`${files.map(g => `${g.split(".")[0]}`).join(", ")}`);
    if (err) return console.error(err);
    files.forEach(file => {
        let eventFunction = require(`./events/${file}`);
        let eventName = file.split(".")[0];
        bot.on(eventName, (...args) => eventFunction.run(bot, ...args));
    });
    console.log(`Added ${files.length} events.`);
    fs.readdir("./commands/", (err, files) => {
        console.log(`Adding The following Commands\n${files.map(g => `${g.split(".")[0]}`).join(", ")}\nAdded ${files.length} Commands.
Ram used: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB
Version info
Node:${process.version} D.js: ${Discord.version} Neko: ${bot.config.nekover}`);
    });
});
bot.login(bot.config.token).catch(e => console.warn('wew tf happened here ' + e));

