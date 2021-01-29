/* Imports Google API */
const { google } = require('googleapis'); 

/* Imports discord.js */
const { Discord } = require('discord.js');

/* Gets calendar scopes */
const SCOPES = ['https://www.googleapis.com/auth/calendar.readonly'];

/* Authorizes the app */

const auth = process.env.googleauth;

function authorize(credentials, callback) {

    const { client_secret, client_id, redirect_uris } = credentials.installed;
   
    const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
  
    oAuth2Client.setCredentials(JSON.parse(auth));

    callback(oAuth2Client);
}

/* Gets upcoming events */

function listEvents(auth) {

    const calendar = google.calendar({version: 'v3', auth});

    calendar.events.list({
      calendarId: 'primary',
      timeMin: (new Date()).toISOString(),
      maxResults: 100,
      singleEvents: true,
      orderBy: 'startTime',
    }, (err, res) => {
      if (err) return message.channel.send('The API returned an error: ' + err);
      const events = res.data.items;
      if (events.length) {
        events.map((event, i) => {
          const start = event.start.dateTime || event.start.date;
          const embed = new Discord.MessageEmbed()
          .setTitle("Upcoming event")
          .setColor('BLUE')
          .setDescription(`${start} - ${event.summary}`)
          .setTimestamp();
          message.channel.send(embed);
        });
      } else message.channel.send('No upcoming events found.');
    });
};


/* This starts everything */

authorize(JSON.parse(auth), listEvents);