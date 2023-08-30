import React, { useState } from "react";
import formatCurrency from "../utilities/formatCurrency";
import { Button, Card, ButtonGroup } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext.tsx";
import { Link } from "react-router-dom";
import Produto from "../pages/Produto";

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
  const [selectedValue, setSelectedValue] = useState("");

  const quantity = getItemNumber(_id);
  return (
    <>
      <Card className="h-100">
        <Link to={"/produto/" + _id}>
          <Card.Img
            variant="top"
            src={"images/" + img}
            height="200px"
            style={{ objectFit: "cover" }}
          />
        </Link>
        <Card.Body className="d-flex flex-column">
          <Card.Title className="d-flex flex-column justify-content-between align-items-baseline mb-4">
            <span style={{ height: "4rem" }} className="fs-5 mb-2 w-100">
              {name}
            </span>
            <ButtonGroup size="sm" horizontal>
              <Button
                size="sm"
                variant={
                  selectedValue === dailyPrice.$numberDecimal
                    ? "primary"
                    : "light"
                }
                onClick={() => setSelectedValue(dailyPrice.$numberDecimal)}
              >
                Diária: {formatCurrency(dailyPrice.$numberDecimal)}
              </Button>
              <Button
                size="sm"
                variant={
                  selectedValue === weeklyPrice.$numberDecimal
                    ? "primary"
                    : "light"
                }
                onClick={() => setSelectedValue(weeklyPrice.$numberDecimal)}
              >
                Semanal: {formatCurrency(weeklyPrice.$numberDecimal)}
              </Button>
              <Button
                size="sm"
                variant={
                  selectedValue === fortNightPrice.$numberDecimal
                    ? "primary"
                    : "light"
                }
                onClick={() => setSelectedValue(fortNightPrice.$numberDecimal)}
              >
                Quinzenal: {formatCurrency(fortNightPrice.$numberDecimal)}
              </Button>
              <Button
                size="sm"
                variant={
                  selectedValue === monthlyPrice.$numberDecimal
                    ? "primary"
                    : "light"
                }
                onClick={() => setSelectedValue(monthlyPrice.$numberDecimal)}
              >
                Mensal: {formatCurrency(monthlyPrice.$numberDecimal)}
              </Button>
            </ButtonGroup>
          </Card.Title>
          <div className="mt-auto">
            {quantity === 0 ? (
              <Button
                disabled={selectedValue === "" ? true : false}
                className="w-100"
                onClick={() => increaseCardQuantity(_id, selectedValue)}
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
                  <Button
                    onClick={() => increaseCardQuantity(_id, selectedValue)}
                  >
                    +
                  </Button>
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
