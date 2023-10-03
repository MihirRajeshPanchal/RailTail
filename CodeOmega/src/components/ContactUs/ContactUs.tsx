'use client'

import {
  Container,
  Flex,
  Box,
  Heading,
  Text,
  IconButton,
  Button,
  VStack,
  HStack,
  Wrap,
  WrapItem,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Textarea,
  useColorMode,
} from '@chakra-ui/react'
import React, { useState } from 'react'
import {
  MdPhone,
  MdEmail,
  MdLocationOn,
  MdFacebook,
  MdOutlineEmail,
} from 'react-icons/md'
import { BsGithub, BsDiscord, BsPerson, BsLinkedin, BsInstagram, BsMailbox } from 'react-icons/bs'
import { useToast } from '@chakra-ui/react';

export default function Contact() {
    const toast = useToast();
    const { colorMode, toggleColorMode } = useColorMode()
    const [formData, setFormData] = useState({
    name: '',
    email: '',
    number: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.number || !formData.message) {
      toast({
        title: 'Please fill in all fields',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (!/^\d{10}$/.test(formData.number)) {
      toast({
        title: 'Phone number should be 10 digits long',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      toast({
        title: 'Please enter a valid email address',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }
  };
  return (
    <Container maxW="full" mt={0} centerContent overflow="hidden">
      <Flex>
        <Box
        
          bg={colorMode === 'light' ? "#20242c" : "#181c24"}
          color="white"
          borderRadius="lg"
          m={{ sm: 4, md: 16, lg: 10 }}
          p={{ sm: 5, md: 5, lg: 16 }}>
          <Box p={4}>
            <Wrap spacing={{ base: 20, sm: 3, md: 5, lg: 20 }}>
              <WrapItem>
                <Box>
                  <Heading>Contact Us</Heading>
                  <Text mt={{ sm: 3, md: 3, lg: 5 }} color="black.500">
                    Fill up the form below to contact
                  </Text>
                  <Box py={{ base: 5, sm: 5, md: 8, lg: 10 }}>
                    <VStack pl={0} spacing={3} alignItems="flex-start">
                      {/* <Button
                        size="md"
                        height="48px"
                        width="200px"
                        variant="ghost"
                        color="#DCE2FF"
                        _hover={{ border: '2px solid #1C6FEB' }}
                        leftIcon={<MdPhone color="#1970F1" size="20px" />}>

                        +91-988888888
                      </Button> */}
                      <Button
                        size="md"
                        height="48px"
                        width="300px"
                        variant="ghost"
                        color="#DCE2FF"
                        _hover={{ border: '2px solid #1C6FEB' }}
                        leftIcon={<MdEmail color="#1970F1" size="20px" />}>

                        mihirpanchal5400@gmail.com
                      </Button>
                      <Button
                        size="md"
                        height="48px"
                        width="185px"
                        variant="ghost"
                        color="#DCE2FF"
                        _hover={{ border: '2px solid #1C6FEB' }}
                        leftIcon={<MdLocationOn color="#1970F1" size="20px" />}

                      >
                        Mumbai, India
                      </Button>
                    </VStack>
                  </Box>
                  <HStack
                    mt={{ lg: 10, md: 10 }}
                    spacing={5}
                    px={5}
                    alignItems="flex-start">
                    <IconButton
                      aria-label="instagram"
                      variant="ghost"
                      size="lg"
                      onClick={() => window.open('https://www.instagram.com')}
                      isRound={true}
                      color={colorMode === 'light' ? "#fffff" : "#fffff"}
                      _hover={{ bg: '#0D74FF' }}
                      icon={<BsInstagram size="28px" />}
                    />
                    <IconButton
                      aria-label="linkedin"
                      variant="ghost"
                      size="lg"
                      onClick={() => window.open('https://www.linkedin.com')}
                      isRound={true}
                      _hover={{ bg: '#0D74FF' }}
                      color={colorMode === 'light' ? "#fffff" : "#fffff"}
                      icon={<BsLinkedin size="28px" />}
                    />
                    <IconButton
                      aria-label="gmail"
                      variant="ghost"
                      size="lg"
                      onClick={() => {
                        window.location.href = 'mailto:mihirpanchal5400@gmail.com';
                      }}
                      isRound={true}
                      color={colorMode === 'light' ? "#fffff" : "#fffff"}
                      _hover={{ bg: '#0D74FF' }}
                      icon={<MdEmail size="28px" />}
                    />
                  </HStack>
                </Box>
              </WrapItem>
              <WrapItem>
                <Box bg="white" borderRadius="lg">
                  <Box m={8} color="#0B0E3F">
                    <VStack spacing={5}>
                    <FormControl id="name">
                        <FormLabel>Your Name</FormLabel>
                        <InputGroup borderColor="#E0E1E7">
                          <InputLeftElement pointerEvents="none">
                            <BsPerson color="gray.800" />
                          </InputLeftElement>
                          <Input
                            type="text"
                            size="md"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                          />
                        </InputGroup>
                      </FormControl>
                      <FormControl id="email">
                        <FormLabel>Email</FormLabel>
                        <InputGroup borderColor="#E0E1E7">
                          <InputLeftElement pointerEvents="none">
                            <MdEmail color="gray.800" />
                          </InputLeftElement>
                          <Input
                            type="email"
                            size="md"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                          />
                        </InputGroup>
                      </FormControl>
                      <FormControl id="number">
                        <FormLabel>Phone Number</FormLabel>
                        <InputGroup borderColor="#E0E1E7">
                          <InputLeftElement pointerEvents="none">
                            <MdPhone color="gray.800" />
                          </InputLeftElement>
                          <Input
                            type="number"
                            size="md"
                            name="number"
                            value={formData.number}
                            onChange={handleChange}
                          />
                        </InputGroup>
                      </FormControl>
                      <FormControl id="message">
                        <FormLabel>Message</FormLabel>
                        <Textarea
                          borderColor="gray.300"
                          _hover={{
                            borderRadius: 'gray.300',
                          }}               
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                        />
                      </FormControl>
                      <FormControl id="send-button" float="right">
                        <Button
                          variant="solid"
                          bg="blue.900"
                          color="white"
                          _hover={{
                            bg: 'blue.700',
                          }}
                          onClick={handleSubmit}
                        >
                          Send Message
                        </Button>
                      </FormControl>
                    </VStack>
                  </Box>
                </Box>
              </WrapItem>
            </Wrap>
          </Box>
        </Box>
      </Flex>
    </Container>
  )
}