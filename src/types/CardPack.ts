import { CardSet } from "./CardSet";

export enum CardPack {
  CHARIZARD = 'Charizard',
  MEWTWO = 'Mewtwo',
  PIKACHU = 'Pikachu',
  MEW = 'Mew',
  PALKIA = 'Palkia',
  DIALGA = 'Dialga',
  ARCEUS = 'Arceus',
  SOLGALEO = 'Solgaleo',
  LUNALA = 'Lunala',
}

export const PackBySet = {
  [CardSet.GENETIC_APEX]: [CardPack.CHARIZARD, CardPack.PIKACHU, CardPack.MEWTWO],
  [CardSet.MYTHICAL_ISLAND]: [CardPack.MEW],
  [CardSet.SPACE_TIME_SMACKDOWN]: [CardPack.PALKIA, CardPack.DIALGA],
  [CardSet.TRIUMPHANT_LIGHT]: [CardPack.ARCEUS],
  [CardSet.SHINING_REVELRY]: [],
  [CardSet.CELESTIAL_GUARDIANS]: [CardPack.SOLGALEO, CardPack.LUNALA]
} as const;