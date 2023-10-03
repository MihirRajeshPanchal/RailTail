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
    Profilepic: 'logo.png',
    Fname: 'Mihir',
    Lname: 'Panchal',
    Position: 'Software Engineer',
    testimonial: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    fk_contactid: {
      linkedin: 'https://www.linkedin.com/in/johndoe',
      insta: 'https://www.instagram.com/johndoe',
      github: 'https://github.com/johndoe',
    },
  },
  {
    Profilepic: 'logo.png',
    Fname: 'Vedant',
    Lname: 'Kambli',
    Position: 'Designer',
    testimonial: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',    
    fk_contactid: {
      linkedin: 'https://www.linkedin.com/in/janesmith',
      insta: 'https://www.instagram.com/janesmith',
      github: 'https://github.com/janesmith',
    },
  },
  {
    Profilepic: 'logo.png',
    Fname: 'Hatim',
    Lname: 'Mullajiwala',
    Position: 'Designer',
    testimonial: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',    
    fk_contactid: {
      linkedin: 'https://www.linkedin.com/in/janesmith',
      insta: 'https://www.instagram.com/janesmith',
      github: 'https://github.com/janesmith',
    },
  },
  {
    Profilepic: 'logo.png',
    Fname: 'Haadi',
    Lname: 'Rakhangi',
    Position: 'Designer',
    testimonial: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',    
    fk_contactid: {
      linkedin: 'https://www.linkedin.com/in/janesmith',
      insta: 'https://www.instagram.com/janesmith',
      github: 'https://github.com/janesmith',
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
                    aria-label="Instagram"
                    variant="ghost"
                    size="lg"
                    isRound={true}
                    onClick={() => window.open(data.fk_contactid.insta, '_blank')}
                    _hover={{ bg: '#0D74FF' }}
                    icon={<BsInstagram size="23px" />}
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
