import { useState } from 'react'
import { ChakraProvider, theme, Text } from "@chakra-ui/react";
import KanbanBoard  from "./components/KanbanBoard.jsx";
import Login from "./components/Login";
import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";

function App() {
  const [count, setCount] = useState(0)

  return (
      <ChakraProvider theme={theme}>
          <BrowserRouter>

              <Routes>

                  <Route path='/' element={<Login />} />

                  <Route path='/KanbanBoard' element={<KanbanBoard />} />

                  {/*<Route path='/comments/:category/:id' element={<Comments />} />*/}

              </Routes>

          </BrowserRouter>
      </ChakraProvider>
  )
}

export default App
