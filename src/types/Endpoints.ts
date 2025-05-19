import { Card } from "./api/Card";
import { CardPack } from "./CardPack";
import { CardRarity, CardRarityType } from "./CardRarities";
import { Meta } from "src/types/api/Meta";
import { CardSet } from "./CardSet";
import { CardType } from "./CardType";
import { CardElement } from "./CardElement";

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

  POST_CARD_INTENT_LANGUAGE: () =>
    `/api/user/card/intent/`,

  SINGLE_CARD_LANGUAGE: (cardId: string) =>
    `/api/user/card/${cardId}`,

  PERFECT_TRADES: () =>
    `/api/user/matched-trades/list`,

  MATCHED_TRADES: () =>
    `/api/user/recommendations/list`,

  USER: () =>
    `/api/user/data`,

} as const;

export type EndpointsQueryParams = {
  CARD_LIST: {
    rarity?: CardRarity[];
    element?: CardElement[];
    type?: CardType[];
    set?: CardSet[];
    pack?: CardPack[];
    name?: string;
    languageCode: string;
    limit: string;
    page: string;
  };
}

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