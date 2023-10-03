'use client'

import { ReactElement } from 'react'
import { Box, SimpleGrid, Icon, Text, Stack, Flex, Center, Heading } from '@chakra-ui/react'
import { FcAssistant, FcDonate, FcWorkflow } from 'react-icons/fc'
import React from 'react'
import { color } from 'framer-motion'

interface FeatureProps {
  title: string
  text: string
  icon: ReactElement
}

const Feature = ({ title, text, icon }: FeatureProps) => {
  return (
    <>
    <Stack>
       
       <Flex
       bg={"blue.900"}
         w={16}
         h={16}
         align={'center'}
         justify={'center'}
         color={'white'}
         rounded={'full'}
         mb={1}>
         {icon}
       </Flex>
       <Text fontWeight={600}>{title}</Text>
       <Text color={'gray.600'}>{text}</Text>
     </Stack>
    </>
    
  )
}

export default function SimpleThreeColumns() {
  return (
    <>
    <Heading
        px={{ base: 3, md: 150 }}
        pb={10}
      >
        Code Omega
      </Heading>
    <Center>
         <Box w={1250} p={4}>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
        <Feature
          icon={<Icon as={FcAssistant} w={10} h={10} />}
          title={'Expert Guidance'}
          text={
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum"            
          }
        />
        <Feature
          icon={<Icon as={FcDonate} w={10} h={10} />}
          title={'Resource Accessibility'}
          text={
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum"            
          }
        />
        <Feature
          icon={<Icon as={FcWorkflow} w={10} h={10} />}
          title={'Continuous Learning Pathways'}
          text={
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum"            
          }
        />
      </SimpleGrid>
    </Box>
    </Center>
    </>
  )
}