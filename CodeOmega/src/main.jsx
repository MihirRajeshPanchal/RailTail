import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import Nav from './components/Utils/Navbar.tsx'
import Routes from './components/Utils/Router.tsx';
import Footer from './components/Utils/Footer.tsx'
import { BrowserRouter as Router } from 'react-router-dom';

const theme = extendTheme({
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false, 
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
    <Router>
      <Nav/>
      <Routes />
      </Router>
      <Footer/> 
    </ChakraProvider>
  </React.StrictMode>,
)
