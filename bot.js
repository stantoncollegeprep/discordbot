/* -------- IMPORTS --------  */

/* Imports discord.js */
const Discord = require('discord.js');
/* Imports embeds */
const { MessageEmbed } = require('discord.js');
/* Imports file system */
const fs = require('fs');
/* Imports the database (mongoose) */
const mongoose = require('mongoose')
/* Imports eval */
const eval = require('node-eval');
/* Imports the config data */
const config = require('./config.js');
/* Makes a command collection */
client.commands = new Discord.Collection();

/* -------- INIT --------  */

(async () => {
    mongoose.connect(config.mongodbcred, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => console.log(`[Shard ${client.shard.ids[0] + 1}] Connected to database.`));
})();


const client = new Discord.client();

/* Temp prefix until I make a custom one */

var prefix = "!";

/* -------- HANDLERS  --------  */


client.on('ready', () => {
    console.log(`[Shard ${client.shard.ids[0] + 1}] Connected to bot.`);
    eval(client);
    client.user.setPresence({ activity: { name: 'waiting for commands | run !help for more info' }, status: 'online' });
})


client.on('message', async message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    let arguments = message.content.substring(prefix.length).split(" ")
    const commandName = arguments.shift().toLowerCase();
    const command = client.commands.get(commandName) || client.commands.find(cmd =>  cmd.aliases && cmd.aliases.includes(commandName));
    if (!command) return;
    try {
        command.execute(message, arguments);
    } catch (error) {
        const embed = new MessageEmbed()
        .setTitle('Error')
        .setColor('BLUE')
        .setDescription(`An error occured while executing command, ${message.author}`)
        .setTimestamp();
        message.channel.send(embed);
    }
});

client.login(config.token)