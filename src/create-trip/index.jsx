import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AI_PROMPT, SelectBudgetOptions, SelectTravelList } from '@/constants/options';
import React, { useEffect, useState } from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import { toast } from 'sonner';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/service/firebaseConfig';
import { chatSession } from '@/service/AIModal';
import { useNavigate } from 'react-router-dom';
import logo from '/mainLogo.png';

function CreateTrip() {
  const [place,setPlace] = useState();

  const [formData, setFormData] = useState([]);

  const[openDailog, setOpenDailog] = useState(false);

  const [loading,setLoading] = useState(false); 

  const navigate = useNavigate();

  const handleInputChange = (name,value)=>{
    
    setFormData({
      ...formData,
      [name]:value
    })
  }

  useEffect(()=>{
     console.log(formData);
  },[formData])

  const login = useGoogleLogin({
    onSuccess:(codeResp)=>GetUserProfile(codeResp),
    onError:(error)=>console.log(error)
  })

  const OnGenerateTrip = async() => {

    const user = localStorage.getItem('user');
    if(!user){
      setOpenDailog(true);
      return;
    }

    if(formData?.noOfDays>7 &&!formData?.location||!formData?.budget||!formData?.traveler){
      toast('Please fill all the details.')
      return;
    }
    console.log(formData);

    const FINAL_PROMPT = AI_PROMPT
    .replace('{location}', formData?.location?.label)
    .replace('{totalDays}', formData?.noOfDays)
    .replace('{traveler}', formData?.traveler)
    .replace('{budget}', formData?.budget)
    .replace('{totalDays}', formData?.noOfDays)
    
    console.log(FINAL_PROMPT);

    try {
      setLoading(true);
      const result = await chatSession.sendMessage(FINAL_PROMPT); 
      console.log(result?.response?.text());
      SaveAiTrip(result?.response?.text());
    } catch (error) {
      console.error('Error generating trip:', error);
    } finally {
      setLoading(false);
    }

  }

  const SaveAiTrip = async (TripData) => {
    const docId = Date.now().toString();
    const user = JSON.parse(localStorage.getItem('user'));
  try {
    if (!user?.email) throw new Error("User email is missing");

    // Check if TripData is a JSON string and needs parsing
    let tripDataParsed;
    if (typeof TripData === "string") {

      if (!TripData.trim().endsWith("}]}}}")) {
        TripData += "}"; // Append missing closing bracket if necessary
      }
      
        try {
            tripDataParsed = JSON.parse(TripData); // Attempt to parse if it's a string
        } catch (error) {
            console.error("Error parsing TripData JSON string:", error);
            throw new Error("Invalid JSON format in TripData");
        }
    } else {
        tripDataParsed = TripData; // Use directly if it's an object
    }

    await setDoc(doc(db, "AITrips", docId), {
      userSelection: formData,
      tripData: tripDataParsed,
      userEmail: user?.email,
      id: docId
    });
  } catch (error) {
    console.error("Error saving AI trip:", error);
  } finally {
    setLoading(false);
    navigate('/view-trip/'+docId)
  }
}; 

  const GetUserProfile=(tokenInfo)=>{
    axios.get('https://www.googleapis.com/oauth2/v3/userinfo',{
      headers:{
        Authorization:`Bearer ${tokenInfo?.access_token}`,
        Accept:'Application/json'
      }
    }).then((resp)=>{
      console.log(resp);
      localStorage.setItem('user',JSON.stringify(resp.data));
      setOpenDailog(false);
      OnGenerateTrip();
    })
  }

  return (
    <div className='sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10'>
      <h2 className='font-bold text-3xl'>Let AI take the stress out of your travel planning 🏕️🌲</h2>
      <p className='mt-3 text-gray-500 text-xl'>Just provide some basic information, and our trip planner will generate a customised itinerary based on your preferences.</p>

      <div className='mt-20 flex flex-col gap-10' >
        <div>
          <h2 className='text-xl my-3 font-medium'>What is the destination of choice?</h2>
<Input
  type="text"
  placeholder="Enter a place name"
  value={place}
  onChange={(e) => {
    setPlace(e.target.value);
    handleInputChange('location', e.target.value);
  }}
  className="border p-2 w-full rounded-md"
/>
        </div>

        <div>
        <h2 className='text-xl my-3 font-medium'>How many days are you planning your trip?</h2>
        <Input placeholder={'Ex. 3'} type="number"
        onChange={(e)=>handleInputChange('noOfDays', e.target.value)} />
        </div>

        <div>
        <h2 className='text-xl my-3 font-medium'>What is Your Budget?</h2>
        <div className='grid grid-cols-3 gap-5 mt-5'>
          {SelectBudgetOptions.map((item,index)=>(
            <div key={index}
            onClick={()=>handleInputChange('budget',item.title)}
            className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg  ${formData?.budget==item.title&&'shadow-lg border-black'}`}>
            <h2 className='text-4xl'>{item.icon}</h2>
            <h2 className='font-bold text-lg'>{item.title}</h2>
            <h2 className='text-sm text-gray-500'>{item.desc}</h2>
            </div>
          ))}
        </div>
        </div>

        <div>
        <h2 className='text-xl my-3 font-medium'>Who do you plan on travelling with on your next adventure?</h2>
        <div className='grid grid-cols-3 gap-5 mt-5'>
          {SelectTravelList.map((item,index)=>(
            <div key={index} 
            onClick={()=>handleInputChange('traveler',item.people)}
            className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg  ${formData?.traveler==item.people&&'shadow-lg border-black'}`}>
            <h2 className='text-4xl'>{item.icon}</h2>
            <h2 className='font-bold text-lg'>{item.title}</h2>
            <h2 className='text-sm text-gray-500'>{item.desc}</h2>
            </div>
          ))}
        </div>
        </div>

      </div>

      <div className='my-10 justify-end flex'>
      <Button 
      disabled = {loading}
      onClick={OnGenerateTrip}>
        {loading?
        <AiOutlineLoading3Quarters className='h-7 w-7 animate-spin'/> : 'Generate Trip'}
        </Button>
      </div>

      <Dialog open={openDailog} onOpenChange={() => setOpenDailog(false)}>
        <DialogContent>
        <Button onClick={() => setOpenDailog(false)} className="absolute top-3 right-3 w-[60px]">
          &times; 
        </Button>
          <DialogHeader>
            <DialogDescription>
              <img src={logo} alt="" width='180px'/>
              <h2 className='font-bold text-lg mt-2'>Sign In With Google</h2>
              <p>Sign in to the App with Google authentication securely.</p>

              <Button
              onClick={login}
              className='w-full mt-5 flex gap-4 items-center'>
              <FcGoogle className='h-7 w-7'/>
              Sign In With Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>


    </div>
  )
}

export default CreateTrip