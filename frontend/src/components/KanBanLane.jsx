import { Flex, Text, Box } from '@chakra-ui/react';
import { useDroppable } from '@dnd-kit/core';
import KanbanCard from './KanBanCard';
import { Avatar } from '@chakra-ui/react'; 

export default function KanbanLane({ title, items }) {
    const { setNodeRef } = useDroppable({
        id: title,
    });

    return (
        <Flex
            flex="3"
            padding="5"
            flexDirection="column"
            minH="20rem"
            bgColor="rgba(255, 255, 255, 0.2)" 
            borderRadius="lg"
            backdropFilter="blur(10px)" 
            boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)" 
            border="1px solid rgba(25, 31, 52, 0.8)" 
            transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
            _hover={{
                boxShadow: "0 7px 14px rgba(0, 0, 0, 0.1)",
                transform: "translateY(-2px)",
            }}
            m="4"
        >
            <Text
                fontWeight="bold"
                mb="4"
                fontSize="xl"
                borderBottom="1px"
                borderColor="gray.200"
                pb="2"
            >
                {title}
            </Text>
            <Box
                ref={setNodeRef}
                borderRadius="8"
                flex="1"
                p="2"
                overflowY="auto"
                flexDirection="column"
                css={{
                    '&::-webkit-scrollbar': {
                        width: '4px',
                    },
                    '&::-webkit-scrollbar-track': {
                        width: '6px',
                    },
                    '&::-webkit-scrollbar-thumb': {
                        background: 'gray.400',
                        borderRadius: '24px',
                    },
                }}
            >
                {items.map((item, index) => (
                    <Flex key={index} alignItems="center">
                        <Avatar name={item.user} src={item.avatarUrl} size="sm" mr="2" />
                        <KanbanCard
                            title={item.title}
                            description={item.description}
                            user={item.user}
                            avatarUrl={item.avatarUrl}
                            index={index}
                            parent={title}
                        />
                    </Flex>
                ))}
            </Box>
        </Flex>
    );
}
