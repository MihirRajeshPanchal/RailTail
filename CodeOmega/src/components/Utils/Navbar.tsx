import React, { useState } from 'react';
import {
  Box,
  Flex,
  HStack,
  useColorMode,
  IconButton,
  Button,
  Image,
  useDisclosure,
  useColorModeValue,
  Stack,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';

interface Props {
  children: React.ReactNode;
}

const NavLink = (props: Props) => {
  const { children } = props;

  return (
    <Box
      as="a"
      px={2}
      py={1}
      rounded={'md'}
      _hover={{
        textDecoration: 'none',
        bg: useColorModeValue('gray.200', 'gray.700'),
      }}
    >
      {children}
    </Box>
  );
}

export default function Simple() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const [isAdmin, setIsAdmin] = useState(false);

  const toggleAdminUser = () => {
    setIsAdmin(!isAdmin);
  };

  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'}>
            <Link to="/Homepage">
              <Image src="/logo.png" alt="My Logo" width={150} px={5}/>
            </Link>
          </HStack>
          <Flex alignItems={'center'} paddingRight={20}>
            <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
              {isAdmin ? (
                <>
                  <NavLink key="Homepage">
                    <Link to="/homepage">Home</Link>
                  </NavLink>
                  <NavLink key="Crowd Detetction">
                    <Link to="/crowddetection">Crowd Detection</Link>
                  </NavLink>
                  <NavLink key="Trash Detetction">
                    <Link to="/trashdetection">Trash Detection</Link>
                  </NavLink>
                  <NavLink key="Crime Detetction">
                    <Link to="/crimedetection">Crime Detection</Link>
                  </NavLink>
                  <NavLink key="Video Meet">
                    <Link to="/videocall">Video Call</Link>
                  </NavLink>
                  <NavLink key="TC Allocation">
                    <Link to="/tcallocation">TC Allocation</Link>
                  </NavLink>
                  <NavLink key="Staff Allocation">
                    <Link to="/staffallocation">Staff Allocation</Link>
                  </NavLink>
                  <NavLink key="Police Allocation">
                    <Link to="/policeallocation">Police Allocation</Link>
                  </NavLink>
                </>
              ) : (
                <>
                  <NavLink key="Homepage">
                    <Link to="/homepage">Home</Link>
                  </NavLink>
                  <NavLink key="DashBoard">
                    <Link to="/dashboard">Dashboard</Link>
                  </NavLink>
                  <NavLink key="Stations">
                    <Link to="/stations">Stations</Link>
                  </NavLink>
                  <NavLink key="Complain">
                    <Link to="/complain">File Complaint</Link>
                  </NavLink>
                  <NavLink key="FeedBack">
                    <Link to="/feedback">Feedback</Link>
                  </NavLink>
                  <NavLink key="ContactUs">
                    <Link to="/contactus">Contact Us</Link>
                  </NavLink>
                  <NavLink key="AboutUs">
                    <Link to="/aboutus">About Team</Link>
                  </NavLink>
                </>
              )}
              <Button onClick={toggleColorMode}>
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              </Button>
              <Button onClick={toggleAdminUser}>
                {isAdmin ? 'Switch to User' : 'Switch to Admin'}
              </Button>
            </HStack>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
            {isAdmin ? (
                <>
                  <NavLink key="Homepage">
                    <Link to="/homepage">Home</Link>
                  </NavLink>
                  <NavLink key="Crowd Detetction">
                    <Link to="/crowddetection">Crowd Detection</Link>
                  </NavLink>
                  <NavLink key="Trash Detetction">
                    <Link to="/trashdetection">Trash Detection</Link>
                  </NavLink>
                  <NavLink key="Crime Detetction">
                    <Link to="/crimedetection">Crime Detection</Link>
                  </NavLink>
                  <NavLink key="Video Meet">
                    <Link to="/videocall">Video Call</Link>
                  </NavLink>
                  <NavLink key="TC Allocation">
                    <Link to="/tcallocation">TC Allocation</Link>
                  </NavLink>
                  <NavLink key="Staff Allocation">
                    <Link to="/staffallocation">Staff Allocation</Link>
                  </NavLink>
                  <NavLink key="Police Allocation">
                    <Link to="/policeallocation">Police Allocation</Link>
                  </NavLink>
                </>
              ) : (
                <>
                  <NavLink key="Homepage">
                    <Link to="/homepage">Home</Link>
                  </NavLink>
                  <NavLink key="DashBoard">
                    <Link to="/dashBoard">Dashboard</Link>
                  </NavLink>
                  <NavLink key="Stations">
                    <Link to="/stations">Stations</Link>
                  </NavLink>
                  <NavLink key="Complain">
                    <Link to="/complain">File Complain</Link>
                  </NavLink>
                  <NavLink key="FeedBack">
                    <Link to="/feebBack">Feedback</Link>
                  </NavLink>
                  <NavLink key="ContactUs">
                    <Link to="/contactUs">Contact Us</Link>
                  </NavLink>
                  <NavLink key="AboutUs">
                    <Link to="/aboutUs">About Team</Link>
                  </NavLink>
                </>
              )}
              <Button onClick={toggleColorMode}>
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              </Button>
              <Button onClick={toggleAdminUser}>
                {isAdmin ? 'Switch to User' : 'Switch to Admin'}
              </Button>
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
