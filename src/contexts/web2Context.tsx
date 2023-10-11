"use client";
import {
  useState,
  createContext,
  ReactNode,
  useContext,
  useEffect,
} from "react";

export type Web2ContextType = {
  bullrunPrice: Number;
};

export const Web2Context = createContext<Web2ContextType | null>(null);
export function useWeb2Context() {
  return useContext(Web2Context);
}

type Props = {
  children: ReactNode;
};

export default function Web2Provider({ children }: Props) {
  const [bullrunPrice, setBullrunPrice] = useState<Number>(0);

  useEffect(() => {
    async function fetchPrices() {
      const req = await fetch(
        "https://api.dexscreener.com/latest/dex/pairs/base/0xed89cc1fc96f749cced4b94ea366a0d4c7c1826f",
        { next: { revalidate: 10 } }
      );
      const priceData = await req.json();
      setBullrunPrice(Number(priceData.pairs[0].priceUsd));
      console.log('Number(priceData.pairs[0].priceUsd)', Number(priceData.pairs[0].priceUsd))
    }

    fetchPrices();
  }, []);

  return (
    <Web2Context.Provider
      value={{
        bullrunPrice: bullrunPrice,
      }}
    >
      {children}
    </Web2Context.Provider>
  );
}
