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
        RailTail
      </Heading>
    <Center>
         <Box w={1250} p={4}>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
        <Feature
          icon={<Icon as={FcAssistant} w={10} h={10} />}
          title={'Safety and Security'}
          text={
            "RailTail employs AI-powered CCTV networks to monitor railway stations and trains in real-time, promptly detecting and responding to incidents, ensuring the safety of passengers and staff."
          }
        />
        <Feature
          icon={<Icon as={FcDonate} w={10} h={10} />}
          title={'Crowd Management'}
          text={
            "Using advanced AI, RailTail optimizes passenger flow, effectively mitigating overcrowding and enhancing safety and efficiency at railway stations. RailTail identifies and preempt suspicious activities and potential security threats, bolstering railway security measures"            
          }
        />
        <Feature
          icon={<Icon as={FcWorkflow} w={10} h={10} />}
          title={'Cleanliness and Maintenance'}
          text={
            "We automate the tracking of cleanliness and maintenance activities through innovative technologies, reducing manual effort and ensuring a cleaner and more reliable railway environment."            
          }
        />
      </SimpleGrid>
    </Box>
    </Center>
    </>
  )
}