# my-rss-feed

Thanks for checking out my Sveltekit RSS feed!
If you have any problems or questions please feel free to get in contact with me and I'll do my best to help.
##Quick start
In order to get started you will need a Mongo DB atlas account and a cluster with a database and collection created with some content information already in there.
If you're not sure what you would need then check out the example .xml files I have in the /src/routes/rss.xml directory.
Once you have done this put the username and password for your database user in the .env file and then go to the getPodcastEpisodes.server.js file in the /src/lib folder and change the connection string to match your own.
You should then be able to run:
npm install
If you have node installed and then:
npm run dev
Which should start the server.
