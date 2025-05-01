import { Card } from "./Card";

export interface Trade {
  id: string;
  userFriendCode: string;
  offeredCards: Card[];
  wantedCard: Card;
}