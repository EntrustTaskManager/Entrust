import React from "react";
import { Link } from "react-router-dom";
import { Box, Typography } from "@mui/material";

const TasksContainer = ({ socket }) => {
  return (
    <Box className="container" sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <Box className="pending__wrapper" sx={{ width: "32%" }}>
        <Typography variant="h3">Pending Tasks</Typography>
        <Box className="pending__container" sx={{ border: "1px solid #ddd", borderRadius: "5px", minHeight: "55vh", padding: "5px" }}>
          <Box className="pending__items" sx={{ backgroundColor: "#eee3cb", borderRadius: "5px", marginBottom: "10px", padding: "15px" }}>
            <Typography>Newly assigned tasks and projects.</Typography>
            <Typography className="comment">
              <Link to="/comments">2 Comments</Link>
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box className="ongoing__wrapper" sx={{ width: "32%" }}>
        <Typography variant="h3">Ongoing Tasks</Typography>
        <Box className="ongoing__container" sx={{ border: "1px solid #ddd", borderRadius: "5px", minHeight: "55vh", padding: "5px" }}>
          <Box className="ongoing__items" sx={{ backgroundColor: "#d2daff", borderRadius: "5px", marginBottom: "10px", padding: "15px" }}>
            <Typography>Improve on Entrust</Typography>
            <Typography className="comment">
              <Link to="/comments">Add Comment</Link>
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box className="completed__wrapper" sx={{ width: "32%" }}>
        <Typography variant="h3">Completed Tasks</Typography>
        <Box className="completed__container" sx={{ border: "1px solid #ddd", borderRadius: "5px", minHeight: "55vh", padding: "5px" }}>
          <Box className="completed__items" sx={{ backgroundColor: "#7fb77e", borderRadius: "5px", marginBottom: "10px", padding: "15px" }}>
            <Typography>Debug the Notification center</Typography>
            <Typography className="comment">
              <Link to="/comments">2 Comments</Link>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default TasksContainer;
