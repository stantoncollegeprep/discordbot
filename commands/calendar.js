/* Imports Google API */
const { google } = require('googleapis'); 

/* Imports discord.js */
const { Discord } = require('discord.js');

/* Gets calendar scopes */
const SCOPES = ['https://www.googleapis.com/auth/calendar.readonly'];

/* Authorizes the app */

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
      const events = res.data.ite;
      
      var content = "**Upcoming events** \n";

      if (events.length) {
        events.map((event, i) => {

          const startdate = event.start.dateTime || event.start.date;
          
          content+= `${startdate} - ${event.summary} \n`;

        });
      } else return message.channel.send('No upcoming events found.');

      message.channel.send(content);
    });
};



module.exports = {
    name: 'calendar',
    aliases: ['calendar'],
     description: 'Returns a calendar with known due dates!',
	  execute(message, args) {
  
    const auth = process.env.googleauth;
  
    authorize(JSON.parse(auth), listEvents);

	},
};
