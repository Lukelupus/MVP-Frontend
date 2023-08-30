import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Image,
  Card,
  ButtonGroup,
  Button,
} from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext.tsx";
import { useParams } from "react-router-dom";
import formatCurrency from "../utilities/formatCurrency";

function Produto() {
  const [selectedValue, setSelectedValue] = useState("");

  const {
    produtos,
    removeFromCard,
    decreaseCardQuantity,
    increaseCardQuantity,
    getItemNumber,
  } = useShoppingCart();
  const productId = useParams();

  const produto = produtos.find((i) => i._id === productId.id);
  const quantity = produto ? getItemNumber(produto._id) : 0;
  return (
    <Container className="mt-5">
      {produto && (
        <Row>
          <Col md={6}>
            <Image alt={produto.name} src={"/images/" + produto.img}></Image>
          </Col>
          <Col md={6}>
            <Card>
              <Card.Body>
                <Card.Title>{produto.name}</Card.Title>
                <Card.Text>{produto.description}</Card.Text>
                <Card.Text>{produto.info}</Card.Text>
                <ButtonGroup size="md" horizontal>
                  <Button
                    size="md"
                    variant={
                      selectedValue === produto.dailyPrice.$numberDecimal
                        ? "primary"
                        : "light"
                    }
                    onClick={() =>
                      setSelectedValue(produto.dailyPrice.$numberDecimal)
                    }
                  >
                    Diária: {formatCurrency(produto.dailyPrice.$numberDecimal)}
                  </Button>
                  <Button
                    size="md"
                    variant={
                      selectedValue === produto.weeklyPrice.$numberDecimal
                        ? "primary"
                        : "light"
                    }
                    onClick={() =>
                      setSelectedValue(produto.weeklyPrice.$numberDecimal)
                    }
                  >
                    Semanal:{" "}
                    {formatCurrency(produto.weeklyPrice.$numberDecimal)}
                  </Button>
                  <Button
                    size="md"
                    variant={
                      selectedValue === produto.fortNightPrice.$numberDecimal
                        ? "primary"
                        : "light"
                    }
                    onClick={() =>
                      setSelectedValue(produto.fortNightPrice.$numberDecimal)
                    }
                  >
                    Quinzenal:{" "}
                    {formatCurrency(produto.fortNightPrice.$numberDecimal)}
                  </Button>
                  <Button
                    size="md"
                    variant={
                      selectedValue === produto.monthlyPrice.$numberDecimal
                        ? "primary"
                        : "light"
                    }
                    onClick={() =>
                      formatCurrency(produto.monthlyPrice.$numberDecimal)
                    }
                  >
                    Mensal:{" "}
                    {formatCurrency(produto.monthlyPrice.$numberDecimal)}
                  </Button>
                </ButtonGroup>
              </Card.Body>
            </Card>
            {quantity === 0 ? (
              <Button
                className="w-100 mt-3"
                disabled={selectedValue === "" ? true : false}
                onClick={() => increaseCardQuantity(produto._id, selectedValue)}
              >
                {" "}
                Adicionar ao Carrinho
              </Button>
            ) : (
              <div
                className="d-flex align-items-center flex-column mt-3"
                style={{ gap: ".5rem" }}
              >
                <div
                  className="d-flex align-items-center flex-row"
                  style={{ gap: ".5rem" }}
                >
                  <Button onClick={() => decreaseCardQuantity(produto._id)}>
                    -
                  </Button>
                  <div>
                    <span className="fs-3">{quantity}</span> item no carrinho
                  </div>
                  <Button
                    onClick={() =>
                      increaseCardQuantity(produto._id, selectedValue)
                    }
                  >
                    +
                  </Button>
                </div>
                <Button
                  onClick={() => removeFromCard(produto._id)}
                  variant="danger"
                  size="sm"
                >
                  Remover
                </Button>
              </div>
            )}
          </Col>
        </Row>
      )}
    </Container>
  );
}

export default Produto;
