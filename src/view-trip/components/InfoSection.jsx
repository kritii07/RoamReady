import { Button } from '@/components/ui/button'
import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react'
import { IoIosSend } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";


function InfoSection({trip}) {

  const [photoUrl,setPhotoUrl] = useState();
  
  useEffect(()=>{
    trip && GetPlacePhoto();
  },[trip])

  const GetPlacePhoto = async() => {
    const data = {
      textQuery:trip?.userSelection?.location?.label
    }
    const result = await GetPlaceDetails(data).then(resp=>{
      //console.log(resp.data.places[0].photos[4].name);

      const PhotoUrl = PHOTO_REF_URL.replace('{NAME}',resp.data.places[0].photos[5].name);
      //console.log(PhotoUrl);
      setPhotoUrl(PhotoUrl);
    })
  }

  

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
            <div className='flex justify-center gap-3'>
            <Button><IoIosSend /></Button>
            <Button className='bg-red-600 hover:bg-red-500'><RiDeleteBin6Line /></Button>
            </div>
        </div>
    </div>
  )
}

export default InfoSection