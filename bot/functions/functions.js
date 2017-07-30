const inspect  = require('util');
const fs = require("fs");

module.exports = (client) => {

    client.snekfetch = require('snekfetch');

    client.config = require("../config.json");

    client.prefix = client.config.prefix;

    client.owners = client.config.owners;

    client.stats = JSON.parse(fs.readFileSync("./stats.json", "utf8"));

    client.db = (x) => fs.writeFile("./stats.json", JSON.stringify(x), (err) => {if (err) console.error(err)
    });
    
    client.prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));

    client.pdb = (x) => fs.writeFile("./prefixes.json", JSON.stringify(x), (err) => {if (err) console.error(err)
    });

    client.getRandomColor = () => {

        let letters = '0123456789';
        let color = '';
        for (let i = 0; i < 7; i++) {
            color += letters[Math.floor(Math.random() * 10)];
        }

        return color;
    };

    client.awaitReply = async (msg, question, limit = 60000) => {
        const filter = m=>m.author.id = msg.author.id;
        await msg.channel.send(question);
        try {
            const collected = await msg.channel.awaitMessages(filter, { max: 1, time: limit, errors: ['time'] });
            return collected.first().content;
        } catch(e) {
            return false;
        }
    };

    client.answer = (msg, contents, options = {}) => {
        options.delay =  (options.delay || 2000);
        if(msg.flags.includes("delme")) options.deleteAfter = true;
        options.deleteAfter = (options.deleteAfter || false);
        msg.edit(contents);
        if(options.deleteAfter) msg.delete({timeout: options.delay});
    };

    client.clean = (text) => {
        if (typeof text !== 'string')
            text = inspect(text, {depth: 0})
        text = text
            .replace(/`/g, "`" + String.fromCharCode(8203))
            .replace(/@/g, "@" + String.fromCharCode(8203))
            .replace(client.token, "wew No")
            .replace(client.config.token, "wew No");
        return text;
    };
    process.on('uncaughtException', err => {
        let errorMsg = err.stack.replace(new RegExp(`${__dirname}\/`, 'g'), './');
        console.error("Uncaught Exception: ", errorMsg);
    });
    process.on("unhandledRejection", err => {
        console.error("Uncaught Promise Error: ", err);
    });
};
