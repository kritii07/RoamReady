import { Button } from '@/components/ui/button'
import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react'
import { IoIosSend } from "react-icons/io";


function InfoSection({trip}) {

  const [photoUrl,setPhotoUrl] = useState();

  const GetPlacePhoto = async() => {
    const data = {
      query:trip?.userSelection?.location?.label
    }
    const result = await GetPlaceDetails(data).then(resp=>{
      //console.log(resp.data.places[0].photos[4].name);

      const PhotoUrl = PHOTO_REF_URL.replace('{NAME}',resp.data.places[0].photos[3].name);
      //console.log(PhotoUrl);
      setPhotoUrl(PhotoUrl);
    })
  }

  useEffect(()=>{
    trip && GetPlacePhoto();
  },[trip])

  return (
    <div>
        <img src={photoUrl?photoUrl:"/placeholder.jpeg"} className='h-[340px] w-full object-cover rounded-xl' />

        <div className='flex justify-between items-center'>
            {/* place information  */}
            <div className='my-5 flex flex-col gap-2'> 
                <h2 className='font-bold text-2xl'>{trip?.userSelection?.location?.label}</h2>
                <div className='flex gap-5'>
                    <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 '>📅{trip?.userSelection?.noOfDays} Days</h2>
                    <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 '>💰{trip?.userSelection?.budget} Budget</h2>
                    <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 '>👬No. Of Traveler: {trip?.userSelection?.traveler} </h2>
                </div>
            </div>
            <Button><IoIosSend /></Button>
        </div>
    </div>
  )
}

export default InfoSection