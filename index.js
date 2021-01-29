/* Imports the sharding manager */
const { ShardingManager } = require('discord.js');
/* Imports the config data */
const config = require('./config');
/* using config.token throws an error, to bypass this we make a new variable with the same value */
const token = config.token;

/* Makes the sharding manager */
const ShardManager = new ShardingManager("./bot.js", {
    token,
    totalShards: 10
});

/* This even is fired whenever a new shard is made */
ShardManager.on("shardCreate", shard => {
    /* Logs that a new shard was made */
    console.log(`[ShardingManager] Shard ${shard.id + 1} has been created.`)
});

/* Tells the manager to start */
ShardManager.spawn();