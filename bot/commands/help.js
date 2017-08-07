/**
 * Created by Tom on 7/29/2017.
 */
exports.run = async(bot, message) => {
    let gp = await bot.gprefix(message.guild.id);
    let stats = await bot.getStats();
    stats.help++;
    bot.saveStats(stats);
    message.channel.send({
        embed: {
            color: bot.getRandomColor(),
            author: {
                name: `Command Help for ${bot.user.username}`,
                icon_url: bot.user.avatarURL
            }, fields: [
                {
                    name: `**Neko Commands**`,
                    value: `**${gp}nya**: pong!\n**${gp}neko**: Posts a random neko from [nekos.life](https://nekos.life) \\o/.\n`+
                    `**${gp}lewd**: Posts a random lewd neko from [nekos.life](https://nekos.life) o.o\n`+
                    `**${gp}release**: Releases one of your nekos for others to catch >.<`

                }, {
                    name: `**Profile Commands**`,
                    value: `**${gp}profile**: Shows your profile or a users profile @tag o.-\n**${gp}lb nekos**: Shows the Top neko catchers -^\n` +
                    `**${gp}lb levels**: Shows the Top leveled users /o\\\n`

                },{
                    name: `Fun Commands`,
                    value: `**${gp}pat**: Give someone a pat O.o\n` +
                    `**${gp}hug**: Give someone a hug o.O\n` +
                    `**${gp}kiss**: Give someone a kiss O.O\n` +
                    `**${gp}why**: Asks why :?\n` +
                    `**${gp}lizard**: Posts a random lizard from [nekos.life api](https://nekos.life) /o\\\n`
                },  {
                    name: `Bot Commands`,
                    value:
                    `**${gp}prefix set**: Sets the guild prefix owo\n` +
                    `**${gp}stats**: Shows the stats ^^\n` +
                    `**${gp}stats commands**: Shows the command stats ^-\n` +
                    `**${gp}invite**: bot and support guild links -.o\n`
                },{
                    name: `Times help used`,
                    value: stats.help
                }
            ],

            timestamp: new Date(),
            footer: {
                text: `Help requested by ${message.author.username}`
            }
        }
    }).catch(e => console.warn('wew tf happened here ' + e))
};
