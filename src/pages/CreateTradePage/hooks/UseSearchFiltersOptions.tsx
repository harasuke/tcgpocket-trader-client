import React from "react";
import { CardElement } from "src/types/CardElement";
import { PackBySet } from "src/types/CardPack";
import { CardRarity } from "src/types/CardRarities";
import { CardSet } from "src/types/CardSet";
import { CardType } from "src/types/CardType";
import { Endpoints } from "src/types/Endpoints";

export default function useSearchFiltersOptions() {
  const cardElementOptions = Object.values(CardElement).map((e) => ({
    value: e,
    label: (
      <img
        className="align-self-center h-[2em]"
        src={Endpoints.STORAGE_BUCKET(`energy-types/${e}.png`)}
      ></img>
    ),
  }));

  const cardRarityOptions = Object.values(CardRarity).map((e) => ({
    value: e,
    label: (
      <img
        className="align-self-center h-[2em]"
        src={Endpoints.STORAGE_BUCKET(`rarities/${e}.png`)}
      ></img>
    ),
  }));

  const expansionOtions = Object.values(CardSet).map((e) => ({
    value: e,
    label: (
      <img
        className="align-self-center h-[2em]"
        src={Endpoints.STORAGE_BUCKET(`expansion-set-logos/${e}.webp`)}
      ></img>
    ),
  }));

  const packOptions = Object.values(CardSet).map((set) => ({
    label: <span>{set}</span>,
    title: set,
    options: PackBySet[set].map((pack) => ({
      value: pack,
      label: (
        <img
          className="align-self-center h-[2em]"
          src={Endpoints.STORAGE_BUCKET(`booster-packs/${pack}.webp`)}
        ></img>
      ),
    })),
  }));

  const typeOptions = Object.values(CardType).map((e) => ({
    value: e,
    label: <span>{e}</span>,
  }));

  return { cardElementOptions, cardRarityOptions, expansionOtions, packOptions, typeOptions };
}
