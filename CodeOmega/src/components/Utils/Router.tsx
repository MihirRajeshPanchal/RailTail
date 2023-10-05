// routes.js
import React from 'react';
import { Route, Routes } from 'react-router-dom'; 

import Homepage from '../Home/Homepage';
// user 
// import Dashboard from '../Dashboard/Projects';
import Dashboard from '../Dashboard/Trains';
import Complaint from '../Complaint/Complaint';
import Crime from '../Complaint/Crime';
import Cleanliness from '../Complaint/Cleanliness';
import FeedBack from '../FeedBack/FeedBack';
import Stations from '../Stations/Stations';
import Forums from '../Forums/Forums';
import AboutUs from '../AboutUs/Core'
import VideoCall from '../VideoCall/VideoCall';
import RoomPage from '../VideoCall/RoomPage'; 
// import AboutUs from '../AboutUs/Content'
// import AboutUs from '../AboutUs/Events'
// import AboutUs from '../AboutUs/EventsTimeLine'
import ContactUs from '../ContactUs/ContactUs'
// import Dashboard from '../Dashboard/Dashboard';


//admin
import CrowdDetection from '../CrowdDetection/CrowdDetection'
import CrowdImageOutput from '../CrowdDetection/CrowdImageOutput'
import CrowdVideoOutput from '../CrowdDetection/CrowdVideoOutput'
import TrashDetection from '../TrashDetection/TrashDetection';
import TrashImageOutput from '../TrashDetection/TrashImageOutput';
import CrimeDetection from '../CrimeDetection/CrimeDetection';
import CrimeImageOutput from '../CrimeDetection/CrimeImageOutput'
import CrimeVideoOutput from '../CrimeDetection/CrimeVideoOutput'
import FireDetection from '../ThreatDetection/FireDetection'
import FireImageOutput from '../ThreatDetection/FireImageOutput'
import FireVideoOutput from '../ThreatDetection/FireVideoOutput'
import TCAllocation from '../TCAllocation/TCAllocation'
import StaffAllocation from '../StaffAllocation/StaffAllocation';
import PoliceAllocation from '../PoliceAllocation/PoliceAllocation';
const RoutesConfig = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage/>} />
      <Route path="/homepage" element={<Homepage/>} />
      <Route path="/dashboard" element={<Dashboard/>} />

      {/* user  */}
      <Route path="/stations" element={<Stations/>} />
      <Route path="/complain" element={<Complaint/>} />
      <Route path="/complaintcrimes" element={<Crime/>} />
      <Route path="/complaintcleanliness" element={<Cleanliness/>} />
      <Route path="/feedback" element={<FeedBack/>} />
      <Route path="/videoCall" element={<VideoCall />} />
      <Route path="/room/:roomId" element={<RoomPage />} />
      <Route path="/aboutus" element={<AboutUs />} />
      <Route path="/contactus" element={<ContactUs />} />

      {/* admin  */}
      <Route path="/crowddetection" element={<CrowdDetection/>} />
      <Route path="/crowdimageoutput" element={<CrowdImageOutput/>} />
      <Route path="/crowdvideooutput" element={<CrowdVideoOutput/>} />
      <Route path="/trashdetection" element={<TrashDetection/>} />
      <Route path="/trashimageoutput" element={<TrashImageOutput/>} />
      <Route path="/crimedetection" element={<CrimeDetection/>} />
      <Route path="/crimeimageoutput" element={<CrimeImageOutput/>} />
      <Route path="/crimevideooutput" element={<CrimeVideoOutput/>} />
      <Route path="/firedetection" element={<FireDetection/>} />
      <Route path="/fireimageoutput" element={<FireImageOutput/>} />
      <Route path="/firevideooutput" element={<FireVideoOutput/>} />
      <Route path="/tcallocation" element={<TCAllocation/>} />
      <Route path="/staffallocation" element={<StaffAllocation/>} />
      <Route path="/policeallocation" element={<PoliceAllocation/>} />

      {/* <Route path="/VideoCall" element={<VideoCall />} />
      <Route path="/room/:roomId" element={<RoomPage />} /> */}
    </Routes>
  );
};

export default RoutesConfig;
