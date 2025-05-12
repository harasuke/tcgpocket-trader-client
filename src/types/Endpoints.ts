import { Card } from "./api/Card";
import { CardRarityType } from "./CardRarities";
import { Meta } from "src/types/api/Meta";

export const Endpoints = {

  STORAGE_BUCKET: (extraPath: string) =>
    `https://mlnvqcdetepfeuzcwdop.supabase.co/storage/v1/object/public/tcgpocket-trader-bucket/${extraPath}`,

  SINGLE_CARD: (card: string) =>
    `/api/card/${card}`,

  CARD_LIST: () =>
    `/api/card/list`,

  RECENT_TRADES: () =>
    `/api/trade/list`,

  MANY_TRADE: (amount: number, rarity: CardRarityType) =>
    `/api/card/batch/${amount}/${rarity}`,

  TRADE: (id: string) =>
    `/api/trade/${id}`,

  POST_CONFIRM_TRADE: () =>
    `/api/trade`,

  PERFECT_TRADES: () =>
    `/api/user/matched-trades/list`,

  MATCHED_TRADES: () =>
    `/api/user/recommendations/list`,

} as const;

export type EndpointsResponseType = {
  CARD_LIST: {
    data: Card[];
    meta: Meta;
  };

  PERFECT_TRADES: {
    data: {
      id: string, // the id of the trade
      userFriendCode: string // friendcode string with only number of the trade creator
      offeredCards: Card[]
      wantedCard: Card
    }[],
    meta: Meta;
  },

  MATCHED_TRADES: {
    data: {
      id: string, // the id of the trade
      userFriendCode: string // friendcode string with only number of the trade creator
      offeredCards: Card[]
      wantedCard: Card
    }[],
    meta: Meta;
  }
}