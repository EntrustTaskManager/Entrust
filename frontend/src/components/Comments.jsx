import React, { useState } from "react";
import socketIO from "socket.io-client";
import { useParams } from "react-router-dom";
import { Container, TextField, Button, Typography, Box, Paper } from "@mui/material";

const socket = socketIO.connect("http://localhost:4000");

const Comments = () => {
    const [comment, setComment] = useState("");

    const addComment = (e) => {
        e.preventDefault();
        console.log({
            comment,
            userId: localStorage.getItem("userId"),
        });
        setComment("");
    };

    return (
        <Container maxWidth="md" sx={{ mt: 4 }}>
            <Paper elevation={3} sx={{ p: 2 }}>
                <Box component="form" onSubmit={addComment} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Typography variant="h6">Add a comment</Typography>
                    <TextField
                        placeholder="Type your comment..."
                        multiline
                        rows={4}
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        variant="outlined"
                        fullWidth
                        required
                    />
                    <Button type="submit" variant="contained">Add Comment</Button>
                </Box>
            </Paper>

            <Paper elevation={3} sx={{ mt: 4, p: 2 }}>
                <Typography variant="h6" gutterBottom>
                    Existing Comments
                </Typography>
                {/* Comments list will go here */}
            </Paper>
        </Container>
    );
};

export default Comments;
