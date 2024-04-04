import React, { useState } from 'react';
import { Box, Button, Input, VStack, Text, HStack, IconButton, useDisclosure, Avatar, keyframes } from '@chakra-ui/react';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';


const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const LiveChatWidget = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const { isOpen, onToggle } = useDisclosure();

    const handleSendMessage = () => {
        if (!newMessage.trim()) return;
        const message = {
            text: newMessage,
            timestamp: new Date(),
            sender: 'user',

            avatarUrl: 'https://static.vecteezy.com/system/resources/previews/021/770/051/original/avatar-of-a-japanese-high-school-character-free-vector.jpg',
        };
        setMessages([...messages, message]);
        setNewMessage('');
    };

    return (
        <Box position="fixed" bottom="20px" right="20px" w="300px" bg="white" boxShadow="lg" borderRadius="lg" overflow="hidden" zIndex="1">
            <Box bg="blue.500" color="white" p="3" display="flex" alignItems="center" justifyContent="space-between" cursor="pointer" onClick={onToggle}>
                <Text fontWeight="bold">Live Chat</Text>
                <IconButton icon={isOpen ? <ChevronDownIcon /> : <ChevronUpIcon />} size="sm" variant="ghost" color="white" aria-label="Toggle chat" />
            </Box>

            {isOpen && (
                <VStack spacing="4" p="4">
                    <Box w="full" h="250px" overflowY="auto">
                        {messages.map((msg, index) => (
                            <HStack
                                key={index}
                                bg={msg.sender === 'user' ? 'blue.100' : 'gray.100'}
                                p="2"
                                borderRadius="md"
                                my="1"
                                alignSelf={msg.sender === 'user' ? 'flex-end' : 'flex-start'}
                                animation={`${fadeIn} 0.5s ease-out`} // Apply the fade-in animation to each message
                            >
                                <Avatar size="xs" src={msg.avatarUrl} />
                                <VStack align="start">
                                    <Text fontSize="sm">{msg.text}</Text>
                                    <Text fontSize="xs" opacity="0.6">{msg.timestamp.toLocaleTimeString()}</Text>
                                </VStack>
                            </HStack>
                        ))}
                    </Box>
                    <HStack w="full">
                        <Input placeholder="Type a message..." value={newMessage} onChange={(e) => setNewMessage(e.target.value)} />
                        <Button colorScheme="blue" px="8" onClick={handleSendMessage}>Send</Button>
                    </HStack>
                </VStack>
            )}
        </Box>
    );
};

export default LiveChatWidget;
