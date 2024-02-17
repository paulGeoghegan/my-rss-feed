import * as mongoose from 'mongoose';
import { dbUserName, dbPassword } from '$env/static/private';

//Your connection string will go inside this function
//It should look like
//'mongodb+srv://<dbUserName>:<dbPassword>@myDatabase.abcde.mongodb.net/?retryWrites=true&w=majority'
async function connectToDb() {
	await mongoose.connect(
		'mongodb+srv://' +
			dbUserName +
			':' +
			dbPassword +
			'@myWebsite.abcde.mongodb.net/?retryWrites=true&w=majority',
		{ dbName: 'myDatabase' }
	);
	console.log('connected to database');
}

await connectToDb().catch((ex) => {
	console.log("Can't connect to database!");
	console.error(ex);
});

const episodesSchema = new mongoose.Schema({
	title: String,
	description: String,
	published: String,
	link: String,
	length: Number,
	season: Number,
	episode: Number,
	keyWords: String
});
const episodes = mongoose.model('Episodes', episodesSchema);

export async function getAllEpisodes() {
	return episodes.find().sort({ published: -1 }).lean();
}
