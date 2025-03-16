import React from 'react';
import { Box, Flex, Heading, Spinner, Text, VStack } from '@chakra-ui/react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import UserList from './UserList';
import { useChat } from '../context/ChatContext';

const Chat: React.FC = () => {
  const { isConnected } = useChat();

  if (!isConnected) {
    return (
      <Box 
        width="100%" 
        height="100vh" 
        display="flex" 
        alignItems="center" 
        justifyContent="center"
        bg="darkBlue.900"
      >
        <VStack spacing={4}>
          <Spinner size="xl" color="brand.500" thickness="4px" />
          <Heading size="md" color="whiteAlpha.800">Connecting to server...</Heading>
          <Text color="whiteAlpha.600" fontSize="sm">Please wait while we establish connection</Text>
        </VStack>
      </Box>
    );
  }

  return (
    <Flex height="100vh" width="100%" bg="darkBlue.900">
      <Flex 
        flex={1} 
        direction="column" 
        height="100%" 
        borderRadius="md"
        overflow="hidden"
        borderWidth="1px"
        borderColor="whiteAlpha.100"
        bg="darkBlue.800"
        mr={{ base: 0, md: 2 }}
      >
        <Box 
          p={4} 
          borderBottomWidth="1px"
          borderColor="whiteAlpha.100" 
          bgGradient="linear(to-r, brand.500, brand.600)"
          color="white"
        >
          <Heading size="md">ChatApp</Heading>
        </Box>
        
        <Flex flex={1} direction="column" overflow="hidden">
          {/* Messages area */}
          <MessageList />
          
          {/* Message input */}
          <MessageInput />
        </Flex>
      </Flex>
      
      {/* User list sidebar */}
      <UserList />
    </Flex>
  );
};

export default Chat; 