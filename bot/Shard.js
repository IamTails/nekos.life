const { ShardingManger } = require('discord.js');
const config = require('./config');
const shard = new ShardingManager('./neko.js', {
   token: // INSERT TOKEN;
   totalShards: "auto"
});

shard.spawn();

shard.on('launch', shard => console.log(`Shard ${shard.id} is alive!`));
