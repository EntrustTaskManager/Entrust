import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Input,
  VStack,
  Text,
  Flex,
  useColorModeValue,
  Image,
} from "@chakra-ui/react";
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  //   const navigate = useNavigate();

  //   const handleLogin = (e) => {
  //     e.preventDefault();
  //     // Authentication logic here
  //     localStorage.setItem("userId", username);
  //     setUsername("");
  //     setPassword("");
  //     navigate("/KanbanBoard");
  //   };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/login", {
        username,
        password,
      });

      const token = response.data.token;

      localStorage.setItem("token", token);

      Navigate("/KanbanBoard");
    } catch (error) {
      console.error("Authentication failed:", error);
    }
  };

  const formBackground = useColorModeValue("gray.100", "gray.700");

  return (
    <Flex
      align="center"
      justify="center"
      height="100vh"
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Box
        d="flex"
        boxShadow="2xl"
        borderRadius="2xl"
        overflow="hidden"
        maxWidth="900px"
        width="full"
        bg={formBackground}
      >
        <Flex direction="row" width="full" align="center">
          <Image
            src="https://www.thoughtco.com/thmb/mi5BR5mruiShD9HnmFwoIu241E4=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/high-school-teacher-calling-on-student-in-classroom-595349163-5adf35e6fa6bcc0036b16732.jpg"
            alt="Login Image"
            objectFit="cover"
            width="50%"
            borderRadius="2xl"
          />

          <VStack align="center" justify="center" p={8} spacing={6} width="50%">
            <Text fontSize="3xl" fontWeight="bold">
              Entrust
            </Text>
            <Box as="form" onSubmit={handleLogin} width="full">
              <VStack spacing={5}>
                <Input
                  placeholder="Username"
                  size="lg"
                  bg="white"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <Input
                  placeholder="Password"
                  size="lg"
                  bg="white"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button width="full" size="lg" colorScheme="blue" type="submit">
                  Log In
                </Button>
              </VStack>
            </Box>
          </VStack>
        </Flex>
      </Box>
    </Flex>
  );
};

export default Login;
