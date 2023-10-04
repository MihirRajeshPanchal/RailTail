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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  FormControl,
  FormLabel,
  FormHelperText,
  useDisclosure,
  Collapse,
} from '@chakra-ui/react';
import { BsTelephone, BsMailbox } from 'react-icons/bs';
import staffimg from "../../assets/policeman.png"
import { ImCross, ImCheckmark } from 'react-icons/im'
export default function PoliceAllocation() {
  const [dataArray, setDataArray] = useState([]);
  const [notificationArray, setNotificationArray] = useState([]);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [platformNumber, setPlatformNumber] = useState('');
  const { isOpen, onToggle } = useDisclosure()
  const openAssignModal = () => {
    setIsAssignModalOpen(true);
  };

  const closeAssignModal = () => {
    setIsAssignModalOpen(false);
  };

  const handleAssign = () => {
    // Add your logic here to assign the staff member to the platform with the platformNumber
    // After performing the assignment, close the modal
    closeAssignModal();
  };

  useEffect(() => {
    // Fetch data from the API
    fetch('http://127.0.0.1:5000/getpolice')
      .then((response) => {
        if (!response.ok) {
          console.log('Network response was not ok');
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setDataArray(data.police);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });

    fetch('http://127.0.0.1:5000/get_crime_complaints')
      .then((response) => {
        if (!response.ok) {
          console.log('Network response was not ok');
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setNotificationArray(data);
        console.log(data);
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
          Notifications
        </Heading>
      </Center>
      <Center>
        <Button onClick={onToggle}>Click Me</Button>
      </Center>
      {notificationArray.map((data, index) => (
        <div key={index}>
          <Collapse in={isOpen} animateOpacity>
            <Box
              p='40px'
              mx={50}
              color='white'
              mt='4'
              bg='teal.500'
              rounded='md'
              shadow='md'
            >
              <div>Station Name: {data.station}</div>
              <div>Platform Number: {data.platform}</div>
              <div>Description: {data.description}</div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
                <IconButton
                    my={-70}
                    mx={30}
                    isRound={true}
                    variant='solid'
                    colorScheme='teal'
                    aria-label='Done'
                    fontSize='20px'
                    icon={<ImCheckmark />}
                  />
                <IconButton
                    my={-70}
                    mx={30}
                    isRound={true}
                    variant='solid'
                    colorScheme='teal'
                    aria-label='Done'
                    fontSize='20px'
                    icon={<ImCross />}
                  />
              </div>
            </Box>
          </Collapse>
        </div>
      ))}
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
          Police Allocation
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
              <Button colorScheme="green" size="lg" my={5} px={6} onClick={openAssignModal}>
                Assign
              </Button>
            </Box>
          ))}
        </div>
      </Center>

        {/* Modal for Assigning Staff */}
      <Modal isOpen={isAssignModalOpen} onClose={closeAssignModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Assign Staff to Platform</ModalHeader>
          <ModalBody>
            <FormControl>
              <FormLabel>Platform Number</FormLabel>
              <Input
                type="text"
                placeholder="Enter platform number"
                value={platformNumber}
                onChange={(e) => setPlatformNumber(e.target.value)}
              />
              <FormHelperText>Enter the platform number for the assignment.</FormHelperText>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleAssign}>
              Assign
            </Button>
            <Button variant="ghost" onClick={closeAssignModal}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
