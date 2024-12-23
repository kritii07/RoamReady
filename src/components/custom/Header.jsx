import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import axios from "axios";
import { FcGoogle } from "react-icons/fc";
import logo from '/mainLogo.png';


function Header() {
  const user = JSON.parse(localStorage.getItem('user'));
  const[openDailog, setOpenDailog] = useState(false);

  useEffect(() => {
    console.log(user);
    console.log(user?.picture);
  }, []);

  const login = useGoogleLogin({
    onSuccess:(codeResp)=>GetUserProfile(codeResp),
    onError:(error)=>console.log(error)
  })

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
      window.location.href = '/create-trip'; // Redirect to '/create-trip'
    })
  }

  

  return (
    <div className="p-3 w-full shadow-sm flex justify-between items-center px-5 ">
      <img src={logo} alt="" width='200px' />
        <div>
          {user ? 
          <div className="flex items-center gap-3">
            <a href="/create-trip">
            <Button variant="outline" className='rounded-full' >+ Create Trip</Button>
            </a>
            <a href="/my-trips">
            <Button variant="outline" className='rounded-full' >My Trips</Button>
            </a>
            <Popover>
              <PopoverTrigger>
                <img src={user?.picture} className="h-[35px] w-[35px] rounded-full"/>
              </PopoverTrigger>
              <PopoverContent>
                <h2 className="cursor-pointer" onClick={()=>{
                  googleLogout();
                  localStorage.clear();
                  window.location.href = '/'; // Redirect to the homepage
                }}>
                  Log Out
                </h2>
                </PopoverContent>
            </Popover>

          </div> 
          : 
          <Button onClick={()=>setOpenDailog(true)} className='rounded-full'>Sign In </Button>}
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
  );
}

export default Header;
