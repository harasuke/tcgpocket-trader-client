import React, { useEffect, useRef, useState } from "react";
import { Button, Drawer, Spin } from "antd";
import usePlayerTradable from "src/hooks/api/UsePlayerTradable";
import { ScrollHandler } from "src/components/ScrollHandler";
import CardComponent from "src/components/Card";
import SkeletonCard from "src/components/SkeletonCard/SkeletonCard";
import { LoadingOutlined } from "@ant-design/icons";
import { FaArrowLeft } from "react-icons/fa6";
import useChooseCardDrawer from "./UseChooseCardDrawer";

export default function useAskTradeDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [showLanguages, setShowLanguages] = useState(false);

  const scrollableContent = useRef<HTMLDivElement | null>(null);
  const [refreshOnScroll, setRefreshOnScroll] = useState(false);
  const [cardsPerPage, setCardsPerPage] = useState(30);
  const [currentPage, setCurrentPage] = useState(1);

  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);

  // useEffect(() => {
  //   if ((res?.meta?.currentPage ?? 1) < (res?.meta?.totalPages ?? 1)) {
  //     setCurrentPage((prev) => prev + 1);
  //   }
  // }, [refreshOnScroll]);

  const [intentId, setIntentId] = useState<string | null>(null);
  const [intentType, setIntentType] = useState<"offered" | "wanted">("offered");

  const setIsOpenForCard = (
    toOpen: boolean,
    _intentId: string,
    _intentType: "wanted" | "offered",
  ) => {
    setIsOpen(toOpen);
    setIntentType(_intentType);
    setIntentId(_intentId);
    setSelectedCardId(null);
    toggleUpdate();
  };

  const { res, loadingReq, setRes, toggleUpdate } = usePlayerTradable(intentId, intentType, {
    limit: cardsPerPage.toString(),
    page: currentPage.toString(),
  });

  const { setIsOpen: setOpenChooseCard, DrawerComponent: ChooseCardDrawerComponent } =
    useChooseCardDrawer((selectedCardId) => setSelectedCardId(selectedCardId));

  const DrawerComponent = (
    <>
      {ChooseCardDrawerComponent}
      <Drawer
        className="drawer-ask-trade"
        title={
          intentType == "offered" ? (
            <p className="hero-font">The user is searching for these cards</p>
          ) : (
            <p className="hero-font">The user is offering these cards</p>
          )
        }
        placement="bottom"
        height={"100vh"}
        closeIcon={<FaArrowLeft />}
        onClose={() => {
          setIsOpen(false);
          setRes(null);
        }}
        open={isOpen}
      >
        {/* <div className="flex w-full justify-start">
        {intentType == "offered" && (
          <p className="hero-font">The user is searching for these specific cards</p>
        )}
        {intentType == "wanted" && <p className="hero-font">The user is offering these cards</p>}
      </div> */}
        {res == null && loadingReq ? (
          <div className="align-center flex w-full items-center justify-center">
            <Spin indicator={<LoadingOutlined spin />} size="large" />
          </div>
        ) : (
          <></>
        )}
        {res != null && (
          <ScrollHandler
            className="all-cards-scrollable relative top-[.75em] overflow-y-scroll"
            onScrollEnd={() =>
              res?.meta?.totalPages > 1 ? setRefreshOnScroll((prev) => !prev) : null
            }
            handleOverflow={
              (res?.meta?.totalPages ?? 1) == 1 ||
              (res?.meta?.currentPage ?? 1) >= (res?.meta?.totalPages ?? 1)
                ? false
                : true
            }
            scrollableContent={scrollableContent}
          >
            <div
              ref={scrollableContent}
              className={`cardex-grid relative grid place-items-center gap-x-2 !gap-y-4 overflow-x-hidden px-[2px] pt-[2px] pb-[1rem] sm:!gap-y-2`}
            >
              {res?.data?.map((e, index) => (
                <div
                  key={index}
                  className="relative m-auto flex w-auto items-stretch rounded-xl"
                  style={{
                    ...(selectedCardId == e.relationId ? { outline: "2px solid blue" } : {}),
                  }}
                >
                  {selectedCardId == e.relationId && (
                    <div
                      className="hero-font absolute z-50 m-auto flex h-full w-full flex-1 items-center justify-center text-xl text-white"
                      onClick={() =>
                        setSelectedCardId((prev) => (prev == e.relationId ? null : e.relationId))
                      }
                    >
                      1/1
                    </div>
                  )}
                  <img
                    className="hero-font absolute top-0 right-[.3rem] z-50 m-auto flex w-[2rem] flex-1 items-center justify-center text-xl text-white"
                    src={`/lang-flags/${e.languageCode}.svg`}
                  />
                  <CardComponent
                    extraClasses={"transition-all duration-100"}
                    style={{
                      ...(selectedCardId == e.relationId ? { filter: "brightness(0.5)" } : {}),
                    }}
                    key={e.baseCardId + index}
                    url={e.imageUrl}
                    canZoom={false}
                    onClick={() =>
                      setSelectedCardId((prev) => (prev == e.relationId ? null : e.relationId))
                    }
                  />
                </div>
              ))}
            </div>
            {loadingReq &&
              Array.from({ length: res?.meta?.limit ?? 8 }).map((_, index) => (
                <SkeletonCard
                  extraClasses="!h-auto !aspect-[2/3] !max-h-full !w-full !rounded-md"
                  key={index}
                />
              ))}
          </ScrollHandler>
        )}
        <div className="z-100 flex w-full justify-between">
          {intentType == "offered" ? (
            <a
              className="p-2"
              onClick={() => {
                setOpenChooseCard(true, "toOffer");
              }}
            >
              Offer another card
            </a>
          ) : (
            <a
              className="p-2"
              onClick={() => {
                setOpenChooseCard(true, "toAsk");
              }}
            >
              Ask for another card
            </a>
          )}
          <Button className="" type="primary" disabled={selectedCardId == null}>
            {intentType == "offered" ? <>Offer Card</> : <>Ask Card</>}
          </Button>
        </div>
      </Drawer>
    </>
  );

  return { DrawerComponent, isOpen, setIsOpenForCard };
}
