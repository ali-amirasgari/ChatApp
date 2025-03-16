import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
  FormErrorMessage,
  useColorModeValue,
  VStack
} from '@chakra-ui/react';
import { useChat } from '../context/ChatContext';

interface LoginProps {
  onLoginSuccess: () => void;
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const { setUsername: joinChat } = useChat();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username.trim()) {
      setError('Username is required');
      return;
    }
    
    joinChat(username);
    onLoginSuccess();
  };

  return (
    <Container maxW="lg" py={12} centerContent>
      <VStack spacing={8} w="100%">
        <Box 
          py={4}
          px={6}
          textAlign="center"
        >
          <Heading
            as="h1"
            size="2xl"
            bgGradient="linear(to-r, brand.400, brand.600)"
            backgroundClip="text"
            fontWeight="extrabold"
            mb={4}
          >
            ChatApp
          </Heading>
          <Text fontSize="lg" color="whiteAlpha.800">
            Connect with friends in real-time
          </Text>
        </Box>

        <Box
          bg={useColorModeValue('darkBlue.800', 'darkBlue.800')}
          p={8}
          rounded="xl"
          boxShadow="2xl"
          w="100%"
          borderWidth="1px"
          borderColor="whiteAlpha.200"
        >
          <VStack spacing={6}>
            <Heading as="h2" size="lg" textAlign="center" color="whiteAlpha.900">
              Welcome
            </Heading>
            
            <Text fontSize="md" textAlign="center" color="whiteAlpha.700">
              Enter a username to join the chat
            </Text>
            
            <form onSubmit={handleSubmit} style={{ width: '100%' }}>
              <VStack spacing={5} align="stretch">
                <FormControl isRequired isInvalid={!!error}>
                  <FormLabel htmlFor="username" color="whiteAlpha.800">Username</FormLabel>
                  <Input
                    id="username"
                    placeholder="Choose a username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    autoFocus
                    size="lg"
                    bg="whiteAlpha.100"
                    border="1px solid"
                    borderColor="whiteAlpha.300"
                    _hover={{ borderColor: "brand.400" }}
                    _focus={{ 
                      borderColor: "brand.500",
                      boxShadow: "0 0 0 1px var(--chakra-colors-brand-500)"
                    }}
                  />
                  {error && <FormErrorMessage>{error}</FormErrorMessage>}
                </FormControl>
                
                <Button
                  type="submit"
                  size="lg"
                  fontSize="md"
                  bgGradient="linear(to-r, brand.500, brand.600)"
                  _hover={{ bgGradient: "linear(to-r, brand.600, brand.700)" }}
                  _active={{ bgGradient: "linear(to-r, brand.700, brand.800)" }}
                  color="white"
                  fontWeight="bold"
                  w="100%"
                  mt={4}
                >
                  Join Chat
                </Button>
              </VStack>
            </form>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default Login; 