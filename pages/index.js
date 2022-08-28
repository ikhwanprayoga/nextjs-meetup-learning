import { MongoClient } from 'mongodb';

import MeetupList from "../components/meetups/MeetupList";

function Home(props) {
  
  return (
    <MeetupList meetups={props.meetups} />
  )
}

export async function getStaticProps() {
  // fetch data from an api
  const client = await MongoClient.connect('mongodb+srv://ikhwanprayoga:siskom2014@cluster0.vollob2.mongodb.net/meetupsDB?retryWrites=true&w=majority');
  const db = client.db();

  const meetupsCollection = db.collection('meetups');

  const meetups = await meetupsCollection.find().toArray();

  return {
    props: {
      meetups: meetups.map(r => ({
        title: r.title,
        image: r.image,
        address: r.address,
        description: r.description,
        id: r._id.toString(),
      }))
    },
    revalidate: 1
  };
}

export default Home;

