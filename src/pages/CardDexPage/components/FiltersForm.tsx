import React from "react";
import { Form, Select } from "antd";
import { Endpoints } from "src/types/Endpoints";
import useSearchFiltersOptions from "../hooks/UseSearchFiltersOptions";
import useDetectDevice from "src/hooks/UseDetectDevice";
import { CardRarity } from "src/types/CardRarities";
import "../CardDexPage.css";
import { CardElement } from "src/types/CardElement";
import { CardType } from "src/types/CardType";
import { CardSet } from "src/types/CardSet";
import { CardPack } from "src/types/CardPack";

export interface Filters {
  rarity: CardRarity[];
  element: CardElement[];
  type: CardType[];
  set: CardSet[];
  pack: CardPack[];
}

interface FiltersFormProps {
  selectedFilters: Filters;
  setSelectedFilters: React.Dispatch<React.SetStateAction<Filters>>;
  overrideRarity?: CardRarity;
}

export const FiltersForm = ({
  selectedFilters,
  setSelectedFilters,
  overrideRarity,
}: FiltersFormProps) => {
  const { device, screenWidth } = useDetectDevice();

  const { cardElementOptions, cardRarityOptions, expansionOtions, packOptions, typeOptions } =
    useSearchFiltersOptions();

  return (
    <Form className="flex flex-col gap-3">
      {/* Rarity */}
      <Select
        disabled={overrideRarity != undefined ? true : false}
        virtual={false}
        className="custom-select"
        allowClear
        mode="multiple"
        placeholder="Card Rarity"
        showSearch={device == "Desktop" ? true : false}
        options={cardRarityOptions}
        onChange={(changes) => {
          setSelectedFilters({ ...selectedFilters, rarity: changes });
        }}
        style={{
          width: "100%",
        }}
        optionRender={(e) => (
          <div className="flex items-center">
            <img
              className="mr-6 h-[2em]"
              src={Endpoints.STORAGE_BUCKET(`rarities/${e.value}.png`)}
            ></img>
            <span className="text-dark">{e.value}</span>
          </div>
        )}
      ></Select>

      {/* Card energy type */}
      <Select
        className="custom-select"
        virtual={false}
        allowClear
        mode="multiple"
        placeholder="Energy type"
        showSearch={device == "Desktop" ? true : false}
        options={cardElementOptions}
        onChange={(changes) => {
          setSelectedFilters({ ...selectedFilters, element: changes });
        }}
        style={{
          width: "100%",
        }}
        optionRender={(e) => (
          <div className="flex items-center">
            <img
              className="mr-6 h-[2em]"
              src={Endpoints.STORAGE_BUCKET(`energy-types/${e.value}.png`)}
            ></img>
            <span className="text-dark">{e.value}</span>
          </div>
        )}
      ></Select>

      {/* Card type (Traniner / Pokemon) */}
      <Select
        className="custom-select"
        virtual={false}
        allowClear
        mode="multiple"
        placeholder="Card type"
        showSearch={device == "Desktop" ? true : false}
        options={typeOptions}
        onChange={(changes) => {
          setSelectedFilters({ ...selectedFilters, type: changes });
        }}
        style={{
          width: "100%",
        }}
      ></Select>

      {/* Card Set (expansion + pack) */}
      {screenWidth >= 768 ? (
        <div className="flex gap-2">
          <Select
            className="custom-select"
            virtual={false}
            allowClear
            mode="multiple"
            placeholder="Expansion Set"
            showSearch={device == "Desktop" ? true : false}
            options={expansionOtions}
            onChange={(changes) => {
              setSelectedFilters({ ...selectedFilters, set: changes });
            }}
            style={{
              width: "100%",
            }}
            optionRender={(e) => (
              <div className="flex items-center">
                <img
                  className="mr-6 h-[2em]"
                  src={Endpoints.STORAGE_BUCKET(`expansion-set-logos/${e.value}.webp`)}
                ></img>
                <span className="text-dark">{e.value}</span>
              </div>
            )}
          ></Select>
          <Select
            className="custom-select"
            virtual={false}
            allowClear
            mode="multiple"
            placeholder="Card Packs"
            showSearch={device == "Desktop" ? true : false}
            options={packOptions}
            onChange={(changes) => {
              setSelectedFilters({ ...selectedFilters, pack: changes });
            }}
            style={{
              width: "100%",
            }}
            optionRender={(e) => (
              <div className="flex items-center">
                <img
                  className="mr-6 h-[2em]"
                  src={Endpoints.STORAGE_BUCKET(`booster-packs/${e.value}.webp`)}
                ></img>
                <span className="text-dark">{e.value}</span>
              </div>
            )}
          ></Select>
        </div>
      ) : (
        <>
          <Select
            className="custom-select"
            virtual={false}
            allowClear
            mode="multiple"
            placeholder="Expansion Set"
            showSearch={device == "Desktop" ? true : false}
            options={expansionOtions}
            onChange={(changes) => {
              setSelectedFilters({ ...selectedFilters, set: changes });
            }}
            style={{
              width: "100%",
            }}
            optionRender={(e) => (
              <div className="flex items-center">
                <img
                  className="mr-6 h-[2em]"
                  src={Endpoints.STORAGE_BUCKET(`expansion-set-logos/${e.value}.webp`)}
                ></img>
                <span className="text-dark">{e.value}</span>
              </div>
            )}
          ></Select>
          <Select
            className="custom-select"
            virtual={false}
            allowClear
            mode="multiple"
            placeholder="Card Packs"
            showSearch={device == "Desktop" ? true : false}
            options={packOptions}
            onChange={(changes) => {
              setSelectedFilters({ ...selectedFilters, pack: changes });
            }}
            style={{
              width: "100%",
            }}
            optionRender={(e) => (
              <div className="flex items-center">
                <img
                  className="mr-6 h-[2em]"
                  src={Endpoints.STORAGE_BUCKET(`booster-packs/${e.value}.webp`)}
                ></img>
                <span className="text-dark">{e.value}</span>
              </div>
            )}
          ></Select>
        </>
      )}
    </Form>
  );
};
