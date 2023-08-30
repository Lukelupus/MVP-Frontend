import React from "react";
import { Offcanvas, Stack } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext.tsx";
import CartItem from "./CartItem.js";
import formatCurrency from "../utilities/formatCurrency.js";

function ShoppingCart({ isOpen, produtos }) {
  const { closeCart, cardItens } = useShoppingCart();

  return (
    <Offcanvas show={isOpen} onHide={closeCart} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Meu Carrinho</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Stack gap={3}>
          {cardItens.map((item) => {
            return <CartItem key={item.id} produtos={produtos} item={item} />;
          })}
          <div className="ms-auto fw-bold fs-5">
            Total{" "}
            {formatCurrency(
              cardItens.reduce((total, cartItem) => {
                return total + cartItem.price * cartItem.quantity;
              }, 0)
            )}
          </div>
        </Stack>
      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default ShoppingCart;
