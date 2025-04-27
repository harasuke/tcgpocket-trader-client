export type CardType = {
  id: string;
  idCard: string;
  name: string;
  element: string;
  type: string;
  subType: string;
  health: number;
  set: string;
  pack: string;
  rarity: string;
  description: string;
  imageUrl: string;
  attacks: any[];
  retreatCost: number;
  weakness: string;
  abilities: any[];
  createdAt: Date;
  updatedAt: Date;
}