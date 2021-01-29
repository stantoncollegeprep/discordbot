/* Creates the config variable */
var config = {};

/* Assigns a token value to config */
config.token = process.env.token;
/* Assigns a mongodb value to config */
config.mongodb = process.env.mgn;


/* Exports the config variable */
module.exports = config;