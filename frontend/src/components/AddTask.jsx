import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';

const AddTask = ({ socket }) => {
    const [task, setTask] = useState("");

    const handleAddTodo = (e) => {
        e.preventDefault();
        socket.emit("createTask", { task });
        setTask("");
    };

    return (
        <Box
            component="form"
            onSubmit={handleAddTodo}
            sx={{
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 2,
                marginTop: 2
            }}
            noValidate
            autoComplete="off"
        >
            <Typography variant="h6" component="h2">
                New Task
            </Typography>
            <TextField
                label="Task"
                variant="outlined"
                name="task"
                id="task"
                value={task}
                required
                onChange={(e) => setTask(e.target.value)}
                sx={{ width: '35%' }} // Adjust the width as needed
            />
            <Button type="submit" variant="contained" color="primary">
                Submit
            </Button>
        </Box>
    );
};

export default AddTask;
