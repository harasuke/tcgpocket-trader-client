import { CardRarity } from "../CardRarities";

// export type Card = {
//   id: string;
//   name: string;
//   imageUrl: string;
// }

export type Card = {
  id: string;
  idCard: string;
  imageUrl: string;
  name: string;
  rarity: CardRarity
}