// export enum CardRarities {
//   Common = "Common",
//   Uncommon = "Uncommon",
//   Rare = "Rare",
//   RareEX = "Rare EX",
//   FullArt = "Full Art",
//   FullArtEXSupport = "Full Art EX/Support",
//   Immersive = "Immersive",
//   GoldCrown = "Gold Crown"
// }
export enum CardRarity {
  ART_RARE = 'Full Art',
  DOUBLE_RARE = 'Rare EX',
  RARE = "Rare",
  UNCOMMON = 'Uncommon',
  COMMON = 'Common',
  // ONE_SHINY_STAR = 'One shiny star',
  // TWO_SHINY_STAR = 'Two shiny star',
}

export type CardRarityType = keyof typeof CardRarity