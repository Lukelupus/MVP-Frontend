import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import axios from "axios";

function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = async (event) => {
    const instance = axios.create({ baseURL: "http://localhost:8000/clients" });
    event.preventDefault();
    try {
      const res = await instance.post("/login", {
        email,
        password,
      });
      localStorage.setItem("token", res.data._id);

      navigate("/");
    } catch {
      console.log(error);
      setError("Email ou senha inválidas!");
    }
  };

  return (
    <Container className="mt-5">
      <h1>Seja Bem Vindo (a)!</h1>
      <Form onSubmit={handleLogin}>
        <Form.Group controlId="email">
          <Form.Label>E-mail</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your email"
            value={email}
            onChange={handleUsernameChange}
          />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={handlePasswordChange}
          />
        </Form.Group>
        {error && <p className="text-danger">{error}</p>}
        <Button className="mt-3" variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </Container>
  );
}

export default Home;
