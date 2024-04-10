import { useState } from 'react'
import { ChakraProvider, theme, Text } from "@chakra-ui/react";
import KanbanBoard  from "./components/KanbanBoard.jsx";
import Login from "./components/Login";
import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Settings from './components/Settings';
import AdminDashboard from "./components/AdminDashboard.jsx";

function App() {
  const [count, setCount] = useState(0)

  return (
      <ChakraProvider theme={theme}>
          <BrowserRouter>

              <Routes>

                  <Route path='/' element={<Login />} />

                  <Route path='/KanbanBoard' element={<KanbanBoard />} />

                  <Route path="/settings" element={<Settings />} />

                  <Route path="/admin" element={<AdminDashboard />} />

              </Routes>

          </BrowserRouter>
      </ChakraProvider>
  );
}

export default App
