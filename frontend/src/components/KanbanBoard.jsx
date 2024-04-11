import { DndContext, rectIntersection } from "@dnd-kit/core";
import '../App.css'
import KanbanLane from "./KanBanLane";
import AddCard from "./AddCard";
import { Flex, Box  } from '@chakra-ui/react';
import { useState } from "react";
import LiveChatWidget from "./LiveChatWidget";
import TeacherPanel from './TeacherPanel';
import SidePanel from './SidePanel';


export default function KanbanBoard() {
    const [uItems, setuItems] = useState([]);
    const [doneItems, setDoneItems] = useState([]);
    const [inProgressItems, setInProgressItems] = useState([]);
    const [todoItems, setTodoItems] = useState([]);


    const addNewCard = (title) => {
        
        const newCard = { title, status: 'Unassigned' }; 
        setuItems(prevItems => [...prevItems, newCard]);

       
        fetch('http://localhost:3000/tasks', { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newCard),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
        
        })
        .catch(error => {
            console.error("Error posting new task to backend:", error);
           
        });
    };

    return (
        <DndContext
            collisionDetection={rectIntersection}
            onDragEnd={(e) => {
                const container = e.over?.id;
                const title = e.active.data.current?.title ?? "";
                const index = e.active.data.current?.index ?? 0;
                const parent = e.active.data.current?.parent ?? "ToDo";

                if (container === "ToDo") {
                    setTodoItems([...todoItems, { title }]);
                } else if (container === "Done") {
                    setDoneItems([...doneItems, { title }]);
                } else if (container === "Unassigned") {
                    setuItems([...uItems, { title }]);
                } else {
                    setInProgressItems([...inProgressItems, { title }]);
                }

                if (parent === "ToDo") {
                    setTodoItems([...todoItems.slice(0, index), ...todoItems.slice(index + 1)]);
                } else if (parent === "Done") {
                    setDoneItems([...doneItems.slice(0, index), ...doneItems.slice(index + 1)]);
                } else if (parent === "Unassigned") {
                    setuItems([...uItems.slice(0, index), ...uItems.slice(index + 1)]);
                } else {
                    setInProgressItems([...inProgressItems.slice(0, index), ...inProgressItems.slice(index + 1)]);
                }
            }}
        >
            <Flex flexDirection="column">
                <AddCard addCard={addNewCard} />
                <Flex flex="3">
                    <KanbanLane title="Unassigned" items={uItems} />
                    <KanbanLane title="ToDo" items={todoItems} />
                    <KanbanLane title="In Progress" items={inProgressItems} />
                    <KanbanLane title="Done" items={doneItems} />

                </Flex>
                <LiveChatWidget />
                <TeacherPanel
                    uItems={uItems}
                    todoItems={todoItems}
                    inProgressItems={inProgressItems}
                    doneItems={doneItems}
                />
                <SidePanel />
            </Flex>
        </DndContext>
    );
}


// import { DndContext, rectIntersection } from "@dnd-kit/core";
// import '../App.css'
// import KanbanLane from "./KanBanLane";
// import AddCard from "./AddCard";
// import { Flex, Box  } from '@chakra-ui/react';
// import { useState } from "react";
// import LiveChatWidget from "./LiveChatWidget";
// import TeacherPanel from './TeacherPanel';
// import SidePanel from './SidePanel';


// export default function KanbanBoard() {
//     const [uItems, setuItems] = useState([]);
//     const [doneItems, setDoneItems] = useState([]);
//     const [inProgressItems, setInProgressItems] = useState([]);
//     const [todoItems, setTodoItems] = useState([]);


//     const addNewCard = (title) => {
//         setuItems([...uItems, { title }]);
//     };


//     return (
//         <DndContext
//             collisionDetection={rectIntersection}
//             onDragEnd={(e) => {
//                 const container = e.over?.id;
//                 const title = e.active.data.current?.title ?? "";
//                 const index = e.active.data.current?.index ?? 0;
//                 const parent = e.active.data.current?.parent ?? "ToDo";

//                 if (container === "ToDo") {
//                     setTodoItems([...todoItems, { title }]);
//                 } else if (container === "Done") {
//                     setDoneItems([...doneItems, { title }]);
//                 } else if (container === "Unassigned") {
//                     setuItems([...uItems, { title }]);
//                 } else {
//                     setInProgressItems([...inProgressItems, { title }]);
//                 }

//                 if (parent === "ToDo") {
//                     setTodoItems([...todoItems.slice(0, index), ...todoItems.slice(index + 1)]);
//                 } else if (parent === "Done") {
//                     setDoneItems([...doneItems.slice(0, index), ...doneItems.slice(index + 1)]);
//                 } else if (parent === "Unassigned") {
//                     setuItems([...uItems.slice(0, index), ...uItems.slice(index + 1)]);
//                 } else {
//                     setInProgressItems([...inProgressItems.slice(0, index), ...inProgressItems.slice(index + 1)]);
//                 }
//             }}
//         >
//             <Flex flexDirection="column">
//                 <AddCard addCard={addNewCard} />
//                 <Flex flex="3">
//                     <KanbanLane title="Unassigned" items={uItems} />
//                     <KanbanLane title="ToDo" items={todoItems} />
//                     <KanbanLane title="In Progress" items={inProgressItems} />
//                     <KanbanLane title="Done" items={doneItems} />

//                 </Flex>
//                 <LiveChatWidget />
//                 <TeacherPanel
//                     uItems={uItems}
//                     todoItems={todoItems}
//                     inProgressItems={inProgressItems}
//                     doneItems={doneItems}
//                 />
//                 <SidePanel />
//             </Flex>
//         </DndContext>
//     );
// }
