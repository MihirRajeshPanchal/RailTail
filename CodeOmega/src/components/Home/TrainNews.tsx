'use client'

import {
  Box,
  Heading,
  Image,
  Text,
  Divider,
  HStack,
  Tag,
  Wrap,
  WrapItem,
  SpaceProps,
  useColorModeValue,
  Container,
  VStack,
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'

interface IBlogTags {
  tags: Array<string>
  marginTop?: SpaceProps['marginTop']
}

interface Props {
  marginTop?: number
  tags: any[]
}

const BlogTags = (props: Props) => {
  const { marginTop = 0, tags } = props

  return (
    <HStack spacing={2} marginTop={marginTop}>
      {tags.map((tag) => {
        return (
          <Tag size={'md'} variant="solid" colorScheme="blue" key={tag}>
            {tag}
          </Tag>
        )
      })}
    </HStack>
  )
}

interface BlogAuthorProps {
  date: Date
  name: string
}

const BlogAuthor = (props: BlogAuthorProps) => {
  return (
    <HStack marginTop="2" spacing="2" display="flex" alignItems="center">
      <Image
        borderRadius="full"
        boxSize="40px"
        src="https://100k-faces.glitch.me/random-image"
        alt={`Avatar of ${props.name}`}
      />
      <Text fontWeight="medium">{props.name}</Text>
      <Text>—</Text>
      <Text>{props.date.toLocaleDateString()}</Text>
    </HStack>
  )
}

const ArticleList = () => {
  const [events, setEvents] = useState([]); 
  // api = https://newsapi.org/v2/everything?q=railway&from=2023-09-04&sortBy=publishedAt&apiKey=ed91438d8663496fb648751476f33829
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
  }, []);


  return (
    <Container maxW={'7xl'} p="12">
      <Heading as="h1">Upcoming Events</Heading>
      {events.map((event) => (
      <Box
        marginTop={{ base: '1', sm: '5' }}
        display="flex"
        flexDirection={{ base: 'column', sm: 'row' }}
        justifyContent="space-between">
        <Box
          display="flex"
          flex="1"
          marginRight="3"
          position="relative"
          alignItems="center">
          <Box
            width={{ base: '100%', sm: '85%' }}
            zIndex="2"
            marginLeft={{ base: '0', sm: '5%' }}
            marginTop="5%">
            <Box textDecoration="none" _hover={{ textDecoration: 'none' }}>
              <Image
                borderRadius="lg"
                src={
                  event.images[0]                
                }
                alt="some good alt text"
                objectFit="contain"
              />
            </Box>
          </Box>
          <Box zIndex="1" width="100%" position="absolute" height="100%">
            <Box
              bgGradient={useColorModeValue(
                'radial(blue.600 1px, transparent 1px)',
                'radial(blue.300 1px, transparent 1px)',
              )}
              backgroundSize="20px 20px"
              opacity="0.4"
              height="100%"
            />
          </Box>
        </Box>
        <Box
          display="flex"
          flex="1"
          flexDirection="column"
          justifyContent="center"
          marginTop={{ base: '3', sm: '0' }}>
          <BlogTags tags={[event.event_date]} />
          <Heading marginTop="1">
            <Text textDecoration="none" _hover={{ textDecoration: 'none' }}>
              {event.title}
            </Text>
          </Heading>
          <Text
            as="p"
            marginTop="2"
            color={useColorModeValue('gray.700', 'gray.200')}
            fontSize="lg">
              {event.description}     
          </Text>
        
        </Box>
      </Box>
    ))}
    </Container>
  )
}

export default ArticleList
