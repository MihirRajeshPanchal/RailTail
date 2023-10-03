// routes.js
import React from 'react';
import { Route, Routes } from 'react-router-dom'; 
import Homepage from '../Home/Homepage';
import AboutUs from '../AboutUs/Core'
// import AboutUs from '../AboutUs/Content'
// import AboutUs from '../AboutUs/Events'
// import AboutUs from '../AboutUs/EventsTimeLine'
import ContactUs from '../ContactUs/ContactUs'
// import Dashboard from '../Dashboard/Dashboard';
import Dashboard from '../Dashboard/Projects';
const RoutesConfig = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage/>} />
      <Route path="/Homepage" element={<Homepage/>} />
      <Route path="/Dashboard" element={<Dashboard/>} />
      {/* <Route path="/ML" element={<Core />} />
      <Route path="/OpenCV" element={<EventsTimeline />} />
      <Route path="/Quiz" element={<EventsTimeline />} />
      <Route path="/VideoCall" element={<EventsTimeline />} />
      <Route path="/Forums" element={<ResearchPaper />} /> */}
      <Route path="/AboutUs" element={<AboutUs />} />
      <Route path="/ContactUs" element={<ContactUs />} />
    </Routes>
  );
};

export default RoutesConfig;
