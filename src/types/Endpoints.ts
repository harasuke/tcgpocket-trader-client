import { Card } from "./api/Card";
import { CardPack } from "./CardPack";
import { CardRarity, CardRarityType } from "./CardRarities";
import { Meta } from "src/types/api/Meta";
import { CardSet } from "./CardSet";
import { CardType } from "./CardType";
import { CardElement } from "./CardElement";
import { CardLanguage } from "./CardLanguage";

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

  POST_CARD_INTENT_OFFER_LANGUAGE: () =>
    `/api/user/card/intent/`,

  POST_CARD_INTENT_LANGUAGE: (intent: "offer" | "want") =>
    intent == "offer" ? `/api/user/offered` : `/api/user/wanted`,

  SINGLE_CARD_LANGUAGE: (cardId: string) =>
    `/api/card/languages/${cardId}`,

  PERFECT_TRADES: () =>
    `/api/user/matched-trades/list`,

  MATCHED_TRADES: () =>
    `/api/user/recommendations/list`,

  /**
   *  This api should be called to fetch all the offered card by the users
   */
  ALL_WANTED_CARDS: () =>
    `/api/trade/wanted`,

  /**
   *  This api should be called to fetch all the wanted card by the userss
   */
  ALL_OFFERED_CARDS: () =>
    `/api/trade/offered`,

  USER_OFFERED_CARDS: (wantedRelationId: string) => 
    `/api/user/offered/${wantedRelationId}`,

  USER_WANTED_CARDS: (offeredRelationId: string) => 
    `/api/user/wanted/${offeredRelationId}`,

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

  ALL_OFFERED_CARDS: {
    limit: string;
    page: string;
  }

  ALL_WANTED_CARDS: {
    limit: string;
    page: string;
  }

  USER_OFFERED_CARDS: {
    limit: string;
    page: string;
  }

  USER_WANTED_CARDS: {
    limit: string;
    page: string;
  }
}

type SingleCard = {

}

export type GivenLanguageCard = {
  languageCode: CardLanguage,
  isWanted: boolean,
  isOffered: boolean
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

  ALL_WANTED_CARDS: {
    data: {
      wantedRelationId: string; // this id is used later to ask for all the user wanted cards.
      baseCardId: string;
      languageCode: string;
      imageUrl: string;
    }[];
    meta: Meta;
  }
  
  ALL_OFFERED_CARDS: {
    data: {
      offeredRelationId: string; // this id is used later to ask for all the user offered cards.
      baseCardId: string;
      languageCode: string;
      imageUrl: string;
    }[];
    meta: Meta;
  }

  USER_OFFERED_CARDS: {
    data: {
      baseCardId: string;
      languageCode: string;
      imageUrl: string;
      name: string;
    }[];
    meta: Meta;
  }

  USER_WANTED_CARDS: {
    data: {
      baseCardId: string;
      languageCode: string;
      imageUrl: string;
      name: string;
    }[];
    meta: Meta;
  }

  SINGLE_CARD: SingleCard,

  SINGLE_CARD_LANGUAGE: GivenLanguageCard[]

  POST_CARD_INTENT_LANGUAGE: POST_CARD_INTENT_LANGUAGE_MOVED | POST_CARD_INTENT_LANGUAGE_ADDED | POST_CARD_INTENT_LANGUAGE_REMOVED
}


type BASE_POST_CARD_INTENT_LANGUAGE = {
  success: boolean;
}
type POST_CARD_INTENT_LANGUAGE_MOVED = BASE_POST_CARD_INTENT_LANGUAGE & {
  moved: true;
  from: "wanted" | "offered";
  to: "offered" | "wanted";
  added?: never;
  removed?: never;
};

type POST_CARD_INTENT_LANGUAGE_ADDED = BASE_POST_CARD_INTENT_LANGUAGE & {
  added: true;
  to: "wanted" | "offered"
  from?: never;
  moved?: never;
  removed?: never;
};

type POST_CARD_INTENT_LANGUAGE_REMOVED = BASE_POST_CARD_INTENT_LANGUAGE & {
  removed: true;
  from: "wanted" | "offered";
  to?: never;
  moved?: never;
  added?: never;
};
