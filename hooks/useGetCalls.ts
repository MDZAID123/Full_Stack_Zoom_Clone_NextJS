import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react"


export const useGetCalls=()=>{
    const [calls,setCalls]=useState<Call[]>([]);
    const [isLoading,setIsLoading]=useState(false);//This hook will allow us to track the loading state
    const client=useStreamVideoClient();
    const {user}=useUser();

    useEffect(()=>{

        const loadCalls=async ()=>{
            if(!client ||!user?.id) return ;
            setIsLoading(true);
        
        try{
            // here we will try to fetch the calls
            const { calls }=await client.queryCalls({
                sort:[{field:'starts_at',direction:-1}],
                filter_conditions:{
                    starts_at:{$exists:true},
                    $or:[
                        {created_by_user_id:user.id},
                        {members:{$in:[user.id]}},
                    ],
                },
            });
            // after we have fetch the calls we need to set the calls
            setCalls(calls);
            //we want to make this hook reusable too


        }catch(error){
            console.log(error);

        }finally{
            setIsLoading(false);
        }
    };
    loadCalls();


        

    },[client,user?.id])
    // we will not directly return the filtred calls rather we will return 
    //an object of different calls

    const now=new Date();
    //cause if its before now it is an ended meeting 
    //and if it is after now it is an upcoming meeting
    const endedCalls=calls.filter(({state:{startsAt,endedAt}}:Call)=>{
        return(startsAt && new Date(startsAt)<now||!!endedAt)
    })
    
    const upcomingCalls=calls.filter(({state:{startsAt}}:Call)=>{
        return startsAt && new Date(startsAt)>now
    })
    // const recordings;

    return {
        endedCalls,
        upcomingCalls,
        callRecordings:calls,
        isLoading,
    }
}