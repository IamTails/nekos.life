/**
 * Created by Tom on 7/29/2017.
 */
exports.run = (client, message, args) => {
    function getRandomColor() {

        let letters = '0123456789';
        let color = '';
        for (let i = 0; i < 7; i++) {
            color += letters[Math.floor(Math.random() * 10)];
        }

        return color;
    }

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
    }).catch(e => console.warn('wew tf happened here ' + e));
};