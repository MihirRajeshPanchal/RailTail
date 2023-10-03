import React, { useCallback, useState } from 'react';
import { Box, Center, Input, Button, Heading } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const MeetingCodeCard = () => {
  const [meetingCode, setMeetingCode] = useState(''); 

  const navigate = useNavigate()

  const handleJoinRoom = useCallback( () => {
    navigate(`/room/${meetingCode}`)
  }, [navigate,meetingCode])

  return (
    <Center h="100vh">
      <Box p={6} borderWidth="1px" borderRadius="lg" boxShadow="lg" maxW="md">
        <Heading as="h2" size="lg" mb={4}>
          Enter Meeting Code
        </Heading>
        <Input
          placeholder="Meeting Code"
          mb={4}
          value={meetingCode}
          onChange={(e) => setMeetingCode(e.target.value)} 
        />
        <Center>
          <Button colorScheme="teal" onClick={handleJoinRoom}>Join Meeting</Button>
        </Center>
      </Box>
    </Center>
  );
};

export default MeetingCodeCard;
