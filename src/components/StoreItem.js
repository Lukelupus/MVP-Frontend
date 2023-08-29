import React from "react";
import formatCurrency from "../utilities/formatCurrency";
import { Button, Card } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext.tsx";

function StoreItem({
  _id,
  name,
  img,
  description,
  info,
  dailyPrice,
  weeklyPrice,
  fortNightPrice,
  monthlyPrice,
}) {
  const {
    getItemNumber,
    increaseCardQuantity,
    decreaseCardQuantity,
    removeFromCard,
  } = useShoppingCart();
  const quantity = getItemNumber(_id);
  return (
    <>
      <Card className="h-100">
        <Card.Img
          variant="top"
          src={"images/" + img}
          height="200px"
          style={{ objectFit: "cover" }}
        />
        <Card.Body className="d-flex flex-column">
          <Card.Title className="d-flex flex-column justify-content-between align-items-baseline mb-4">
            <span className="fs-2">{name}</span>
            <div>
              <span className="ms-2 text-muted">
                {formatCurrency(dailyPrice.$numberDecimal)}
              </span>
              <span className="ms-2 text-muted">
                {formatCurrency(weeklyPrice.$numberDecimal)}
              </span>
              <span className="ms-2 text-muted">
                {formatCurrency(fortNightPrice.$numberDecimal)}
              </span>
              <span className="ms-2 text-muted">
                {formatCurrency(monthlyPrice.$numberDecimal)}
              </span>
            </div>
          </Card.Title>
          <div className="mt-auto">
            {quantity === 0 ? (
              <Button
                className="w-100"
                onClick={() => increaseCardQuantity(_id)}
              >
                {" "}
                Adicionar ao Carrinho
              </Button>
            ) : (
              <div
                className="d-flex align-items-center flex-column"
                style={{ gap: ".5rem" }}
              >
                <div
                  className="d-flex align-items-center flex-row"
                  style={{ gap: ".5rem" }}
                >
                  <Button onClick={() => decreaseCardQuantity(_id)}>-</Button>
                  <div>
                    <span className="fs-3">{quantity}</span> item no carrinho
                  </div>
                  <Button onClick={() => increaseCardQuantity(_id)}>+</Button>
                </div>
                <Button
                  onClick={() => removeFromCard(_id)}
                  variant="danger"
                  size="sm"
                >
                  Remover
                </Button>
              </div>
            )}
          </div>
        </Card.Body>
      </Card>
    </>
  );
}

export default StoreItem;
