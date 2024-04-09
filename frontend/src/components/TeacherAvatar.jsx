import React, { useState, useRef } from 'react';
import { Avatar, Box, Text, VStack, IconButton, Input, useToast } from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons';

const TeacherAvatar = ({ name, profile }) => {
    const [showProfile, setShowProfile] = useState(false);
    const [avatarUrl, setAvatarUrl] = useState(profile.avatarUrl);
    const fileInputRef = useRef(null);
    const toast = useToast();

    const {
        class: teacherClass = '10A',
        subject = 'Mathematics',
        students = 25,
        contact = 'email@example.com'
    } = profile || {};

    const toggleProfile = () => setShowProfile(!showProfile);

    const triggerFileInput = () => fileInputRef.current.click();

    const changeAvatar = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setAvatarUrl(e.target.result);
                toast({
                    title: "Avatar updated.",
                    description: "Your avatar has been successfully updated.",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                });
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <VStack position="relative" spacing={4}>
            <Avatar
                name={name}
                src={avatarUrl}
                size="2xl"
                cursor="pointer"
                onClick={toggleProfile}
            />
            <IconButton
                aria-label="Edit avatar"
                icon={<EditIcon />}
                isRound
                size="sm"
                position="absolute"
                bottom={0}
                right={0}
                onClick={triggerFileInput}
                backgroundColor="whiteAlpha.800"
            />
            <Input
                type="file"
                accept="image/*"
                onChange={changeAvatar}
                hidden
                ref={fileInputRef}
            />
            {showProfile && (
                <Box
                    p={4}
                    bg="whiteAlpha.900"
                    borderRadius="lg"
                    boxShadow="lg"
                    w="100%"
                    textAlign="left"
                >
                    <Text fontSize="lg" fontWeight="bold" mb={2}>{name}'s Profile</Text>
                    <Text><strong>Class:</strong> {teacherClass}</Text>
                    <Text><strong>Subject:</strong> {subject}</Text>
                    <Text><strong>Students:</strong> {students}</Text>
                    <Text><strong>Contact:</strong> {contact}</Text>
                </Box>
            )}
        </VStack>
    );
};

export default TeacherAvatar;
