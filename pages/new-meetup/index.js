import { useRouter } from 'next/dist/client/router';
import NewMeetupForm from '../../components/meetups/NewMeetupForm';

function NewMeetup() {
  const router = useRouter();

  const handleSubmitForm = async data => {
    console.log('submit data', data);
    const response = await fetch('/api/new-meetup', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const dataRes = await response.json();
    console.log('response submit', dataRes)

    router.push('/')
  };

  return (
    <NewMeetupForm onAddMeetup={handleSubmitForm} />
  )
}

export default NewMeetup