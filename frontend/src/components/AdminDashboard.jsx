import React, { useState,  useEffect} from 'react';

import {
    Box, VStack, Heading, Button, SimpleGrid, useColorMode, useColorModeValue,
    Icon, Text, Flex, Spacer, Switch, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, FormControl, FormLabel, Input, useDisclosure
} from '@chakra-ui/react';
import { FaUserEdit, FaServer, FaRegListAlt, FaCog, FaMoon, FaSun, FaUnlock, FaUserPlus, FaUserMinus, FaKey } from 'react-icons/fa';
import { Line } from 'react-chartjs-2';
import { useNavigate } from 'react-router-dom';

const AdminCard = ({ title, icon, description, onClick }) => {
    const bgColor = useColorModeValue('white', 'gray.700');
    const hoverColor = useColorModeValue('gray.100', 'gray.600');

    return (
        <Box
            p={5}
            shadow="md"
            borderWidth="1px"
            borderRadius="lg"
            bg={bgColor}
            _hover={{ bg: hoverColor }}
            onClick={onClick}
            cursor="pointer"
        >
            <Flex direction="row" align="center">
                <Icon as={icon} w={6} h={6} />
                <Text ml={3} fontWeight="bold">{title}</Text>
            </Flex>
            <Text mt={4}>{description}</Text>
        </Box>
    );
};

const SystemMonitoringModal = ({ isOpen, onClose }) => {
    // Dummy data
    const [chartData, setChartData] = useState({
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
            label: 'CPU Usage (%)',
            data: [65, 59, 80, 81, 56, 55, 40],
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
        }]
    });

    useEffect(() => {
        const intervalId = setInterval(() => {
            
            const newData = chartData.datasets[0].data.map(d =>
                Math.max(0, Math.min(100, d + Math.random() * 20 - 10))); // Randomly increase or decrease

            setChartData({
                ...chartData,
                datasets: [{
                    ...chartData.datasets[0],
                    data: newData
                }]
            });
        }, 2000);

        return () => clearInterval(intervalId); // Cleanup interval on component unmount
    }, [chartData]);

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="2xl">
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>System Monitoring</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Text mb={4}>CPU Usage Over Time:</Text>
                    <Line data={chartData} />
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={onClose}>Close</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

const UserManagementModal = ({ isOpen, onClose }) => {
    const [email, setEmail] = useState('');

// const UserManagementModal = ({ isOpen, onClose }) => {
//         const [email, setEmail] = useState('');
//         const [name, setName] = useState('');
//
//
//         const handleAddTeacher = async () => {
//             try {
//                 const response = await fetch('/api/teacher', {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json',
//                     },
//                     body: JSON.stringify({ name, email }),
//                 });
//
//                 if (!response.ok) {
//                     throw new Error('Failed to add teacher');
//                 }
//
//                 const data = await response.json();
//                 console.log(data.message);
//
//             } catch (error) {
//                 console.error('Error:', error);
//                  (e.g., show an error message)
//             }
//         };

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="xl">
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>User Management</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <VStack spacing={4}>
                        <Button leftIcon={<FaUnlock />} colorScheme="blue">Unlock Accounts</Button>
                        <Button leftIcon={<FaUserPlus />} colorScheme="green">Add Teacher/Student</Button>
                        <Button leftIcon={<FaUserMinus />} colorScheme="red">Remove Teacher/Student</Button>
                        <FormControl id="change-password">
                            <FormLabel>Change Teacher Password</FormLabel>
                            <Input
                                placeholder="Teacher's Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <Button mt={2} leftIcon={<FaKey />} colorScheme="orange">Change Password</Button>
                        </FormControl>
                    </VStack>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={onClose}>Close</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

const AdminDashboard = () => {
    const { colorMode, toggleColorMode } = useColorMode();
    const navigate = useNavigate();
    // const { isOpen, onOpen, onClose } = useDisclosure();
    // const [modalContent, setModalContent] = useState('');
    const userManagementDisclosure = useDisclosure();
    const systemMonitoringDisclosure = useDisclosure();

    // const handleCardClick = (content) => {
    //     setModalContent(content);
    //     onOpen();
    // };

    const handleLogout = () => {
        console.log('Logging out and navigating to the Kanban board');
        navigate('/KanbanBoard');
    };

    return (
        <Box p={8}>
            <Flex mb={6} align="center">
                <Heading>Admin Dashboard</Heading>
                <Spacer />
                <Switch isChecked={colorMode === 'dark'} onChange={toggleColorMode} />
                <Icon ml={2} as={colorMode === 'dark' ? FaSun : FaMoon} />
            </Flex>
            <SimpleGrid columns={{ sm: 1, md: 2, lg: 4 }} spacing={10}>
                <AdminCard
                    title="User Management"
                    icon={FaUserEdit}
                    description="Unlock accounts, add or remove users, and change passwords."
                    onClick={userManagementDisclosure.onOpen}
                />
                <AdminCard
                    title="System Monitoring"
                    icon={FaServer}
                    description="Monitor system health, usage, and performance metrics."
                    onClick={systemMonitoringDisclosure.onOpen}
                />
                <AdminCard
                    title="Issue Reports"
                    icon={FaRegListAlt}
                    description="Review and address reported issues and feedback."
                    onClick={() => handleCardClick('Issue Reports Content')}
                />
                <AdminCard
                    title="Application Settings"
                    icon={FaCog}
                    description="Configure application-wide settings and preferences."
                    onClick={() => handleCardClick('Application Settings Content')}
                />
            </SimpleGrid>
            <Button colorScheme="red" onClick={handleLogout} mt={10}>Logout</Button>

            {userManagementDisclosure.isOpen && <UserManagementModal isOpen={userManagementDisclosure.isOpen} onClose={userManagementDisclosure.onClose} />}
            {systemMonitoringDisclosure.isOpen && <SystemMonitoringModal isOpen={systemMonitoringDisclosure.isOpen} onClose={systemMonitoringDisclosure.onClose} />}
        </Box>
    );
};

export default AdminDashboard;
