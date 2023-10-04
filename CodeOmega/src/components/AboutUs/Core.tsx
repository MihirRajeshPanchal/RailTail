import React from 'react';
import {
  Heading,
  Avatar,
  Box,
  Center,
  Text,
  Stack,
  Button,
  Link,
  Badge,
  useColorModeValue,
  HStack,
  IconButton,
  useBreakpointValue,
} from '@chakra-ui/react';
import { BsGithub, BsLinkedin, BsInstagram } from 'react-icons/bs';

const dataArray = [
  {
    Profilepic: 'mihir.png',
    Fname: 'Mihir',
    Lname: 'Panchal',
    Position: 'Full Stack Developer',
    testimonial: 'I Love Coding in the dark!',
    fk_contactid: {
      linkedin: 'https://www.linkedin.com/in/mihirpanchal54/',
      github: 'https://github.com/MihirRajeshPanchal',
    },
  },
  {
    Profilepic: 'vedant.jpg',
    Fname: 'Vedant',
    Lname: 'Kambli',
    Position: 'AI and ML Developer',
    testimonial: 'Learning new things',    
    fk_contactid: {
      linkedin: 'https://www.linkedin.com/in/vedant-kambli/',
      github: 'https://github.com/Vedant-K1',
    },
  },
  {
    Profilepic: 'hatim.png',
    Fname: 'Hatim',
    Lname: 'Mullajiwala',
    Position: 'Backend Developer',
    testimonial: 'I always respond in a json object',    
    fk_contactid: {
      linkedin: 'https://www.linkedin.com/in/hatim-mullajiwala-37937a228/',
      github: 'https://github.com/HatimCodeforever',
    },
  },
  {
    Profilepic: 'haadi.jpg',
    Fname: 'Haadi',
    Lname: 'Rakhangi',
    Position: 'AI and ML Developer',
    testimonial: 'Python is Love',    
    fk_contactid: {
      linkedin: 'https://www.linkedin.com/in/haadi-rakhangi-412201269/',
      github: 'https://github.com/haadirakhangi',
    },
  },
  // Add more objects as needed
];

export default function SocialProfileSimple() {
  const headingSize = useBreakpointValue({ base: '2xl', sm: '3xl', md: '4xl' });
  const maxBoxWidth = useBreakpointValue({ base: '100%', sm: '90%', md: '80%' });

  return (
    <>
      <Center>
        <Heading
          px={{ base: 6, md: 150 }}
          pb={10}
          paddingTop={10}
          fontWeight={'normal'}
          fontSize={{ base: '3xl', sm: '2xl', md: '3xl' }}
          lineHeight={'110%'}
          textAlign="center"
        >
          Innovators Powering Code Omega: Meet the Minds Driving Excellence
        </Heading>
      </Center>
      <Center py={10}>
      <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '1rem',
          }}>
          {dataArray.map((data, index) => (
            <Box
              key={index}
              maxW={'320px'}
              bg={useColorModeValue('white', 'gray.900')}
              boxShadow={'2xl'}
              rounded={'lg'}
              p={6}
              textAlign={'center'}
            >
              <Avatar size={'xl'} src={data.Profilepic} mb={4} pos={'relative'} />
              <Heading fontSize={'2xl'} fontFamily={'body'}>
                {data.Fname} {data.Lname}
              </Heading>
              <Text fontWeight={600} color={'gray.500'} mb={4}>
                {data.Position}
              </Text>
              <Text textAlign={'center'} color={useColorModeValue('gray.700', 'gray.400')} px={3}>
                {data.testimonial}
              </Text>
              <Center>
                <HStack mt={10} spacing={5} px={5} alignItems="flex-start">
                  <IconButton
                    aria-label="Linkedin"
                    variant="ghost"
                    size="lg"
                    isRound={true}
                    onClick={() => window.open(data.fk_contactid.linkedin, '_blank')}
                    _hover={{ bg: '#0D74FF' }}
                    icon={<BsLinkedin size="28px" />}
                  />
                  <IconButton
                    aria-label="Github"
                    variant="ghost"
                    size="lg"
                    isRound={true}
                    onClick={() => window.open(data.fk_contactid.github, '_blank')}
                    _hover={{ bg: '#0D74FF' }}
                    icon={<BsGithub size="28px" />}
                  />
                </HStack>
              </Center>
            </Box>
          ))}
        </div>
      </Center>
    </>
  );
}
