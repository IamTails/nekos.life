/**
 * Created by Tom on 7/29/2017.
 */
exports.run = (client, message, args) => {
    if (!client.owners.includes(message.author.id)) return;
    try {
        const code = args.join(" ");
        let evaled = eval(code);

        if (typeof evaled !== "string")
            evaled = require("util").inspect(evaled);

        snekfetch.post(`http://feed-the-wump.us/documents`)
            .send(clean(evaled))
            .then(hb => {
                message.channel.send({
                    embed: {
                        color: client.getRandomColor(),
                        author: {
                            name: "eval",
                            icon_url: client.user.avatarURL
                        },
                        fields: [
                            {
                                name: "Result",
                                value: clean(evaled),
                            }, {
                                name: "wumpus",
                                value: "https://feed-the-wump.us/" + hb.body.key
                            }]
                    }
                }).catch(e => console.warn('wew tf happened here ' + e));

            })
            .catch(e => {
                console.warn('wew tf happened here ' + e);
                return "some fucking error";


            });


    } catch (err) {
        message.channel.send({
            embed: {
                color: client.getRandomColor(),
                author: {
                    name: "eval",
                    icon_url: client.user.avatarURL
                },
                fields: [
                    {
                        name: "Result",
                        value: `\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``,
                    }]
            }
        });
    }
};


