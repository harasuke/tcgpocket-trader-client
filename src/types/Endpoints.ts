import { CardRarityType } from "./CardRarities";

export const Endpoints = {
  SINGLE_CARD: (card: string) =>
    `/api/card/${card}`,

  MANY_TRADE: (amount: number, rarity: CardRarityType) =>
    `/api/card/batch/${amount}/${rarity}`,

  TRADE: (id: string) =>
    `/api/trade/${id}`
} as const;