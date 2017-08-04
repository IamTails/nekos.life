/**
 * Created by Tom on 7/29/2017.
 */
const {exec} = require("child_process");
exports.run = async (client, msg, args) => {
    if (!client.owners.includes(msg.author.id)) return;

    const outputErr = (msg, stdData) => {
        let {stdout, stderr} = stdData;
        stderr = stderr ? ["`STDERR`", "```sh", client.clean(stderr.substring(0, 800)) || " ", "```"] : [];
        stdout = stdout ? ["`STDOUT`", "```sh", client.clean(stdout.substring(0, stderr ? stderr.length : 2046 - 40)) || " ", "```"] : [];
        let message = stdout.concat(stderr).join("\n").substring(0, 2000);
        msg.edit(message);
    };

    const doExec = (cmd, opts = {}) => {
        return new Promise((resolve, reject) => {
            exec(cmd, opts, (err, stdout, stderr) => {
                if (err) return reject({stdout, stderr});
                resolve(stdout);
            });
        });
    };

    const command = args.join(" ");
    const outMessage = await msg.channel.send(`Running \`${command}\`...`);
    let stdOut = await doExec(command).catch(data => outputErr(outMessage, data));
    stdOut = stdOut.substring(0, 1750);
    outMessage.edit(`Results
\`\`\`sh
${client.clean(stdOut)}\`\`\``);
};
