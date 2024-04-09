import React from 'react';
import {
    Box,
    VStack,
    Button,
    FormControl,
    FormLabel,
    Input,
    useColorMode,
    Heading,
    Switch,
    useColorModeValue,
    Icon,
    InputGroup,
    InputRightElement,
    IconButton
} from '@chakra-ui/react';
import {FaMoon, FaSun, FaEnvelope, FaLock, FaArrowLeft} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Settings = () => {
    const { colorMode, toggleColorMode } = useColorMode();
    const navigate = useNavigate();


    const glassBackground = useColorModeValue('rgba(255, 255, 255, 0.8)', 'rgba(26, 32, 44, 0.8)');
    const boxShadowColor = useColorModeValue('rgba(0, 0, 0, 0.1)', 'rgba(0, 0, 0, 0.2)');

    const handleChangeEmail = (e) => {
        e.preventDefault();

        console.log("Change email logic here");
    };

    const handleChangePassword = (e) => {
        e.preventDefault();

        console.log("Change password logic here");
    };

    return (
        <Box
            p={8}
            borderRadius="lg"
            boxShadow={`0 4px 6px ${boxShadowColor}`}
            border="1px solid"
            borderColor={useColorModeValue('rgba(255, 255, 255, 0.18)', 'rgba(26, 32, 44, 0.9)')}
            bg={glassBackground}
            backdropFilter="blur(10px)"
        >
            <IconButton
                icon={<FaArrowLeft />}
                aria-label="Back to Kanban Board"
                variant="ghost"
                onClick={() => navigate('/KanbanBoard')} 
                mb={4}
            />
            <Heading mb={6} textAlign="center">Settings</Heading>
            <VStack spacing={4} align="stretch">


                <FormControl display="flex" alignItems="center" justifyContent="space-between">
                    <FormLabel htmlFor="theme-toggle" mb="0">
                        {colorMode === 'light' ? <Icon as={FaSun} /> : <Icon as={FaMoon} />}
                        {" "}Dark Mode
                    </FormLabel>
                    <Switch id="theme-toggle" isChecked={colorMode === 'dark'} onChange={toggleColorMode} />
                </FormControl>

                {/* Change Email */}
                <FormControl as="fieldset">
                    <FormLabel as="legend"><Icon as={FaEnvelope} mr={2} />Change Email</FormLabel>
                    <InputGroup>
                        <Input placeholder="New email" />
                        <InputRightElement children={<Icon as={FaEnvelope} color="gray.500" />} />
                    </InputGroup>
                    <Button mt={2} colorScheme="blue" onClick={handleChangeEmail}>Update Email</Button>
                </FormControl>

                {/* Change Password */}
                <FormControl as="fieldset">
                    <FormLabel as="legend"><Icon as={FaLock} mr={2} />Change Password</FormLabel>
                    <InputGroup>
                        <Input placeholder="New password" type="password" />
                        <InputRightElement children={<Icon as={FaLock} color="gray.500" />} />
                    </InputGroup>
                    <Button mt={2} colorScheme="blue" onClick={handleChangePassword}>Update Password</Button>
                </FormControl>


            </VStack>
        </Box>
    );
};

export default Settings;
