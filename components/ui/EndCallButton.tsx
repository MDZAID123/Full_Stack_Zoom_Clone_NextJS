"use client"

import { useCall, useCallStateHooks } from '@stream-io/video-react-sdk'
import React from 'react'
import { Button } from './button';
import { useRouter } from 'next/navigation';

const EndCallButton = () => {

    const call=useCall();

    const router=useRouter();

    const {useLocalParticipant }=useCallStateHooks();
    const localParticipant=useLocalParticipant();
    //first we need to check whether we are the meeting owner or not 
    const isMeetingOwner=localParticipant && call?.state.createdBy && localParticipant.userId === call.state.createdBy.id;
    //we will not show the button if we are not the meeting owner
    if(!isMeetingOwner) return null;
    //but if we are the meeting owner then we will be showing a shadcn button

  return (
    <Button onClick={async ()=>{
        await call.endCall();
        router.push('/');
        
    }} className="bg-red-500">
        End call for Everyone

    </Button>
  )
}

export default EndCallButton