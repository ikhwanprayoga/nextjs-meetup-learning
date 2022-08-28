import { MongoClient, ObjectId } from 'mongodb'
import MeetupDetail from "../../components/meetups/MeetupDetail"

function MeetupDetails(props) {

  return (
    <MeetupDetail
      title={props.meetupData.title}
      address={props.meetupData.address}
      image={props.meetupData.image}
      description={props.meetupData.description}
    />
  )
}

export async function getStaticPaths() {

  // fetch data from an api
  const client = await MongoClient.connect('mongodb+srv://ikhwanprayoga:siskom2014@cluster0.vollob2.mongodb.net/meetupsDB?retryWrites=true&w=majority');
  const db = client.db();

  const meetupsCollection = db.collection('meetups');

  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

  client.close();

  return {
    fallback: false,
    paths: meetups.map(r => ({
      params: { meetupId: r._id.toString() }
    })) 
  };
}

export async function getStaticProps(context) {
  // get params id from url
  const meetupId = context.params.meetupId;

  // fetch data from an api
  const client = await MongoClient.connect('mongodb+srv://ikhwanprayoga:siskom2014@cluster0.vollob2.mongodb.net/meetupsDB?retryWrites=true&w=majority');
  const db = client.db();

  const meetupsCollection = db.collection('meetups');

  const selectedMeetup = await meetupsCollection.findOne({ _id: ObjectId(meetupId) })

  client.close();

  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        image: selectedMeetup.image,
        address: selectedMeetup.address,
        description: selectedMeetup.description,
      }
    }
  };
}

export default MeetupDetails