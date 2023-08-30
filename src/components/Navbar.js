import React, { useState, useEffect } from "react";
import {
  Button,
  Container,
  Form,
  FormControl,
  Nav,
  Dropdown,
  Navbar as NavbarBs,
} from "react-bootstrap";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useShoppingCart } from "../context/ShoppingCartContext.tsx";

function Navbar() {
  const { openCart, cardQuantity, produtos } = useShoppingCart();
  const client = localStorage.getItem("token");
  const [filter, setFilter] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const filtered = produtos.filter((item) =>
      item.name.toLowerCase().includes(filter.toLowerCase())
    );
    setFilteredItems(filtered);
  }, [filter]);

  const handleFilterChange = (event) => {
    const newFilter = event.target.value;
    setFilter(newFilter);
  };

  return (
    <>
      <NavbarBs sticky="top" className="bg-white shadow-sm mb-3">
        <Container>
          <Nav className="me-auto">
            <Nav.Link to="/" as={NavLink}>
              Me Leve!
            </Nav.Link>
          </Nav>

          <Form inline className="ml-auto" style={{ marginRight: ".75rem" }}>
            <FormControl
              type="text"
              placeholder="Buscar produtos..."
              value={filter}
              onChange={handleFilterChange}
            />
            {filteredItems.length > 0 && (
              <Dropdown className="mt-2 show">
                <Dropdown.Menu show>
                  {filteredItems.map((item, index) => (
                    <Dropdown.Item key={item._id}>
                      <Link to={"produto/" + item._id}>{item.name}</Link>
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            )}
          </Form>

          <Button
            onClick={openCart}
            style={{
              width: "3rem",
              height: "3rem",
              position: "relative",
              marginLeft: "1rem",
              marginRight: "1rem",
            }}
            variant="outline-primary"
            className="rounded-circle"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-cart"
              viewBox="0 0 16 16"
            >
              <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />{" "}
            </svg>
            {cardQuantity > 0 && (
              <div
                className="rounded-circle bg-danger d-flex justify-content-center align-items-center"
                style={{
                  color: "white",
                  width: "1.5rem",
                  height: "1.5rem",
                  position: "absolute",
                  bottom: "0",
                  right: "0",
                  transform: "translate(25%, 25%)",
                }}
              >
                {cardQuantity}
              </div>
            )}
          </Button>

          {client === null ? (
            <Nav.Link to="/login" as={NavLink}>
              <Button variant="outline-primary" className="ml-2">
                {" "}
                Login
              </Button>
            </Nav.Link>
          ) : (
            <Button
              onClick={() => {
                localStorage.removeItem("token");
                navigate("#");
              }}
              className="ml-2 bg-danger"
              style={{ border: "none" }}
            >
              {" "}
              Sair
            </Button>
          )}
        </Container>
      </NavbarBs>
    </>
  );
}

export default Navbar;
