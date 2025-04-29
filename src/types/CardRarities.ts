export enum CardRarities {
  Common = "Common",
  Uncommon = "Uncommon",
  Rare = "Rare",
  RareEX = "Rare EX",
  FullArt = "Full Art",
  FullArtEXSupport = "Full Art EX/Support",
  Immersive = "Immersive",
  GoldCrown = "Gold Crown"
}

export type CardRarityType = keyof typeof CardRarities