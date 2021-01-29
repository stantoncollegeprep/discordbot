/* Imports the database */
const mongoose = require('mongoose');

/* Makes a prefix schema */
const PrefixSchema = new mongoose.Schema({
    Prefix: String,
    GuildID: String
});

const MessageModel = module.exports = mongoose.model('prefixes', PrefixSchema);