import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Box, Typography, Paper, Link } from '@mui/material';

const TasksContainer = ({ socket }) => {
    const [tasks, setTasks] = useState({});

    useEffect(() => {
        const fetchTasks = () => {
            fetch('http://localhost:4000/api')
                .then(res => res.json())
                .then(data => setTasks(data));
        };
        fetchTasks();
    }, []);

    useEffect(() => {
        socket.on('tasks', data => {
            setTasks(data);
        });
    }, [socket]);

    const handleDragEnd = ({ destination, source }) => {
        if (!destination) return;
        if (
            destination.index === source.index &&
            destination.droppableId === source.droppableId
        )
            return;

        socket.emit('taskDragged', {
            source,
            destination,
        });
    };

    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            height: '100%',
            padding: '20px',
            backgroundColor: 'transparent',
            border: '1px solid',
            backgroundImage: 'url("")',
            backgroundSize: 'cover',







        }}>
            <DragDropContext onDragEnd={handleDragEnd}>
                {Object.entries(tasks).map(([key, task]) => (
                    <Box key={task.title} sx={{ marginBottom: '20px' }}>
                        <Typography variant='h5' sx={{ marginBottom: '10px' }}>
                            {task.title} Tasks
                        </Typography>
                        <Paper elevation={3} sx={{ padding: '10px' }}>
                            <Droppable droppableId={task.title}>
                                {(provided) => (
                                    <Box ref={provided.innerRef} {...provided.droppableProps}>
                                        {task.items.map((item, index) => (
                                            <Draggable key={item.id} draggableId={item.id} index={index}>
                                                {(provided) => (
                                                    <Paper
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        sx={{ padding: '10px', margin: '0 0 10px 0' }}
                                                    >
                                                        <Typography variant='body1'>{item.title}</Typography>
                                                        <Link
                                                            component={RouterLink}
                                                            to={`/comments/${task.title}/${item.id}`}
                                                            underline='hover'
                                                        >
                                                            {item.comments.length > 0 ? 'View Comments' : 'Add Comment'}
                                                        </Link>
                                                    </Paper>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </Box>
                                )}
                            </Droppable>
                        </Paper>
                    </Box>
                ))}
            </DragDropContext>
        </Box>
    );
};

export default TasksContainer;
