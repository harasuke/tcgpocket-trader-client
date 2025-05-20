import { CardRarity } from "../CardRarities";

export type Card = {
  /** id of the card used on the database */
  id: string;
  /** id of the card used in the set-pack (ex: a1-012, a2-034, ...) */
  idCard: string;
  imageUrl: string;
  name: string;
  rarity: CardRarity;
  isWanted: boolean;
  isOffered: boolean;
}