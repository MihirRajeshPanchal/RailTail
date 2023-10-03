'use client'

import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  Avatar,
  useColorModeValue,
} from '@chakra-ui/react'
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import StarIcon from './StarIcon'; 
import './MyTimeline.css';
import React, { useEffect, useState } from 'react';
import { color } from 'framer-motion';
export default function Projects() {


  const [animate, setAnimate] = useState(false);
  const [events, setEvents] = useState([]); 


  const localEvents = [
    {
      title: 'Event 1',
      description: 'Description for Event 1',
      event_date: '2023-10-10',
      images: ['logo.png'],
    },
    {
      title: 'Event 2',
      description: 'Description for Event 2',
      event_date: '2023-10-15',
      images: ['logo.png'],
    },
    // Add more events as needed
  ];
  useEffect(() => {
    setEvents(localEvents); 
    const timeout = setTimeout(() => {
      setAnimate(true);
    }, 100);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div style={{  }}>
    <VerticalTimeline >
    {events.map((event) => (
      <VerticalTimelineElement
        className={`vertical-timeline-element--work ${animate ? 'animate' : ''}`}
        contentStyle={{
          background: 'white', 
          border: '2px solid #ccc',        
          boxShadow: 'rgb(0 32 61 / 85%) 5px 5px 19px', 
          borderRadius: '8px',             
        }}
        date={event.event_date}
        iconStyle={{ background: '#1a365d'}}
        icon={<StarIcon />}
      >
        <div className='event'>
        <div>
          <img src={event.images[0]} alt="" />
        </div>
        <div>
          <h1 className="vertical-timeline-element-title">{event.title}</h1>
          <p className='vertical-timeline-element-description'>
            {event.description}
          </p>
        </div>
      </div>
    </VerticalTimelineElement>
    ))}
    </VerticalTimeline>
    </div>
  );
}
