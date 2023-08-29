import React from "react";
import { useShoppingCart } from "../context/ShoppingCartContext.tsx";
import { Button, Stack } from "react-bootstrap";
import formatCurrency from "../utilities/formatCurrency";

function CartItem(props) {
  const { item, produtos } = props;
  const { removeFromCard } = useShoppingCart();

  const produto = produtos.find((i) => i._id === item.id);
  if (produto === null) {
    return null;
  }
  return (
    <Stack direction="horizontal" gap={2} className="align-items-center">
      <img
        alt={produto.name}
        src={"images/" + produto.img}
        style={{ width: "125px", height: "75px", objectFit: "cover" }}
      ></img>
      <div className="me-auto">
        {produto.name}{" "}
        {item.quantity > 0 && (
          <span className="text-muted">x{item.quantity}</span>
        )}
      </div>
      <div className="text-muted" style={{ fontSize: ".75rem" }}>
        {formatCurrency(produto.weeklyPrice.$numberDecimal)}
      </div>
      <div className="text-muted" style={{ fontSize: ".75rem" }}>
        {formatCurrency(produto.weeklyPrice.$numberDecimal * item.quantity)}
      </div>
      <Button
        variant="outline-danger"
        size="sm"
        onClick={() => removeFromCard(item.id)}
      >
        &times;
      </Button>
    </Stack>
  );
}

export default CartItem;
