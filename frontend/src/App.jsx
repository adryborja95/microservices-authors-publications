import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Container } from "@mui/material";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Authors from "./pages/Authors";
import Publications from "./pages/Publications";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Container sx={{ marginTop: 4 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/authors" element={<Authors />} />
          <Route path="/publications" element={<Publications />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
