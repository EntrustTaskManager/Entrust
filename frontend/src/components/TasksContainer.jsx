import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Link } from "react-router-dom";
import { Box, Typography } from "@mui/material";

// const TasksContainer = () => {

//     const [tasks, setTasks] = useState({});


//     useEffect(() => {

//         function fetchTasks() {

//             fetch("http://localhost:5173/api")

//                 .then((res) => res.json())

//                 .then((data) => {

//                     console.log(data);

//                     setTasks(data);

//                 });

//         }

//         fetchTasks();

//     }, []);


//     return (
//       <div className='container'>
//         <DragDropContext onDragEnd={handleDragEnd}>
//           {Object.entries(tasks).map(([_, { title, items }]) => (
//             <div className={`${title.toLowerCase()}__wrapper`} key={title}>
//               <h3>{title} Tasks</h3>
//               <div className={`${title.toLowerCase()}__container`}>
//                 <Droppable droppableId={title}>
//                   {(provided) => (
//                     <div ref={provided.innerRef} {...provided.droppableProps}>
//                       {items.map((item, index) => (
//                         <Draggable key={item.id} draggableId={item.id} index={index}>
//                           {(provided) => (
//                             <div
//                               ref={provided.innerRef}
//                               {...provided.draggableProps}
//                               {...provided.dragHandleProps}
//                               className={`${title.toLowerCase()}__items`}
//                             >
//                               <p>{item.title}</p>
//                               <p className='comment'>
//                                 <Link to={`/comments/${title}/${item.id}`}>
//                                   {item.comments.length > 0 ? 'View Comments' : 'Add Comment'}
//                                 </Link>
//                               </p>
//                             </div>
//                           )}
//                         </Draggable>
//                       ))}
//                       {provided.placeholder}
//                     </div>
//                   )}
//                 </Droppable>
//               </div>
//             </div>
//           ))}
//         </DragDropContext>
//       </div>
//     );

// };


// export default TasksContainer;


const TasksContainer = ({ socket }) => {
  return (
    <Box className="container" sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <Box className="pending__wrapper" sx={{
      width: '32%', 
      display: 'flex', 
      flexDirection: 'column', 
      gap: '1rem', 
      alignItems: 'center', 
      justifyContent: 'start'
    }}>
      <Typography variant="h5" sx={{ 
        fontWeight: 'bold', 
        color: '#333', 
        marginBottom: '1rem'
      }}>Newly Assigned</Typography>

      <Box className="pending__container" sx={{
        width: '100%',
        border: '1px solid #e0e0e0', 
        borderRadius: '10px', 
        minHeight: '55vh', 
        padding: '20px', 
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)', 
        backgroundColor: '#fff'
      }}>
        <Box className="pending__items" sx={{
          backgroundColor: '#f9f9f9', 
          borderRadius: '10px', 
          marginBottom: '10px', 
          padding: '20px', 
          transition: 'box-shadow 0.3s ease-in-out', 
          '&:hover': {
            boxShadow: '0 6px 12px rgba(0,0,0,0.15)'
          }
        }}>
          <Typography sx={{ marginBottom: '0.5rem' }}>Newly assigned tasks and projects.</Typography>
          <Typography className="comment" sx={{ 
            fontSize: '0.875rem', 
            color: '#646cff', 
            cursor: 'pointer', 
            '&:hover': {
              textDecoration: 'underline'
            }
          }}>
            <Link to="/comments" sx={{ textDecoration: 'none', color: 'inherit' }}>2 Comments</Link>
          </Typography>
        </Box>
      </Box>
    </Box>

    <Box className="pending__wrapper" sx={{
      width: '32%', 
      display: 'flex', 
      flexDirection: 'column', 
      gap: '1rem', 
      alignItems: 'center', 
      justifyContent: 'start'
    }}>
      <Typography variant="h5" sx={{ 
        fontWeight: 'bold', 
        color: '#333', 
        marginBottom: '1rem'
      }}>Pending Completion</Typography>

      <Box className="pending__container" sx={{
        width: '100%',
        border: '1px solid #e0e0e0', 
        borderRadius: '10px', 
        minHeight: '55vh', 
        padding: '20px', 
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)', 
        backgroundColor: '#fff'
      }}>
        <Box className="pending__items" sx={{
          backgroundColor: '#f9f9f9', 
          borderRadius: '10px', 
          marginBottom: '10px', 
          padding: '20px', 
          transition: 'box-shadow 0.3s ease-in-out', 
          '&:hover': {
            boxShadow: '0 6px 12px rgba(0,0,0,0.15)'
          }
        }}>
          <Typography sx={{ marginBottom: '0.5rem' }}>Pending Tasks.</Typography>
          <Typography className="comment" sx={{ 
            fontSize: '0.875rem', 
            color: '#646cff', 
            cursor: 'pointer', 
            '&:hover': {
              textDecoration: 'underline'
            }
          }}>
            <Link to="/comments" sx={{ textDecoration: 'none', color: 'inherit' }}>2 Comments</Link>
          </Typography>
        </Box>
      </Box>
    </Box>

    <Box className="pending__wrapper" sx={{
      width: '32%', 
      display: 'flex', 
      flexDirection: 'column', 
      gap: '1rem', 
      alignItems: 'center', 
      justifyContent: 'start'
    }}>
      <Typography variant="h5" sx={{ 
        fontWeight: 'bold', 
        color: '#333', 
        marginBottom: '1rem'
      }}>Compeleted</Typography>

      <Box className="pending__container" sx={{
        width: '100%',
        border: '1px solid #e0e0e0', 
        borderRadius: '10px', 
        minHeight: '55vh', 
        padding: '20px', 
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)', 
        backgroundColor: '#fff'
      }}>
        <Box className="pending__items" sx={{
          backgroundColor: '#f9f9f9', 
          borderRadius: '10px', 
          marginBottom: '10px', 
          padding: '20px', 
          transition: 'box-shadow 0.3s ease-in-out', 
          '&:hover': {
            boxShadow: '0 6px 12px rgba(0,0,0,0.15)'
          }
        }}>
          <Typography sx={{ marginBottom: '0.5rem' }}>Completed.</Typography>
          <Typography className="comment" sx={{ 
            fontSize: '0.875rem', 
            color: '#646cff', 
            cursor: 'pointer', 
            '&:hover': {
              textDecoration: 'underline'
            }
          }}>
            <Link to="/comments" sx={{ textDecoration: 'none', color: 'inherit' }}>2 Comments</Link>
          </Typography>
        </Box>
      </Box>
    </Box>
    </Box>
  );
};


export default TasksContainer;
