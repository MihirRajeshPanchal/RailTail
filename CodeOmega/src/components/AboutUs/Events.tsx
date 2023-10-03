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
import React, { useEffect, useState } from 'react'

export default function Projects() {
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
  ];

  useEffect(() => {
    setEvents(localEvents); 
  }, []);

  return (
    <>
      <Center>
        <Heading
          paddingTop={10}
          fontWeight={'normal'}
          fontSize={{ base: '1xl', sm: '2xl', md: '3xl' }}
          lineHeight={'110%'}>
          CodeOmega Events
        </Heading>
      </Center>

      <Center py={6}>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: 30 }}>
          {events.map((event) => (
            <Box
              key={event.id}
              maxW={'445px'}
              w={'full'}
              bg={useColorModeValue('white', 'gray.900')}
              boxShadow={'2xl'}
              rounded={'md'}
              p={6}
              margin={5}
              overflow={'hidden'}
            >
              {/* Render event details here */}
              <Box h={'550px'} bg={'gray.100'} mt={-6} mx={-6} mb={6} pos={'relative'}>
              <img
                src={
                  event.images[0]
                } alt="Example"
                style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                />
              </Box>
              <Stack>
                <Text
                  color={'blue.500'}
                  textTransform={'uppercase'}
                  fontWeight={800}
                  fontSize={'sm'}
                  letterSpacing={1.1}
                >
                  {event.title}
                </Text>
                <Heading
                  color={useColorModeValue('gray.700', 'white')}
                  fontSize={'2xl'}
                  fontFamily={'body'}
                >
                  {event.title}
                </Heading>
                <Text color={'gray.500'}>
                  {event.description}
                </Text>
              </Stack>
              <Stack mt={6} direction={'row'} spacing={4} align={'center'}>
                <Text color={'white.500'}>
                  {event.event_date}
                </Text>
              </Stack>
            </Box>
          ))}
        </div>
      </Center>
    </>
  );
}
