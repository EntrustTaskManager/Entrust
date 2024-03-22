import React, { useState } from 'react';
import { Box, Input, Button, Flex } from '@chakra-ui/react';

const AddCard = ({ addCard }) => {
    const [title, setTitle] = useState('');

    const handleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleSubmit = () => {
        if (title.trim()) {
            addCard(title);
            setTitle('');
        }
    };

    return (
        <Flex
            height="25vh"
            alignItems="center"
            justifyContent="center"
        >
            <Box
                maxW="sm"
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                p={4}
                boxShadow="sm"
                bg="white"
                _hover={{ boxShadow: "md" }}
                transition="box-shadow 0.2s ease-in-out"
            >
                <Input
                    type="text"
                    value={title}
                    onChange={handleChange}
                    placeholder="Enter task here"
                    mb={3} // margin-bottom
                />
                <Button
                    onClick={handleSubmit}
                    colorScheme="teal"
                    width="full"
                >
                    Submit
                </Button>
            </Box>
        </Flex>
    );
};

export default AddCard;
