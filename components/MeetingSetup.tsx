'use client'

import { DeviceSettings, VideoPreview, useCall } from '@stream-io/video-react-sdk';
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button';

const MeetingSetup = ({setIsSetupComplete}:{setIsSetupComplete:(value:boolean)=> void}) => {

  const [isMicCamToggledOn,setIsMicCamToggledOn]=useState(false);
  const call=useCall(); //coming from stream video sdk
  // since we are using hooks we can use client directive
  if(!call){
    throw new Error('usecall  must be used within StreamCall component')
  }


  useEffect(()=>{
    if(isMicCamToggledOn){
      call?.camera.disable();
      call?.microphone.disable();
    }else{
      call?.camera.enable();
      call?.microphone.enable();
    }


  },[isMicCamToggledOn,call?.camera,call?.microphone])
  return (
    <div className='flex h-screen w-full flex-col items-center justify-center gap-3 text-white'>
        MeetingSetup
        <h1 className='text-2xl font-bold'></h1>
        <VideoPreview/>
        <div className='flex h-16 items-center justify-center gap-3'>
          <label className='flex items-center justify-center gap-2 font-medium'>
            <input
            type="checkbox"
            checked={isMicCamToggledOn}
            onChange={(e)=>setIsMicCamToggledOn(e.target.checked)}
            />
            Join with Mic and Camera off


          </label>
          {/* right below label we can render second video component */}
          <DeviceSettings/>


        </div>
        <Button className='rounded-md bg-green-500 px-4 py-2.5' 
        onClick={()=>{
          call.join();
          setIsSetupComplete(true);
        }}>
          Join meeting
        </Button>


      
    </div>
  )
}

export default MeetingSetup
