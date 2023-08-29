import React, { ReactNode, createContext, useContext, useState, useEffect } from "react";
import ShoppingCart from "../components/ShoppingCart";
import axios from "axios";
import useLocalStorage from "../hooks/useLocalStorage.tsx";

type ShoppingCartProviderProps = {
  children: ReactNode;
};

type CartItem = {
  id: any;
  quantity: number;
};


type ShoppingCartContextType = {
  availableProducts: () => void;
  openCart:() => void;
  closeCart:() =>void;
  getItemNumber: (id: number) => number;
  increaseCardQuantity: (id: number) => void;
  decreaseCardQuantity: (id: number) => void;
  removeFromCard: (id: number) => void;
  cardQuantity: number;
  cardItens: CartItem[];
  produtos: Object;
};


const ShoppingCartContext = createContext({} as ShoppingCartContextType);

export function useShoppingCart() {
  return useContext(ShoppingCartContext);
}

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [cardItens, setCardItens] = useLocalStorage<CartItem[]>("carrinho-de-compras", []);
  const cardQuantity = cardItens.reduce(
    (quantity, item) => item.quantity + quantity, 0
  )
  const openCart = () => setIsOpen(true)
  const closeCart = () => setIsOpen(false)
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);

  const instance = axios.create({ baseURL: "http://localhost:8000" });

  useEffect(() => {
    instance
      .get("/products")
      .then((response) => {
        setProdutos(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  function availableProducts() {
    return produtos
  }

  function getItemNumber(id: any) {
    
   return cardItens.find((item) => item.id === id)?.quantity || 0;
  }

  function increaseCardQuantity(id: number) {
    setCardItens((currentItens) => {
      if (currentItens.find((item) => item.id === id) == null) {
        return [...currentItens, { id: id, quantity: 1 }];
      } else {
        return currentItens.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      }
    });
  }

  function decreaseCardQuantity(id: number) {
    setCardItens((currentItens) => {
      if (currentItens.find((item) => item.id === id)?.quantity === 1) {
        return currentItens.filter((item) => item.id !== id);
      } else {
        return currentItens.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  }

  function removeFromCard(id: number) {
    setCardItens((currentItens) => {
      return currentItens.filter((item) => item.id !== id);
    });
  }

  return (
    <ShoppingCartContext.Provider
    value={{
      availableProducts,
      getItemNumber,
      increaseCardQuantity,
      decreaseCardQuantity,
      removeFromCard,
      openCart,
      closeCart,
      cardItens,
      cardQuantity,
      produtos
    }}
  >
    {children}
    <ShoppingCart produtos={produtos} isOpen={isOpen}/>
  </ShoppingCartContext.Provider>
  );
}
