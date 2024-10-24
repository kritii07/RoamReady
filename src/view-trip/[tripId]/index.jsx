import { db } from '@/service/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import React from 'react'
import { useParams } from 'react-router-dom'

function Viewtrip() {

    const {tripId} = useParams();

    const GetTripData = async()=>{
        const docRef = doc(db, 'AITrips', tripId);
        const docSnap = await getDoc(docRef);
    }
  return (
    <div>Viewtrip</div>
  )
}

export default Viewtrip