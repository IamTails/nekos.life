exports.run = async (client, message) => {
    let infos = await client.getGuild(message.guild.id);
    console.log(infos.prefix);
    message.channel.send(infos.prefix)


};

