import React, { useState } from 'react';
import {
    Button,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Input,
    Flex
} from '@chakra-ui/react';

const AddCard = ({ addCard }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [title, setTitle] = useState('');

    const handleChange = (event) => setTitle(event.target.value);

    const handleSubmit = () => {
        if (title.trim()) {
            addCard(title);
            setTitle('');
            onClose();
        }
    };

    return (
        <>
            <Flex justifyContent="center" m={4}>
            <Button
                onClick={onOpen}
                colorScheme="blue"
                variant="solid"
                aria-label="Add New task"
                size="md"
                maxWidth="200px"
            >
                Add New Task
            </Button>
            </Flex>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add a New Task</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Input
                            placeholder="Enter task"
                            value={title}
                            onChange={handleChange}
                            onKeyPress={(e) => e.key === 'Enter' && handleSubmit()} // Submit on Enter
                        />
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
                            Submit
                        </Button>
                        <Button variant="ghost" onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default AddCard;
