import React, { useState } from "react";
import { Button, Modal } from "antd";
import { FiltersForm } from "./FiltersForm";
import { Filters } from "./CreateTradePage";

export default function useFilterModal(
  setFilters: React.Dispatch<React.SetStateAction<Filters>>,
  selectedFilters: Filters,
  setSelectedFilters: React.Dispatch<React.SetStateAction<Filters>>,
  setIsEnabled: React.Dispatch<React.SetStateAction<boolean>>,
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>,
) {
  const [isOpen, setIsOpen] = useState(false);

  const ModalComponent = (
    <Modal
      open={isOpen}
      title={<div className="w-full text-center text-4xl">Filters</div>}
      closable={false}
      onCancel={() => setIsOpen(false)}
      afterOpenChange={() => setIsEnabled(false)}
      width={{
        xs: "90%",
        sm: "80%",
        md: "70%",
        lg: "60%",
        xl: "50%",
        xxl: "40%",
      }}
      footer={[
        <div className="flex w-full justify-center gap-3">
          <button
            key="back"
            onClick={() => setIsOpen(false)}
            className="cursor-pointer rounded-md bg-red-900 px-3 py-1 text-white"
          >
            Close
          </button>
          <Button
            key="submit"
            type="primary"
            variant="outlined"
            onClick={() => {
              setCurrentPage(1);
              setFilters(selectedFilters);
              setIsEnabled(true);
              setIsOpen(false);
            }}
          >
            Apply Filters
          </Button>
        </div>,
      ]}
    >
      <FiltersForm selectedFilters={selectedFilters} setSelectedFilters={setSelectedFilters} />
    </Modal>
  );

  return { isOpen, setIsOpen, ModalComponent };
}
