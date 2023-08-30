import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Home from "./pages/Home";
import Store from "./pages/Store";
import { ShoppingCartProvider } from "./context/ShoppingCartContext.tsx";
import Produto from "./pages/Produto";

function App() {
  return (
    <>
      <ShoppingCartProvider>
        <Navbar />
        <Container className="mb-4">
          <Routes>
            <Route path="/login" element={<Home />} />
            <Route path="/" element={<Store />} />
            <Route path="/produto/:id" element={<Produto />} />
          </Routes>
        </Container>
      </ShoppingCartProvider>
    </>
  );
}

export default App;
