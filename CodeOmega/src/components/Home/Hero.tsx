import {
  Container,
  Stack,
  Flex,
  Box,
  Heading,
  Text,
  Button,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import React from 'react';
import { PhoneIcon, ChevronRightIcon } from '@chakra-ui/icons';
import BrainCanvas from './Brain';
import { motion } from 'framer-motion'; 

export default function Hero() {
  return (
    <>
    <Container maxW={'7xl'}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 1.5 }} 
      >
        <Stack
          align={'center'}
          spacing={{ base: 8, md: 10 }}
          py={{ base: 20, md: 28 }}
          direction={{ base: 'column', md: 'row' }}
        >
          <Stack flex={1} spacing={{ base: 5, md: 10 }}>
            <Heading
              as={motion.h1} 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }}  
              lineHeight={1.1}
              fontWeight={600}
              fontSize={{ base: '3xl', sm: '4xl', lg: '6xl' }}
            >
              <Text
                as={'span'}
                position={'relative'}
                _after={{
                  content: "''",
                  width: 'full',
                  height: '30%',
                  position: 'absolute',
                  bottom: 1,
                  left: 0,
                  bg: 'blue.400',
                  zIndex: -1,
                }}
              >
                Code Omega,
              </Text>
              <br />
              <Text as={'span'} color={'blue.400'}>
                Tagline.
              </Text>
            </Heading>
            <Text color={'gray.500'}>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum           
            </Text>
            <Stack spacing={{ base: 4, sm: 6 }} direction={{ base: 'column', sm: 'row' }}>
              <Button
                as={motion.button}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }} 
                rounded={'full'}
                size={'lg'}
                fontWeight={'normal'}
                px={6}
                colorScheme={'blue'}
                bg={'blue.400'}
                _hover={{ bg: 'blue.500' }}
              >
                Learn More
                <ChevronRightIcon h={6} w={6} color={'black.300'} />
              </Button>
              <Link to="/ContactUs">
      <Button
        as={motion.button}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        rounded={'full'}
        size={'lg'}
        fontWeight={'normal'}
        px={6}
        leftIcon={<PhoneIcon h={4} w={4} color={'gray.300'} />}
      >
        Contact Us
      </Button>
    </Link>
            </Stack>
          </Stack>
          <Flex
            flex={1}
            justify={'center'}
            align={'center'}
            position={'relative'}
            w={'full'}
          >
            <Box
              position={'relative'}
              height={'400px'}
              width={'full'}
              overflow={'hidden'}
            >
              <BrainCanvas/>
            </Box>
          </Flex>
        </Stack>
      </motion.div>
    </Container>
    </>
  );
}
