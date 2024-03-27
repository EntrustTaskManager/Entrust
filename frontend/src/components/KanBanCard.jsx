import { Flex, Text } from "@chakra-ui/react";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

const KanbanCard = ({ title, index, parent }) => {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: `${parent}-${index}-${title}`, // Ensuring a unique ID
        data: {
            title,
            index,
            parent,
        },
    });

    const style = {
        transform: CSS.Translate.toString(transform),
    };

    return (
        <Flex
            padding="3"
            backgroundColor="white"
            marginY="2"
            marginX="auto"
            maxWidth="80%"
            borderRadius="lg"
            border="1px solid"
            borderColor="gray.200"
            boxShadow="0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
            transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
            _hover={{
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.04)",
                transform: "translateY(-4px)",
            }}
            {...style}
            {...listeners}
            {...attributes}
            ref={setNodeRef}
        >
            <Text fontWeight="semibold" textAlign="center" flex="1">
                {title}
            </Text>
        </Flex>
    );
};

export default KanbanCard;
