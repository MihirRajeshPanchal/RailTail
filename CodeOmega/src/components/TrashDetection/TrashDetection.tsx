'use client'

import {
  Box,
  Center,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  Image,
  Button,
} from '@chakra-ui/react'

import { Link } from 'react-router-dom';
import video from "../../assets/video.jpeg"
import image from "../../assets/image.png"
import live from "../../assets/live.png"
import { useRef } from 'react';
import React from 'react';

export default function TrashDetection() {
  const fileInputRef = useRef(null);

  const handleComputeImageClick = () => {
    // Trigger the file input when the "Compute" button is clicked
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleComputeVideoClick = () => {
    // Trigger the file input when the "Compute" button is clicked
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImageFileChange = (event) => {
    const selectedFile = event.target.files[0]; // Get the selected file

    if (selectedFile) {
      // Create a FormData object to send the file to the server
      const formData = new FormData();
      formData.append('file', selectedFile);

      // Make a POST request to your server API to process the image
      fetch('http://127.0.0.1:5000/upload-garbage-video', {
        method: 'POST',
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Response from server:', data);
          // Handle the response data as needed
        })
        .catch((error) => {
          console.error('Error:', error);
          // Handle errors
        });
    }
  };

  const handleVideoFileChange = (event) => {
    const selectedFile = event.target.files[0]; // Get the selected file

    if (selectedFile) {
      // Log the file information
      console.log('Selected Video File:', selectedFile);
      // You can also perform further actions with the selected file here
    }
  };


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
          Trash Detection
        </Heading>
      </Center>
    <Center py={12}>
      <Box
        role={'group'}
        p={6}
        maxW={'330px'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.800')}
        boxShadow={'2xl'}
        rounded={'lg'}
        pos={'relative'}
        mr={70} 
        zIndex={1}>
        <Box
          rounded={'lg'}
          mt={-12}
          pos={'relative'}
          height={'270px'}
          _after={{
            transition: 'all .3s ease',
            content: '""',
            w: 'full',
            h: 'full',
            pos: 'absolute',
            top: 5,
            left: 0,
            filter: 'blur(15px)',
            zIndex: -1,
          }}
          _groupHover={{
            _after: {
              filter: 'blur(20px)',
            },
          }}>
        <Image
            rounded={'lg'}
            height={230}
            width={282}
            objectFit={'cover'}
            src={video}
            alt="#"
          />
        </Box>
        <Stack pt={10} align={'center'}>
          <Text color={'gray.500'} fontSize={'sm'} textTransform={'uppercase'}>
            Detect Trash Via
          </Text>
          <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500}>
            Upload a Video
          </Heading>
          <Stack direction={'row'} align={'center'}>

          </Stack>
        </Stack>
        <Center>
          <Button onClick={handleComputeVideoClick}  colorScheme="green" size="lg" my={5} px={6}>
            Compute
          </Button>
          <input
            type="file"
            accept="video/*" // Specify the accepted file types
            ref={fileInputRef}
            onChange={handleVideoFileChange} 
            style={{ display: 'none' }}
          />
        </Center>
      </Box>
      <Box
        role={'group'}
        p={6}
        maxW={'330px'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.800')}
        boxShadow={'2xl'}
        rounded={'lg'}
        pos={'relative'}
        mr={70} 
        zIndex={1}>
        <Box
          rounded={'lg'}
          mt={-12}
          pos={'relative'}
          height={'270px'}
          _after={{
            transition: 'all .3s ease',
            content: '""',
            w: 'full',
            h: 'full',
            pos: 'absolute',
            top: 5,
            left: 0,
            filter: 'blur(15px)',
            zIndex: -1,
          }}
          _groupHover={{
            _after: {
              filter: 'blur(20px)',
            },
          }}>
          <Image
            rounded={'lg'}
            height={230}
            width={282}
            objectFit={'cover'}
            src={image}
            alt="#"
          />
        </Box>
        <Stack pt={10} align={'center'}>
          <Text color={'gray.500'} fontSize={'sm'} textTransform={'uppercase'}>
            Detect Trash Via
          </Text>
          <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500}>
            Upload an Image
          </Heading>
          <Stack direction={'row'} align={'center'}>

          </Stack>
        </Stack>
        <Center>
          <Button onClick={handleComputeImageClick} colorScheme="green" size="lg" my={5} px={6}>
              Compute
          </Button>
          <input
            type="file"
            accept="image/*" // Specify the accepted file types
            ref={fileInputRef}
            onChange={handleImageFileChange} 
            style={{ display: 'none' }}
          />
        </Center>
      </Box>
      <Box
        role={'group'}
        p={6}
        maxW={'330px'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.800')}
        boxShadow={'2xl'}
        rounded={'lg'}
        pos={'relative'}
        mr={70} 
        zIndex={1}>
        <Box
          rounded={'lg'}
          mt={-12}
          pos={'relative'}
          height={'270px'}
          _after={{
            transition: 'all .3s ease',
            content: '""',
            w: 'full',
            h: 'full',
            pos: 'absolute',
            top: 5,
            left: 0,
            filter: 'blur(15px)',
            zIndex: -1,
          }}
          _groupHover={{
            _after: {
              filter: 'blur(20px)',
            },
          }}>
          <Image
            rounded={'lg'}
            height={230}
            width={282}
            objectFit={'cover'}
            src={live}
            alt="#"
          />
        </Box>
        <Stack pt={10} align={'center'}>
          <Text color={'gray.500'} fontSize={'sm'} textTransform={'uppercase'}>
            Detect Trash Via
          </Text>
          <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500}>
            Live Server
          </Heading>
          <Stack direction={'row'} align={'center'}>

          </Stack>
        </Stack>
        <Center>
          <Button as={Link} to="/api_live wala" colorScheme="green" size="lg" my={5} px={6}>
              Compute
          </Button>
        </Center>
      </Box>
    </Center>
    </>
  )
}