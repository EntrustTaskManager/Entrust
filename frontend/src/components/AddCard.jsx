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

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    };

    return (
        <>
            <Flex justifyContent="center" m={4}>
                <Button
                    onClick={onOpen}
                    colorScheme="blue"
                    variant="solid"
                    aria-label="Add New Task"
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
                            onKeyDown={handleKeyDown}  
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


// *** Below provides the code that connects the frontend to the backend. Adjust const response = await fetch('http://localhost:4000/tasks' as needed 'http://localhost:4000/' ****

// import React, { useState } from "react";
// import {
//   Button,
//   useDisclosure,
//   Modal,
//   ModalOverlay,
//   ModalContent,
//   ModalHeader,
//   ModalCloseButton,
//   ModalBody,
//   ModalFooter,
//   Input,
//   Flex,
//   useToast,
// } from "@chakra-ui/react";

// const AddCard = ({ addCard }) => {
//   const { isOpen, onOpen, onClose } = useDisclosure();
//   const [title, setTitle] = useState("");
//   const toast = useToast();

//   const handleChange = (event) => setTitle(event.target.value);

//   const handleSubmit = async (e) => {
//     if (e.key === "Enter") {
//       try {
//         const response = await fetch("http://localhost:3000/tasks", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ title, status: "Unassigned" }),
//         });

//         if (!response.ok) {
//           throw new Error(`Error: ${response.statusText}`);
//         }

//         const newTask = await response.json();
//         console.log("New task added:", newTask);

//         toast({
//           title: "Task added.",
//           description: "A new task has been successfully added.",
//           status: "success",
//           duration: 5000,
//           isClosable: true,
//         });
//       } catch (error) {
//         console.error("Error adding new card:", error);
//         toast({
//           title: "Error adding task.",
//           description: "There was a problem adding the new task.",
//           status: "error",
//           duration: 5000,
//           isClosable: true,
//         });
//       }

//       setTitle("");
//       onClose();
//     }
//   };

//   return (
//     <>
//       <Flex justifyContent="center" m={4}>
//         <Button
//           onClick={onOpen}
//           colorScheme="blue"
//           variant="solid"
//           aria-label="Add New task"
//           size="md"
//           maxWidth="200px"
//         >
//           Add New Task
//         </Button>
//       </Flex>

//       <Modal isOpen={isOpen} onClose={onClose}>
//         <ModalOverlay />
//         <ModalContent>
//           <ModalHeader>Add a New Task</ModalHeader>
//           <ModalCloseButton />
//           <ModalBody>
//             <Input
//               placeholder="Enter task"
//               value={title}
//               onChange={handleChange}
//               onKeyDown={handleSubmit}
//             />
//           </ModalBody>

//           <ModalFooter>
//             <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
//               Submit
//             </Button>
//             <Button variant="ghost" onClick={onClose}>
//               Cancel
//             </Button>
//           </ModalFooter>
//         </ModalContent>
//       </Modal>
//     </>
//   );
// };

// export default AddCard;
