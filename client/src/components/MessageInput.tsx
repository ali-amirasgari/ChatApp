import React, { useState, useEffect, useRef } from 'react';
import { 
  Box, 
  Input,
  Button,
  Text,
  Flex,
} from '@chakra-ui/react';
import { useChat } from '../context/ChatContext';

const MessageInput: React.FC = () => {
  const [message, setMessage] = useState('');
  const { sendMessage, setTyping, userTyping } = useChat();
  const inputRef = useRef<HTMLInputElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Handle typing status
  useEffect(() => {
    if (message && !typingTimeoutRef.current) {
      setTyping(true);
      typingTimeoutRef.current = setTimeout(() => {
        setTyping(false);
        typingTimeoutRef.current = null;
      }, 3000); // Stop typing indicator after 3 seconds of inactivity
    }
    
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
        typingTimeoutRef.current = null;
      }
    };
  }, [message, setTyping]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim()) return;
    
    sendMessage(message);
    setMessage('');
    
    // Focus back on input after sending
    inputRef.current?.focus();
    
    // Clear typing state
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = null;
      setTyping(false);
    }
  };

  return (
    <Box p={4} borderTopWidth="1px" borderColor="whiteAlpha.200" bg="darkBlue.700">
      {userTyping && (
        <Text fontSize="xs" fontStyle="italic" mb={2}>
          {userTyping.user} is typing...
        </Text>
      )}
      
      <form onSubmit={handleSubmit}>
        <Flex>
          <Input
            ref={inputRef}
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            bg="darkBlue.600"
            color="white"
            border="1px solid"
            borderColor="whiteAlpha.200"
            _hover={{ borderColor: "brand.400" }}
            _focus={{ 
              borderColor: "brand.500",
              boxShadow: "0 0 0 1px var(--chakra-colors-brand-500)"
            }}
            size="lg"
            autoFocus
            mr={2}
          />
          <Button 
            type="submit"
            bgGradient="linear(to-r, brand.500, brand.600)"
            _hover={{ bgGradient: "linear(to-r, brand.600, brand.700)" }}
            _active={{ bgGradient: "linear(to-r, brand.700, brand.800)" }}
            color="white"
            disabled={!message.trim()}
            size="lg"
            aria-label="Send message"
          >
            Send
          </Button>
        </Flex>
      </form>
    </Box>
  );
};

export default MessageInput; 