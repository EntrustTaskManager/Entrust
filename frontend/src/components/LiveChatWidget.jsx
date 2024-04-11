import React, { useState, useEffect } from 'react';
import { Box, Button, Input, VStack, Text, HStack, IconButton, Avatar, List, ListItem, useDisclosure, CloseButton, useColorMode, useColorModeValue, Switch, FormControl, FormLabel } from '@chakra-ui/react';
import { ChevronDownIcon, ChevronUpIcon, EditIcon, DeleteIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';
import io from 'socket.io-client';

const socket = io('http://localhost:3000');

const users = [
    { id: 'user1', name: 'User 1', avatarUrl: 'https://bit.ly/dan-abramov' },
    { id: 'user2', name: 'User 2', avatarUrl: 'https://bit.ly/kent-c-dodds' },
    { id: 'user3', name: 'User 3', avatarUrl: 'https://bit.ly/ryan-florence' },
];

const Message = ({ msg, onDelete, onEdit }) => (
    <HStack bg={useColorModeValue('gray.100', 'gray.700')} p="2" borderRadius="lg" justifyContent="space-between">
        <HStack>
            <Avatar size="xs" src={msg.avatarUrl} />
            <VStack align="start">
                <Text fontSize="sm">{msg.text}</Text>
                <Text fontSize="xs" opacity="0.6">{new Date(msg.timestamp).toLocaleTimeString()}</Text>
            </VStack>
        </HStack>
        <HStack>
            <IconButton icon={<EditIcon />} size="xs" onClick={() => onEdit(msg)} aria-label="Edit message" />
            <IconButton icon={<DeleteIcon />} size="xs" onClick={() => onDelete(msg.id)} aria-label="Delete message" />
        </HStack>
    </HStack>
);


const PrivateChatWindow = ({ user, onClose, messages, onSendMessage }) => {
    const [newMessage, setNewMessage] = useState('');

    const handleSendMessage = () => {
        if (newMessage.trim()) {
            onSendMessage(user.id, newMessage.trim(), 'private');
            setNewMessage('');
        }
    };

    return (
        <Box position="fixed" bottom="20px" right="350px" w="300px" bg={useColorModeValue('white', 'gray.800')} boxShadow="lg" borderRadius="lg" overflow="hidden" zIndex="2">
            <Box bg="purple.500" color="white" p="3" display="flex" alignItems="center" justifyContent="space-between">
                <Text fontWeight="bold">{user.name}</Text>
                <CloseButton color="white" onClick={onClose} />
            </Box>
            <VStack spacing="4" p="4">
                <Box w="full" h="200px" overflowY="auto">
                    {messages.map((msg, index) => (
                        // Added index to key for uniqueness, consider using a more robust method for generating unique keys
                        <Message key={`${msg.id}-${index}`} msg={msg} onDelete={() => {}} onEdit={() => {}} />
                    ))}
                </Box>
                <HStack w="full">
                    <Input placeholder="Type a message..." value={newMessage} onChange={(e) => setNewMessage(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()} />
                    <Button colorScheme="purple" onClick={handleSendMessage}>Send</Button>
                </HStack>
            </VStack>
        </Box>
    );
};

const LiveChatWidget = () => {
    const [messages, setMessages] = useState([]);
    const [groupMessage, setGroupMessage] = useState('');
    const [privateChat, setPrivateChat] = useState(null);
    const [editingMessage, setEditingMessage] = useState(null);

    useEffect(() => {
        const handleNewMessage = (message) => {
            if (!messages.some(msg => msg.id === message.id)) {
                setMessages(prevMessages => [...prevMessages, message]);
            }
        };

        socket.on("newMessage", handleNewMessage);

        return () => {
            socket.off("newMessage", handleNewMessage);
        };
    }, [messages]);

    const handleDeleteMessage = (id) => {
        setMessages(messages.filter(msg => msg.id !== id));
    };

    const handleEditInit = (msg) => {
        setEditingMessage(msg);
    };

    const handleEditSubmit = (id, newText) => {
        const updatedMessages = messages.map(msg => {
            if (msg.id === id) {
                return { ...msg, text: newText };
            }
            return msg;
        });
        setMessages(updatedMessages);
        setEditingMessage(null);
    };

    const handleSendMessage = (chatId, messageText, type) => {
        const message = {
            id: Date.now().toString(),
            text: messageText,
            timestamp: new Date(),
            sender: 'me',
            chat: chatId,
            avatarUrl: 'https://bit.ly/sage-adebayo',
            type: type,
        };
        socket.emit("message", message);

        setMessages(prevMessages => [...prevMessages, message]);
        if (type === 'group') {
            setGroupMessage('');
        }
    };

    const handleUserClick = (user) => {
        setPrivateChat(user);
    };

    const { isOpen, onToggle } = useDisclosure();
    const { colorMode, toggleColorMode } = useColorMode();

    return (
        <>
            <Box position="fixed" bottom="20px" right="20px" w="300px" bg={useColorModeValue('white', 'gray.800')} boxShadow="lg" borderRadius="lg" overflow="hidden" zIndex="1">
                <Box bg={useColorModeValue('blue.500', 'blue.900')} color="white" p="3" display="flex" alignItems="center" justifyContent="space-between">
                    <Text fontWeight="bold">Group Chat</Text>
                    <IconButton icon={isOpen ? <ChevronDownIcon /> : <ChevronUpIcon />} onClick={onToggle} size="sm" variant="ghost" aria-label="Toggle chat" />
                </Box>
                <FormControl display="flex" alignItems="center" justifyContent="center" p="2">
                    <FormLabel htmlFor="dark-mode" mb="0">
                        {colorMode === 'light' ? <SunIcon /> : <MoonIcon />}
                    </FormLabel>
                    <Switch id="dark-mode" onChange={toggleColorMode} isChecked={colorMode === 'dark'} />
                </FormControl>
                {isOpen && (
                    <>
                        <Box p="3" overflowY="auto" maxH="200px">
                            <List spacing="2">
                                {users.map(user => (
                                    <ListItem key={user.id} p="2" borderRadius="md" cursor="pointer" onClick={() => handleUserClick(user)}>
                                        <HStack>
                                            <Avatar size="xs" src={user.avatarUrl} />
                                            <Text fontSize="sm">{user.name}</Text>
                                        </HStack>
                                    </ListItem>
                                ))}
                            </List>
                        </Box>
                        <VStack spacing="4" p="4">
                            <Box w="full" h="200px" overflowY="auto">
                                {messages.filter(msg => msg.type === 'group').map((msg, index) => (
                                    <React.Fragment key={index}>
                                        {editingMessage?.id === msg.id ? (
                                            <HStack>
                                                <Input defaultValue={editingMessage.text} onChange={(e) => setEditingMessage({ ...editingMessage, text: e.target.value })} />
                                                <Button onClick={() => handleEditSubmit(editingMessage.id, editingMessage.text)}>Save</Button>
                                            </HStack>
                                        ) : (
                                            <Message
                                                msg={msg}
                                                onDelete={() => handleDeleteMessage(msg.id)}
                                                onEdit={() => handleEditInit(msg)}
                                            />
                                        )}
                                    </React.Fragment>
                                ))}
                            </Box>
                            <HStack w="full">
                                <Input placeholder="Message the group..." value={groupMessage} onChange={(e) => setGroupMessage(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSendMessage('group', groupMessage, 'group')} />
                                <Button colorScheme="blue" onClick={() => handleSendMessage('group', groupMessage, 'group')}>Send</Button>
                            </HStack>
                        </VStack>
                    </>
                )}
            </Box>

            {privateChat && (
                <PrivateChatWindow
                    user={privateChat}
                    onClose={() => setPrivateChat(null)}
                    messages={messages.filter(msg => msg.chat === privateChat.id && msg.type === 'private')}
                    onSendMessage={handleSendMessage}
                />
            )}
        </>
    );
};

export default LiveChatWidget;
