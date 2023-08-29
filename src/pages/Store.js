import React from "react";
import { Row, Col } from "react-bootstrap";
import StoreItem from "../components/StoreItem";
import { useShoppingCart } from "../context/ShoppingCartContext.tsx";

function Store() {
  const { produtos } = useShoppingCart();
  return (
    <>
      <h1>Loja</h1>
      <Row className="g-3" md={2} xs={1} lg={3}>
        {produtos.map((item) => {
          return (
            <Col key={item._id}>
              <StoreItem {...item} />
            </Col>
          );
        })}
      </Row>
    </>
  );
}

export default Store;
