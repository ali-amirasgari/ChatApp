import React, { useRef, useEffect } from 'react';
import { Box, Text, VStack, Avatar, Flex } from '@chakra-ui/react';
import { format } from 'date-fns';
import { useChat } from '../context/ChatContext';
import { Message } from '../types';

const MessageList: React.FC = () => {
  const { messages, currentUser, userTyping } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to the bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Render a single message
  const renderMessage = (message: Message) => {
    const isOwnMessage = message.user === currentUser?.username;
    const formattedTime = format(new Date(message.timestamp), 'HH:mm');

    return (
      <Flex
        key={message.id}
        justify={isOwnMessage ? 'flex-end' : 'flex-start'}
        mb={3}
        width="100%"
      >
        {!isOwnMessage && (
          <Avatar 
            size="sm" 
            name={message.user.substring(0, 2).toUpperCase()} 
            bg="brand.500"
            mr={2}
          />
        )}
        <Box
          maxWidth="70%"
          bg={isOwnMessage ? 'brand.500' : 'whiteAlpha.200'}
          color={isOwnMessage ? 'white' : 'whiteAlpha.900'}
          borderRadius="lg"
          px={4}
          py={2}
          boxShadow="md"
        >
          {!isOwnMessage && (
            <Text fontWeight="bold" fontSize="sm" color="brand.200">
              {message.user}
            </Text>
          )}
          <Text wordBreak="break-word">{message.text}</Text>
          <Text fontSize="xs" textAlign="right" opacity={0.7} mt={1} color={isOwnMessage ? 'whiteAlpha.800' : 'whiteAlpha.600'}>
            {formattedTime}
          </Text>
        </Box>
        {isOwnMessage && (
          <Avatar 
            size="sm" 
            name={currentUser?.username.substring(0, 2).toUpperCase()} 
            bg="brand.500"
            ml={2}
          />
        )}
      </Flex>
    );
  };

  return (
    <VStack 
      spacing={0} 
      flex={1} 
      overflowY="auto" 
      p={4} 
      align="stretch"
      bg="darkBlue.800"
      css={{
        '&::-webkit-scrollbar': {
          width: '8px',
        },
        '&::-webkit-scrollbar-track': {
          width: '10px',
          background: 'rgba(0, 0, 0, 0.1)',
        },
        '&::-webkit-scrollbar-thumb': {
          background: 'rgba(255, 255, 255, 0.2)',
          borderRadius: '24px',
          '&:hover': {
            background: 'rgba(255, 255, 255, 0.3)',
          }
        },
      }}
    >
      {messages.length === 0 && (
        <Flex
          justifyContent="center"
          alignItems="center"
          height="100%"
          flexDirection="column"
          opacity={0.7}
        >
          <Text color="whiteAlpha.700" fontSize="lg" mb={2}>Welcome to ChatApp</Text>
          <Text color="whiteAlpha.600">No messages yet. Say hello!</Text>
        </Flex>
      )}
      
      {messages.map(renderMessage)}
      
      {userTyping && (
        <Flex align="center" mt={2} ml={2}>
          <Text fontSize="sm" color="whiteAlpha.600">
            {userTyping.user} is typing...
          </Text>
        </Flex>
      )}
      
      <div ref={messagesEndRef} />
    </VStack>
  );
};

export default MessageList; 