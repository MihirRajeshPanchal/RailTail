import React from 'react'
import { useParams } from "react-router-dom"
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt"

export default function RoomPage() {
  const { roomId } = useParams();

  const myMeeting = async(element) =>{
    const appID = 1845851736;
    const serverSecret = "bcb9b6f0593f862350b06b36c554d9e1";
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        appID,
        serverSecret,
        roomId, 
        Date.now().toString(),
        "Mihir Panchal"
    );
    const zc = ZegoUIKitPrebuilt.create(kitToken);
    zc.joinRoom({
        container: element,
        sharedLinks:[
          {
            name: 'Copy Link',
            url: `http://localhost:5173/room/${roomId}`,
          }
        ],
        scenario:{
            mode: ZegoUIKitPrebuilt.OneONoneCall
        },
        showScreenSharingButton: true,
    });
  };

  return (
    <div>
        <div ref={myMeeting}/>
    </div>
  )
}

