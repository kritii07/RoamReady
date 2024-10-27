import { Button } from '@/components/ui/button'
import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react'
import { IoIosSend } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { useNavigate } from 'react-router-dom';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/service/firebaseConfig';
import { Copy } from 'lucide-react';
import { DialogClose } from '@radix-ui/react-dialog';


function InfoSection({trip}) {

  const [photoUrl,setPhotoUrl] = useState();
  const[openDailog, setOpenDailog] = useState(false);
  const navigate = useNavigate();
  const [share,setShare] = useState(false);
  const [tripUrl, setTripUrl] = useState('');
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(tripUrl); // Copy the URL
    setCopied(true); // Show "Copied" popup
    setTimeout(() => setCopied(false), 2000); // Hide after 2 seconds
  };

  useEffect(() => {
    if (share) {
      const url = `${window.location.origin}/view-trip/${trip?.id}`; // Adjust path as needed
      setTripUrl(url);
    }
  }, [share, trip]);  

  const deleteTrip = async () => {
    try {
      const tripDocRef = doc(db, "AITrips", trip?.id); 
      await deleteDoc(tripDocRef); 
      navigate('/my-trips'); 
      window.location.reload(); 
    } catch (error) {
      console.error("Error deleting trip:", error);
    }
  };  
  
  
  useEffect(()=>{
    trip && GetPlacePhoto();
  },[trip])

  const GetPlacePhoto = async() => {
    const data = {
      textQuery:trip?.userSelection?.location?.label
    }
    const result = await GetPlaceDetails(data).then(resp=>{
      //console.log(resp.data.places[0].photos[4].name);

      const PhotoUrl = PHOTO_REF_URL.replace('{NAME}',resp.data.places[0].photos[3].name);
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
            <Button onClick={() => setShare(true)}><IoIosSend /></Button>
            <Button onClick={() => setOpenDailog(true)} className='bg-red-600 hover:bg-red-500'><RiDeleteBin6Line /></Button>
          
          </div>

            <AlertDialog open={openDailog} onOpenChange={() => setOpenDailog(false)}>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete this trip.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={deleteTrip}>Delete</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            <Dialog open={share} onOpenChange={() => setShare(false)}>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Share link</DialogTitle>
                  <DialogDescription>
                    Anyone who has this link will be able to view this trip.
                  </DialogDescription>
                </DialogHeader>
                <div className="flex items-center space-x-2">
                  <div className="grid flex-1 gap-2">
                    <Label htmlFor="link" className="sr-only">
                      Link
                    </Label>
                    <Input
                      id="link"
                      value={tripUrl}
                      readOnly
                    />
                  </div>
                  <div className="relative">
                    <Button type="button" size="sm" className="px-3" onClick={copyToClipboard}>
                      <span className="sr-only">Copy</span>
                      <Copy className="h-4 w-4" />
                    </Button>
                    {copied && (
                      <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs text-gray-500">
                        Copied
                      </div>
                    )}
                  </div>
                </div>
                <DialogFooter className="sm:justify-start">
                  <DialogClose asChild>
                    <Button type="button" variant="secondary">
                      Close
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>

        </div>
    </div>
  )
}

export default InfoSection