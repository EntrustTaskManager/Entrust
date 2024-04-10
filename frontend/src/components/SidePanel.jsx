import React from 'react';
import { Box, VStack, Text, Button, Divider, useDisclosure, IconButton } from '@chakra-ui/react';
import { ChevronRightIcon, ChevronLeftIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';

const SidePanel = () => {
    const { isOpen, onToggle } = useDisclosure();
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate('/');
    };

    const handleSidePanelClick = () => {
        navigate('/settings');
    };

    const handleAdminClick = () => {

        navigate('/admin');
    };

    return (
        <Box
            position="fixed"
            left={isOpen ? "0" : "-16rem"}
            top="0"
            h="100vh"
            w="16rem"
            bgGradient="linear(to-b, blue.400, blue.500)"
            color="white"
            transition="all 0.4s ease-in-out"
            zIndex="overlay"
            boxShadow="xl"
        >
            <VStack spacing={4} align="stretch" p="4" pt="6">
                <Text fontSize="xl" fontWeight="bold" textAlign="center">Entrust</Text>
                <Divider borderColor="blue.200" />
                <Button variant="ghost" _hover={{ bg: "whitesmoke" }} onClick={handleLogout}>LogOut</Button>
                <Button variant="ghost" _hover={{ bg: "whitesmoke" }} onClick={() => alert('Class Assigned')}>Class Assigned</Button>
                <Button variant="ghost" _hover={{ bg: "whitesmoke" }} onClick={() => alert('Tasks Assigned')}>Tasks Assigned</Button>
                <Button variant="ghost" _hover={{ bg: "whitesmoke" }} onClick={handleSidePanelClick}>Settings</Button>
                {/*Admin Panel Button*/}
                <Divider borderColor="blue.200" />
                <Button variant="ghost" _hover={{ bg: "whitesmoke" }} onClick={handleAdminClick} color="red.500" >Admin Panel</Button>
            </VStack>
            <IconButton
                aria-label="Toggle Side Panel"
                icon={isOpen ? <ChevronLeftIcon boxSize="6" /> : <ChevronRightIcon boxSize="6" />}
                onClick={onToggle}
                position="absolute"
                top="50%"
                right={isOpen ? "-14px" : "-34px"}
                transform="translateY(-50%)"
                borderRadius="full"
                bg="blue.600"
                _hover={{ bg: 'blue.700' }}
                zIndex="overlay"
                size="lg"
                transition="right 0.4s ease-in-out"
            />
        </Box>
    );
};

export default SidePanel;
