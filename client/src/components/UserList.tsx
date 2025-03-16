import React from 'react';
import { 
  Box, 
  Text, 
  VStack, 
  HStack, 
  Avatar, 
  Badge,
  Heading,
  Divider,
  Flex
} from '@chakra-ui/react';
import { useChat } from '../context/ChatContext';

const UserList: React.FC = () => {
  const { users, currentUser } = useChat();

  // Generate consistent avatar colors based on username
  const getUserColor = (username: string) => {
    const colors = [
      'red', 'orange', 'yellow', 'green', 'teal', 'blue', 
      'cyan', 'purple', 'pink'
    ];
    let hash = 0;
    for (let i = 0; i < username.length; i++) {
      hash = username.charCodeAt(i) + ((hash << 5) - hash);
    }
    hash = Math.abs(hash);
    return colors[hash % colors.length];
  };

  // Get user initials for avatar
  const getUserInitials = (username: string) => {
    return username
      .split(' ')
      .map(name => name.charAt(0))
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <Box 
      width={{ base: '80px', md: '250px' }}
      height="100%"
      borderLeftWidth="1px"
      borderColor="whiteAlpha.100"
      bg="darkBlue.800"
      p={4}
      overflowY="auto"
      display={{ base: 'none', sm: 'block' }}
    >
      <Heading size="sm" color="whiteAlpha.900" mb={4}>
        Online Users ({users.length})
      </Heading>
      
      <Divider borderColor="whiteAlpha.200" mb={4} />
      
      <VStack spacing={4} align="stretch">
        {users.map(user => (
          <HStack 
            key={user.id} 
            p={2} 
            borderRadius="md" 
            bg={user.id === currentUser?.id ? 'whiteAlpha.100' : 'transparent'}
            _hover={{ bg: 'whiteAlpha.100' }}
            transition="all 0.2s"
          >
            <Avatar 
              size="sm" 
              name={getUserInitials(user.username)} 
              bg={`${getUserColor(user.username)}.500`}
            />
            <Text color="whiteAlpha.900">
              {user.username}
              {user.id === currentUser?.id && (
                <Badge ml={2} colorScheme="brand" bg="brand.500" color="white">
                  You
                </Badge>
              )}
            </Text>
          </HStack>
        ))}
        
        {users.length === 0 && (
          <Text fontSize="sm" color="whiteAlpha.600" textAlign="center" py={4}>
            No users online
          </Text>
        )}
      </VStack>
    </Box>
  );
};

export default UserList; 