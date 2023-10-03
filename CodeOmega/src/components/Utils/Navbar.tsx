'use client'

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
} from '@chakra-ui/react'
import { HamburgerIcon, CloseIcon, MoonIcon, SunIcon } from '@chakra-ui/icons'
import React from 'react'
import { Link } from 'react-router-dom';

interface Props {
  children: React.ReactNode
}

const NavLink = (props: Props) => {
  const { children } = props

  return (
    <Box
      as="a"
      px={2}
      py={1}
      rounded={'md'}
      _hover={{
        textDecoration: 'none',
        bg: useColorModeValue('gray.200', 'gray.700'),
      }}>
      {children}
    </Box>
  )
}

export default function Simple() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { colorMode, toggleColorMode } = useColorMode()
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
        <Image src="/logo.png" alt="My Logo" width={150} />
      </Link>
          </HStack>
          <Flex alignItems={'center'} paddingRight={20}>
            <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
              <NavLink key="Homepage">
                <Link to="/Homepage">Home</Link>
              </NavLink>
              <NavLink key="DashBoard">
                <Link to="/DashBoard">Dashboard</Link>
              </NavLink>
              <NavLink key="ML">
                <Link to="/ML">ML</Link>
              </NavLink>
              <NavLink key="OpenCV">
                <Link to="/OpenCV">OpenCV</Link>
              </NavLink>
              <NavLink key="Quiz">
                <Link to="/Quiz">Quiz</Link>
              </NavLink>
              <NavLink key="VideoCall">
                <Link to="/VideoCall">VideoCall</Link>
              </NavLink>
              <NavLink key="Forums">
                <Link to="/Forums">Forums</Link>
              </NavLink>
              <NavLink key="AboutUs">
                <Link to="/AboutUs">About Us</Link>
              </NavLink>
              <NavLink key="ContactUs">
                <Link to="/ContactUs">Contact Us</Link>
              </NavLink>
              <Button onClick={toggleColorMode}>
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              </Button>
            </HStack>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
            <NavLink key="Homepage">
                <Link to="/Homepage">Home</Link>
              </NavLink>
              <NavLink key="DashBoard">
                <Link to="/DashBoard">DashBoard</Link>
              </NavLink>
              <NavLink key="ML">
                <Link to="/ML">ML</Link>
              </NavLink>
              <NavLink key="OpenCV">
                <Link to="/OpenCV">OpenCV</Link>
              </NavLink>
              <NavLink key="Quiz">
                <Link to="/Quiz">Quiz</Link>
              </NavLink>
              <NavLink key="VideoCall">
                <Link to="/VideoCall">VideoCall</Link>
              </NavLink>
              <NavLink key="Forums">
                <Link to="/Forums">Forums</Link>
              </NavLink>
              <NavLink key="AboutUs">
                <Link to="/AboutUs">About Us</Link>
              </NavLink>
              <NavLink key="ContactUs">
                <Link to="/ContactUs">Contact Us</Link>
              </NavLink>
              <Button onClick={toggleColorMode}>
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              </Button>
            </Stack>
          </Box>
        ) : null}
      </Box>

    </>
  )
}