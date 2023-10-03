import React, { useState, useEffect } from 'react';
import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  Avatar,
  useColorModeValue,
  SimpleGrid,
  Button,
} from '@chakra-ui/react';

export default function ResearchPaper() {
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState([]);

  const openLink = (link) => {
    window.open(link, '_blank');
  };

  const truncateDescription = (description, limit) => {
    if (description.length <= limit) {
      return description;
    }
    return description.substring(0, limit) + '...';
  };

  return (
    <>
    <Center>
        <Heading paddingTop={10}
              fontWeight={'normal'}
              fontSize={{ base: '3xl', sm: '2xl', md: '3xl' }}
              lineHeight={'110%'}>
            Research Papers
        </Heading>
    </Center>
    <Center py={6}>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
          <Box
          maxW={'445px'}
          bg={useColorModeValue('white', 'gray.900')}
          boxShadow={'2xl'}
          rounded={'md'}
          p={6}
          overflow={'hidden'}
          h="100%"
          >
            <Box >
            </Box>
            <Text
              color={'blue.500'}
              textTransform={'uppercase'}
              fontWeight={800}
              fontSize={'lg'}
              letterSpacing={1.1}
              >
              x
            </Text>
            <Heading
              color={useColorModeValue('gray.700', 'white')}
              fontSize={'2xl'}
              fontFamily={'body'}
              >
              x
            </Heading>
            <Text
              color={'blue.500'}
              textTransform={'uppercase'}
              fontWeight={800}
              fontSize={'sm'}
              letterSpacing={1.1}
              >
              x
            </Text>
            <Text color={'gray.500'}>
              {truncateDescription("x", 500)}
            </Text>
            <Stack mt={6} direction={'row'} spacing={4} align={'center'}>
              <Stack direction={'column'} spacing={0} fontSize={'sm'}>
                <Text fontWeight={600}> X </Text>
              </Stack>
            </Stack>
            <Button
              colorScheme="blue"
              onClick={() => openLink("/")}
              mt={4}
              >
              Read More
            </Button>
          </Box>
      </SimpleGrid>
    </Center>
    </>
  );
}
