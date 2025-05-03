import React from "react";
import { Form, Select } from "antd";
import { CardElement } from "src/types/CardElement";
import { CardRarity } from "src/types/CardRarities";
import { Filters } from "./CreateTradePage";


interface FiltersFormProps {
  selectedFilters: Filters,
  setSelectedFilters: React.Dispatch<React.SetStateAction<Filters>>
}

export const FiltersForm = ({ selectedFilters, setSelectedFilters }: FiltersFormProps) => {
  const cardElementOptions = Object.values(CardElement).map((e) => ({
    value: e,
    label: (
      <img
        className="align-self-center h-[2em]"
        src={`https://mlnvqcdetepfeuzcwdop.supabase.co/storage/v1/object/public/tcgpocket-trader-bucket/energy-types/${e}.png`}
      ></img>
    ),
  }));

  const cardRarityOptions = Object.values(CardRarity).map((e) => ({
    value: e,
    label: (
      <img
        className="align-self-center h-[2em]"
        src={`https://mlnvqcdetepfeuzcwdop.supabase.co/storage/v1/object/public/tcgpocket-trader-bucket/rarities/${e}.png`}
      ></img>
    ),
  }));

  return (
    <Form className="flex flex-col gap-3">
      {/* Rarity */}
      <Select
        className="custom-select"
        allowClear
        mode="multiple"
        placeholder="Card Rarity"
        options={cardRarityOptions}
        onChange={(changes) => {
          setSelectedFilters({...selectedFilters, rarity: changes})
        }}
        style={{
          width: "100%",
        }}
        optionRender={(e) => (
          <div className="flex items-center">
            <img
              className="mr-6 h-[2em]"
              src={`https://mlnvqcdetepfeuzcwdop.supabase.co/storage/v1/object/public/tcgpocket-trader-bucket/rarities/${e.value}.png`}
            ></img>
            <span className="text-dark">{e.value}</span>
          </div>
        )}
      ></Select>

      {/* Card energy type */}
      <Select
        className="custom-select"
        allowClear
        mode="multiple"
        placeholder="Energy type"
        options={cardElementOptions}
        onChange={(changes) => {
          setSelectedFilters({...selectedFilters, element: changes})
        }}
        style={{
          width: "100%",
        }}
        optionRender={(e) => (
          <div className="flex items-center">
            <img
              className="mr-6 h-[2em]"
              src={`https://mlnvqcdetepfeuzcwdop.supabase.co/storage/v1/object/public/tcgpocket-trader-bucket/energy-types/${e.value}.png`}
            ></img>
            <span className="text-dark">{e.value}</span>
          </div>
        )}
      ></Select>

      {/* Card type (Traniner / Pokemon) */}

      {/* Card Set (expansion + pack) */}
    </Form>
  );
};
