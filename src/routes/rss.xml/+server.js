import { getAllEpisodes } from '$lib/getPodcastEpisodes.server';

export async function GET({ setHeaders }) {
	const episodes = await getAllEpisodes();
	const body = await generateBody(episodes);
	setHeaders({
		'Cache-Control': 'max-age=0, s-maxage=3600',
		'Content-Type': 'application/xml'
	});

	return new Response(body);
}

//This is just an example using values from my own RSS feed
async function generateBody(episodes) {
	return `<rss
		xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd"
		xmlns:atom="https://www.w3.org/2005/Atom"
		xmlns:dcterms="http://purl.org/dc/terms/"
		xmlns:content="https://purl.org/rss/1.0/modules/content/"
		version="2.0"
	>
		<channel>
			<atom:link href="https://envisionly.tech/RSS.xml" rel="self" type="application/rss+xml" />
			<title>Envisiontech</title>
			<itunes:author>Paul Geoghegan</itunes:author>
			<itunes:category text="Technology" />
			<itunes:type>episodic</itunes:type>
			<itunes:owner>
				<itunes:name>Paul Geoghegan</itunes:name>
				<itunes:email>contact@envisionly.tech</itunes:email>
			</itunes:owner>
			<itunes:keywords>tech,software,accessibility</itunes:keywords>
			<copyright>Envisionly Limited</copyright>
			<description>Our founder Paul Geoghegan, a blind software engineer, will talk to you about the problems in the technology industry especially those that he faces as someone who is blind. Join him as he explains all things accessibility and helps you learn more about how important it is. From the basics like what a screen reader is to more complicated topics Paul will be covering it all with the help of some very special guests.</description>
			<language>en</language>
			<itunes:explicit>false</itunes:explicit>
			<pubDate>Mon, 29 Jan 2024 16:00:00 GMT</pubDate>
			<link>https://envisionly.tech/RSS.xml</link>
			<itunes:image href="https://envisionly.tech/podcastLogo.jpeg" />
			${episodes.map((episode) => {
				return `<item>
						<guid>${episode.link}</guid>
						<title>${episode.title}</title>
						<itunes:image href="https://envisionly.tech/podcastLogo.jpeg" />
						<description>${episode.description}</description>
						<pubDate>${new Date(episode.published).toUTCString()}</pubDate>
						<enclosure url="${episode.link}" type="audio/mpeg" length="${episode.length}" />
						<itunes:duration>${episode.length}</itunes:duration>
						<itunes:season>${episode.season}</itunes:season>
						<itunes:episode>${episode.episode}</itunes:episode>
						<itunes:keywords>${episode.keyWords}</itunes:keywords>
					</item>`;
			})}
		</channel>
	</rss>`;
}
