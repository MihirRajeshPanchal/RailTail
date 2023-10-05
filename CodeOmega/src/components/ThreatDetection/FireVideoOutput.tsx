'use client'

import {
  Box,
  Center,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  Image,
} from '@chakra-ui/react'

import video from './output.mp4'
import React from 'react'
export default function FireVideoOutput() {
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
          Fire Video Detection
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
        zIndex={1}>
        <Box
          rounded={'lg'}
          mt={-12}
          pos={'relative'}
          height={'230px'}
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
          <div>
                <video controls style={{ width: '100%' }}>
                    <source src={video} type="video/mp4" />
                </video>
          </div>
        </Box>
        <Stack pt={10} align={'center'} my={10}>
          <Text color={'gray.500'} fontSize={'sm'} textTransform={'uppercase'}>
            Fire Detection Output
          </Text>
          <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500}>
            Intensity of Fire is High
          </Heading>
          <Stack direction={'row'} align={'center'}>
          </Stack>
        </Stack>
      </Box>
    </Center>

    </>
  )
}