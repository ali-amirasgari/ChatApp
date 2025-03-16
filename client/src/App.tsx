import React, { useState } from 'react';
import { ChakraProvider, Box } from '@chakra-ui/react';
import { ChatProvider } from './context/ChatContext';
import Login from './components/Login';
import Chat from './components/Chat';
import './App.css';
import theme from './utils/theme';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <ChakraProvider theme={theme}>
      <ChatProvider>
        <Box height="100vh" width="100%" bg="darkBlue.900">
          {isLoggedIn ? (
            <Chat />
          ) : (
            <Login onLoginSuccess={() => setIsLoggedIn(true)} />
          )}
        </Box>
      </ChatProvider>
    </ChakraProvider>
  );
}

export default App;
