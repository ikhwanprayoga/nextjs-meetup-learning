import { MongoClient } from 'mongodb';

// post /api/new-meetup

async function handler(req, res) {
  if (req.method === 'POST') {
    const data = req.body;

    // const { title, image, address, description } = data;

    const client = await MongoClient.connect('mongodb+srv://ikhwanprayoga:siskom2014@cluster0.vollob2.mongodb.net/meetupsDB?retryWrites=true&w=majority');
    const db = client.db();

    const meetupsCollection = db.collection('meetups');

    const result = await meetupsCollection.insertOne(data);

    client.close();

    res.status(201).json({ message: 'meetup inserted' });
  }
}

export default handler;