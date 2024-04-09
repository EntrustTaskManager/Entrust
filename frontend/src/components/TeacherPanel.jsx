import React, { useState } from 'react';
import { Box, Flex, Text, Switch, FormControl, FormLabel } from '@chakra-ui/react';
import Avatar from 'react-avatar';
import { Bar, Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import TeacherAvatar from "./TeacherAvatar.jsx";

const TeacherPanel = ({ uItems, todoItems, inProgressItems, doneItems,teacherProfile = {} }) => {
    const [isBarChart, setIsBarChart] = useState(true);

    const chartData = {
        labels: ['Unassigned', 'To Do', 'In Progress', 'Done'],
        datasets: [
            {
                label: 'Number of Tasks',
                data: [uItems.length, todoItems.length, inProgressItems.length, doneItems.length],
                backgroundColor: [
                    'rgba(119, 136, 153, 0.6)',
                    'rgba(255, 105, 97, 0.6)',
                    'rgba(255, 255, 133, 0.6)',
                    'rgba(173, 216, 230, 0.6)'
                ],
                borderColor: [
                    'rgba(119, 136, 153, 1)',
                    'rgba(255, 105, 97, 1)',
                    'rgba(255, 255, 133, 1)',
                    'rgba(173, 216, 230, 1)'
                ],
                borderWidth: 1,
                borderRadius: 20,
            },
        ],
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
        plugins: {
            legend: {
                labels: {
                    font: {
                        size: 14,
                    },
                },
            },
        },
    };

    const toggleChartType = () => {
        setIsBarChart(!isBarChart);
    };

    return (
        <Box
            p={5}
            shadow="xl"
            borderWidth="1px"
            borderColor="rgba(255, 255, 255, 0.18)"
            borderRadius="lg"
            backgroundColor="rgba(255, 255, 255, 0.2)"
            backdropFilter="blur(10px)"
            boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)"
            border="1px solid rgba(255, 255, 255, 0.18)"
        >
            <Flex justifyContent="space-between" alignItems="center" mb={4}>
                <Text fontSize="2xl" fontWeight="bold" color="black">Teacher Panel</Text>
                <TeacherAvatar
                    name={teacherProfile?.name}
                    profile={teacherProfile}
                />
            </Flex>
            <FormControl display="flex" alignItems="center" mb={4}>
                <FormLabel htmlFor="chart-type" mb="0" color="black">
                    Bar Chart
                </FormLabel>
                <Switch id="chart-type" onChange={toggleChartType} colorScheme="teal" isChecked={isBarChart} />
            </FormControl>
            {isBarChart ? (
                <Bar data={chartData} options={options} />
            ) : (
                <Line data={chartData} options={options} />
            )}
        </Box>
    );
};

export default TeacherPanel;
