/**
 * Created by Tom on 8/2/2017.
 */
exports.run = async (bot, message, args) => {
    usern = await bot.getTopNekos();
    usere = await bot.getTopExp();
    nc = await bot.nekoc();
    nv = await bot.nekov();
    if (args[0] === 'nekos') {
    msg = await usern.map(g => `**__Name__**: **${g.name}**\n**__Nekos__**: **${g.nekos}** ${nc}\n`).join("\n");
    message.channel.send({
        embed: {
            author: {
                name: "Global leaderboard for nekos",
                icon_url: bot.user.avatarURL
            },
            color: bot.getRandomColor(),
            description:msg,

        }
    })}else if (args[0] === 'levels') {msg = await usere.map(g => `**__Name__**: **${g.name}**\n**__Level__**: **${g.level}** ${nv}\n**__Experience__**: **${g.exp}** ${nc}\n`).join("\n");
        message.channel.send({
            embed: {
                author: {
                    name: "Global leaderboard for Levels",
                    icon_url: bot.user.avatarURL
                },
                color: bot.getRandomColor(),
                description:msg,}

    });}else {
        msg = ":x: **Use `lb nekos` or `lb levels`**";
        message.channel.send({
            embed: {
                author: {
                    name: "Missing args",
                    icon_url: bot.user.avatarURL
                },
                color: bot.getRandomColor(),
                description:msg,}})
    }};