import React, { useContext, useEffect, useState } from "react";
import useDetectDevice from "src/hooks/UseDetectDevice";
import useDebounceInput from "src/hooks/UseDebounceInput";
import useSetSearchFilters from "src/hooks/api/UseSetSearchFilters";
import useFilterModal from "./hooks/UseFilterModal";
import useStoreFilters from "./hooks/UseStoreFilters";
import useZoomCardModal from "./hooks/UseZoomCardModal";
import { ChangeLanguageIntentResponse } from "src/hooks/api/UseSetCardIntentForLanguage";
import { StoreContext } from "src/stores/StoreContext";
import { Badge, Button, Input, message, Select } from "antd";
import { CloseOutlined, SearchOutlined } from "@ant-design/icons";
import { FilterIcon } from "src/assets/FilterIcon";
import { Card } from "src/types/api/Card";
import { CardLanguage } from "src/types/CardLanguage";
import { CardDexList } from "./components/CardDexList";
import "./CardDexPage.css";

interface CardDexPageProps {}

export const CardDexPage = ({}: CardDexPageProps) => {
  const storeContext = useContext(StoreContext);
  const [messageApi, contextHolder] = message.useMessage();

  const { device, screenWidth } = useDetectDevice();

  const [isLangSelOpen, setLangSelOpen] = useState(false);

  /* Used for Pagination */
  const [cardsPerPage, setCardsPerPage] = useState(30);
  const [currentPage, setCurrentPage] = useState(1);

  /* Used for filtered search */
  // const searchByName = useRef<InputRef | null>(null);
  const [searchByName, setSearchByName] = useState<string | null>(null);
  const { debouncedInput, setDebouncedInput, setRefresh } = useDebounceInput(searchByName, 200);

  const [currentLanguage, setCurrentLanguage] = useState<CardLanguage>(
    storeContext?.cardDexLanguage ?? CardLanguage.IT,
  );

  const { selectedFilters, setSelectedFilters, filters, setFilters, filtersAmount } =
    useStoreFilters();

  /* Call API to get all visible cards */
  const {
    res: currentResponse,
    loadingReq,
    setRes: setCurrentResponse,
  } = useSetSearchFilters({
    ...filters,
    ...(debouncedInput != null ? { name: debouncedInput } : {}),
    languageCode: currentLanguage.toString(),
    limit: cardsPerPage.toString(),
    page: currentPage.toString(),
  });

  // Modifies underlying currentResponse object to change the intent of the card
  const mutateResponseOnCardChange = (
    card: Card,
    language: CardLanguage,
    intentResponse: ChangeLanguageIntentResponse,
  ) => {
    if (currentLanguage != language) return;
    setCurrentResponse((prev) => {
      if (!prev) return prev;

      const newData = prev?.data?.map((c) => {
        if (c.id != card.id) return c;
        const cardToChange = { ...c };

        if (intentResponse.moved) {
          cardToChange.isWanted = !cardToChange.isWanted;
          cardToChange.isOffered = !cardToChange.isOffered;
        } else if (intentResponse.added) {
          if (intentResponse.to === "wanted") cardToChange.isWanted = true;
          if (intentResponse.to === "offered") cardToChange.isOffered = true;
        } else if (intentResponse.removed) {
          if (intentResponse.from === "wanted") cardToChange.isWanted = false;
          if (intentResponse.from === "offered") cardToChange.isOffered = false;
        }

        return cardToChange;
      });
      return { ...prev, data: newData };
    });
  };

  const {
    isOpen: isOpen_cardZoomModal,
    setIsOpenForCard: setIsOpenForCard_cardZoomModal,
    ModalComponent: ModalComponent_cardZoom,
  } = useZoomCardModal(mutateResponseOnCardChange);

  const {
    isOpen,
    setIsOpen,
    ModalComponent: ModalComponent_filters,
  } = useFilterModal(setFilters, selectedFilters, setSelectedFilters, setCurrentPage);

  useEffect(() => {
    if (loadingReq) {
      messageApi.open({
        key: "carddex-loading",
        type: "loading",
        content: "Loading cards...",
        duration: 0,
      });
    } else {
      messageApi.destroy("carddex-loading");
    }
  }, [loadingReq]);

  return (
    <>
      {contextHolder}
      {ModalComponent_filters}
      {ModalComponent_cardZoom}
      <div className="mx-3 mt-2 flex h-[2rem]">
        <Input
          value={searchByName ?? ""}
          className="placeholder:hero-font !rounded-3xl focus:border-red-500"
          placeholder="Card search... (multiple names must be separated by coma)"
          prefix={<SearchOutlined />}
          onChange={(el) => {
            setSearchByName(el.target.value);
            setRefresh();
            setCurrentPage(1);
          }}
          suffix={
            <button
              className="cursor-pointer"
              onClick={() => {
                setSearchByName("");
                setRefresh();
              }}
            >
              <CloseOutlined />
            </button>
          }
        />
        <Badge count={filtersAmount} className="filter-badge" color={storeContext?.navbarColor}>
          <Button className="hero-font mx-2 !rounded-3xl outline-1" onClick={() => setIsOpen(true)}>
            <FilterIcon />
            {screenWidth > 684 && <span>Filters</span>}
          </Button>
        </Badge>
        <Select
          className="language-selection !rounded-3xl"
          virtual={false}
          onDropdownVisibleChange={setLangSelOpen}
          onChange={(value) => {
            setCurrentPage(1);
            setCurrentLanguage(value as unknown as CardLanguage);
          }}
          value={{
            value: currentLanguage,
            label: (
              <span
                className={`flex items-center transition-all duration-500 ${isLangSelOpen || screenWidth > 684 ? "hero-font mr-[2ch] w-[5ch]" : "w-[3ch]"}`}
              >
                <img
                  className="mr-1 h-[2rem]"
                  src={`/lang-flags/${currentLanguage}.svg`}
                  alt={currentLanguage}
                />
                {isLangSelOpen || screenWidth > 684 ? currentLanguage.toUpperCase() : ""}
              </span>
            ),
          }}
          options={Object.values(CardLanguage).map((e) => ({
            value: e,
            label: (
              <span className="hero-font mr-[3ch] flex w-[4ch] items-center">
                <img className="align-self-center mr-1 !h-[2rem]" src={`/lang-flags/${e}.svg`} />
                {e.toUpperCase()}
              </span>
            ),
          }))}
          defaultValue={{
            value: currentLanguage,
            label: (
              <span className="hero-font mr-[3ch] flex w-[4ch] items-center">
                <img
                  className="align-self-center mr-1 !h-[2rem]"
                  src={`/lang-flags/${currentLanguage}.svg`}
                />
                {currentLanguage.toUpperCase()}
              </span>
            ),
          }}
        ></Select>
      </div>
      <CardDexList
        currentLanguage={currentLanguage}
        cardsAPIResponse={currentResponse}
        loadingAPICall={loadingReq}
        cardsPerPage={cardsPerPage}
        openCardZoomModalForCard={setIsOpenForCard_cardZoomModal}
        onIntentCardChange={mutateResponseOnCardChange}
        loadMoreCards={() => {
          setCurrentPage((prev) => prev + 1);
        }}
      />
    </>
  );
};
