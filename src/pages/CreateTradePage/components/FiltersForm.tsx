import React, { useContext } from "react";
import { Form, Select } from "antd";
import { Filters } from "../CreateTradePage";
import { Endpoints } from "src/types/Endpoints";
import useSearchFiltersOptions from "../hooks/UseSearchFiltersOptions";
import useDetectDevice from "src/hooks/UseDetectDevice";

interface FiltersFormProps {
  selectedFilters: Filters;
  setSelectedFilters: React.Dispatch<React.SetStateAction<Filters>>;
}

export const FiltersForm = ({ selectedFilters, setSelectedFilters }: FiltersFormProps) => {
  const { screenWidth } = useDetectDevice();

  const { cardElementOptions, cardRarityOptions, expansionOtions, packOptions, typeOptions } =
    useSearchFiltersOptions();

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
        allowClear
        mode="multiple"
        placeholder="Energy type"
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
        allowClear
        mode="multiple"
        placeholder="Card type"
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
            allowClear
            mode="multiple"
            placeholder="Expansion Set"
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
            allowClear
            mode="multiple"
            placeholder="Card Packs"
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
            allowClear
            mode="multiple"
            placeholder="Expansion Set"
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
            allowClear
            mode="multiple"
            placeholder="Card Packs"
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
