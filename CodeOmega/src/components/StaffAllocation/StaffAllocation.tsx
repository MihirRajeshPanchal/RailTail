import React, { useEffect, useState } from 'react';
import {
  Heading,
  Box,
  Center,
  Text,
  Stack,
  Button,
  Badge,
  useColorModeValue,
  HStack,
  IconButton,
  Avatar,
} from '@chakra-ui/react';
import { BsTelephone, BsMailbox } from 'react-icons/bs';
import staffimg from "../../assets/staff.png"

export default function Staffallocation() {
  const [dataArray, setDataArray] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    fetch('http://127.0.0.1:5000/getstaffs')
      .then((response) => {
        if (!response.ok) {
          console.log('Network response was not ok');
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setDataArray(data.staff_members);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

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
          Staff Allocation
        </Heading>
      </Center>
      <Center py={10}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gap: '1rem',
          }}
        >
          {dataArray.map((data, index) => (
            <Box
              key={data._id}
              maxW={'320px'}
              bg={useColorModeValue('white', 'gray.900')}
              boxShadow={'2xl'}
              rounded={'lg'}
              p={6}
              textAlign={'center'}
            >
              <Avatar size={'xl'} src={staffimg} mb={4} pos={'relative'} />
              <Heading fontSize={'2xl'} fontFamily={'body'}>
                {data.name}
              </Heading>
              <Text fontWeight={600} color={'gray.500'} mb={4}>
                Line: {data.line}
              </Text>
              <Text textAlign={'center'} color={useColorModeValue('gray.700', 'gray.400')} px={3}>
                Station: {data.station}
              </Text>
              <Center>
                <HStack mt={10} spacing={5} px={5} alignItems="flex-start">
                  <IconButton
                    aria-label="Call"
                    variant="ghost"
                    size="lg"
                    isRound={true}
                    onClick={() => window.location.href = `tel:${data.mob}`}
                    _hover={{ bg: '#0D74FF' }}
                    icon={<BsTelephone size="28px" />}
                  />
                  <IconButton
                    aria-label="Mail"
                    variant="ghost"
                    size="lg"
                    isRound={true}
                    onClick={() => window.location.href = `mailto:${data.email}`}
                    _hover={{ bg: '#0D74FF' }}
                    icon={<BsMailbox size="23px" />}
                  />
                </HStack>
              </Center>
              <Button colorScheme="green" size="lg" my={5} px={6}>
                Assign
              </Button>
            </Box>
          ))}
        </div>
      </Center>
    </>
  );
}
