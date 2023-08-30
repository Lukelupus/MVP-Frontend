import React from "react";
import { useShoppingCart } from "../context/ShoppingCartContext.tsx";
import { Button, Stack } from "react-bootstrap";
import formatCurrency from "../utilities/formatCurrency";

function CartItem(props) {
  const { item, produtos } = props;
  const { removeFromCard, decreaseCardQuantity, increaseCardQuantity } =
    useShoppingCart();

  const produto = produtos.find((i) => i._id === item.id);
  if (produto === null) {
    return null;
  }
  return (
    <Stack direction="horizontal" gap={2} className="align-items-center">
      <img
        alt={produto.name}
        src={"/images/" + produto.img}
        style={{
          width: "95px",
          height: "75px",
          objectFit: "cover",
          fontSize: ".75rem",
        }}
      ></img>
      <div className="me-auto">
        {produto.name}{" "}
        {item.quantity > 0 && (
          <span className="text-muted">x{item.quantity}</span>
        )}
      </div>
      <div className="text-muted" style={{ fontSize: ".65rem" }}>
        {formatCurrency(item.price)}
      </div>
      <div className="text-muted" style={{ fontSize: ".65rem" }}>
        {formatCurrency(item.price * item.quantity)}
      </div>
      <Button
        variant="outline-danger"
        size="sm"
        onClick={() => removeFromCard(item.id)}
      >
        &times;
      </Button>
      <Button size="sm" onClick={() => decreaseCardQuantity(item.id)}>
        -
      </Button>
      <Button
        size="sm"
        onClick={() => increaseCardQuantity(item.id, item.price)}
      >
        +
      </Button>
    </Stack>
  );
}

export default CartItem;
