import { useState } from 'react';
import {
  Progress,
  Box,
  ButtonGroup,
  Button,
  Heading,
  Flex,
  FormControl,
  Image,
  GridItem,
  FormLabel,
  Input,
  Select,
  SimpleGrid,
  InputLeftAddon,
  InputGroup,
  Textarea,
  FormHelperText,
  InputRightElement,
  RadioGroup,
  Radio,
  Center,
} from '@chakra-ui/react';

import { useToast } from '@chakra-ui/react';
import { Bar } from 'react-chartjs-2';
import React from 'react';
import Negative from "../../assets/Negative.png"

const Question1 = () => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleOptionClick = (value) => {
    setSelectedOption(value);
  };

  return (
    <>
      <Heading w="100%" textAlign={'center'} fontWeight="bold" mb="2%" py={3}>
        Question 1
      </Heading>
      <Heading w="100%" textAlign={'center'} fontWeight="normal" mb="2%" py={3}>
        How is the Cleanliness Service?
      </Heading>

      <Center>
        <FormControl>
          <Input id="last-name" placeholder="Your Reviews" />
        </FormControl>
      </Center>
    </>
  );
};

const Question2 = () => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleOptionClick = (value) => {
    setSelectedOption(value);
  };

  return (
    <>
      <Heading w="100%" textAlign={'center'} fontWeight="bold" mb="2%" py={3}>
        Question 2
      </Heading>
      <Heading w="100%" textAlign={'center'} fontWeight="normal" mb="2%" py={3}>
        How is the Security Service?
      </Heading>

      <Center>
        <FormControl>
          <Input id="last-name" placeholder="Your Reviews" />
        </FormControl>
      </Center>
    </>
  );
};

const Question3 = () => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleOptionClick = (value) => {
    setSelectedOption(value);
  };

  return (
    <>
      <Heading w="100%" textAlign={'center'} fontWeight="bold" mb="2%" py={3}>
        Question 3
      </Heading>
      <Heading w="100%" textAlign={'center'} fontWeight="normal" mb="2%" py={3}>
        Rate the crowd management ?
      </Heading>

      <Center>
        <FormControl>
          <Input id="last-name" placeholder="Your Reviews" />
        </FormControl>
      </Center>
    </>
  );
};

const Question4 = () => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleOptionClick = (value) => {
    setSelectedOption(value);
  };

  return (
    <>
      <Heading w="100%" textAlign={'center'} fontWeight="bold" mb="2%" py={3}>
        Question 4
      </Heading>
      <Heading w="100%" textAlign={'center'} fontWeight="normal" mb="2%" py={3}>
        What improvements should we make ?
      </Heading>

      <Center>
        <FormControl>
          <Input id="last-name" placeholder="Your Reviews" />
        </FormControl>
      </Center>
    </>
  );
};

const Question5 = () => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleOptionClick = (value) => {
    setSelectedOption(value);
  };

  return (
    <>
      <Heading w="100%" textAlign={'center'} fontWeight="bold" mb="2%" py={3}>
        Question 5
      </Heading>
      <Heading w="100%" textAlign={'center'} fontWeight="normal" mb="2%" py={3}>
        Give Reviews of the station ?
      </Heading>

      <Center>
        <FormControl>
          <Input id="last-name" placeholder="Your Reviews" />
        </FormControl>
      </Center>
    </>
  );
};

const ResultScreen = () => {
  return (
    <>
      <Heading w="100%" textAlign={'center'} fontWeight="bold">
        Result
      </Heading>
      <Center py={5}>
        <Image
            rounded={'lg'}
            height={230}
            width={282}
            objectFit={'cover'}
            src={Negative}
            alt="#"
          />
      </Center>
      <Heading w="100%" textAlign={'center'} fontWeight="normal">
        Negative Review
      </Heading>
    </>
  );
};

export default function Multistep() {
  const toast = useToast();
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(0);

  const totalSteps = 6; // 5 questions + 1 result screen

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
      setProgress((step / (totalSteps - 1)) * 100); // Adjust progress calculation
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
      setProgress(((step - 2) / (totalSteps - 1)) * 100); // Adjust progress calculation
    }
  };

  return (
    <>
      <Box
        borderWidth="1px"
        rounded="lg"
        shadow="1px 1px 3px rgba(0,0,0,0.3)"
        maxWidth={800}
        p={6}
        m="10px auto"
        as="form"
      >
        <Progress
          hasStripe
          value={progress}
          mb="5%"
          mx="5%"
          isAnimated
        ></Progress>
        {step === 1 && <Question1 />}
        {step === 2 && <Question2 />}
        {step === 3 && <Question3 />}
        {step === 4 && <Question4 />}
        {step === 5 && <Question5 />}
        {step === 6 && <ResultScreen />}

        <ButtonGroup mt="5%" w="100%">
          <Flex w="100%" justifyContent="space-between">
            <Flex>
              <Button
                onClick={handleBack}
                isDisabled={step === 1}
                colorScheme="teal"
                variant="solid"
                w="7rem"
                mr="5%"
              >
                Back
              </Button>
              <Button
                w="7rem"
                isDisabled={step === totalSteps}
                onClick={handleNext}
                colorScheme="teal"
                variant="outline"
              >
                Next
              </Button>
            </Flex>
          </Flex>
        </ButtonGroup>
      </Box>
    </>
  );
}
