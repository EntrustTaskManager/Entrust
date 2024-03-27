import { Flex, Text, Box } from '@chakra-ui/react';
import { useDroppable } from '@dnd-kit/core';
import KanbanCard from './KanBanCard'; // Assuming KanbanCard is in the same directory

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
            bgColor="white"
            borderRadius="lg"
            boxShadow="0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)"
            transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
            _hover={{
                boxShadow: "0 7px 14px rgba(0, 0, 0, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08)",
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
                bgGradient="linear(to-b, gray.100, gray.200)"
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
                {items.map((item, key) => (
                    <KanbanCard title={item.title} key={key} index={key} parent={title} />
                ))}
            </Box>
        </Flex>
    );
}

