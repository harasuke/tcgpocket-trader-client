import React, { useMemo, useState } from "react";
import { Filters } from "src/pages/CreateTradePage/CreateTradePage";

export default function useStoreFilters() {
  // Filters to be stored but not to apply
  const [selectedFilters, setSelectedFilters] = useState<Filters>({
    rarity: [],
    element: [],
    type: [],
    set: [],
    pack: [],
  });

  // Filters to be applied
  const [filters, setFilters] = useState<Filters>({
    rarity: [],
    element: [],
    type: [],
    set: [],
    pack: [],
  });
  const [filtersAmount, setFiltersAmount] = useState(0);

  useMemo(() => {
    let amount = 0;
    Object.entries(selectedFilters).forEach(([key, val]) => {
      if (val.length) amount++;
    });
    setFiltersAmount(amount);
  }, [selectedFilters])

  return {
    selectedFilters,
    setSelectedFilters,
    filters,
    setFilters,
    filtersAmount,
    setFiltersAmount,
  };
}
