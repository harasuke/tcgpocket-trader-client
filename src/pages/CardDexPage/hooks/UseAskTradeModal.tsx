import React, { useEffect, useRef, useState } from "react";
import { Button, Modal } from "antd";
import useLanguageIntentCard from "src/hooks/api/UseLanguageIntentCard";
import { Card } from "src/types/api/Card";
import { LanguageButton } from "../components/LanguageButton";
import { ChangeLanguageIntentResponse } from "src/hooks/api/UseSetCardIntentForLanguage";
import { CardLanguage } from "src/types/CardLanguage";
import usePlayerTradable from "src/hooks/api/UsePlayerTradable";
import { ScrollHandler } from "src/components/ScrollHandler";
import CardComponent from "src/components/Card";
import SkeletonCard from "src/components/SkeletonCard/SkeletonCard";

export default function useAskTradeModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [showLanguages, setShowLanguages] = useState(false);

  const scrollableContent = useRef<HTMLDivElement | null>(null);
  const [refreshOnScroll, setRefreshOnScroll] = useState(false);
  const [cardsPerPage, setCardsPerPage] = useState(30);
  const [currentPage, setCurrentPage] = useState(1);

  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);

  useEffect(() => {
    if ((res?.meta?.currentPage ?? 1) < (res?.meta?.totalPages ?? 1)) {
      setCurrentPage((prev) => prev + 1);
    }
  }, [refreshOnScroll]);

  const [intentId, setIntentId] = useState<string | null>(null);
  const [intentType, setIntentType] = useState<"offered" | "wanted" | null>(null);

  const setIsOpenForCard = (
    toOpen: boolean,
    _intentId: string,
    _intentType: "wanted" | "offered",
  ) => {
    setIsOpen(toOpen);

    setIntentType(_intentType);
    setIntentId(_intentId);
    setSelectedCardId(null);
    // toggleUpdate();
  };

  const { res, loadingReq } = usePlayerTradable(intentId, intentType, {
    limit: cardsPerPage.toString(),
    page: currentPage.toString(),
  });

  const ModalComponent = (
    <Modal
      open={isOpen}
      onCancel={() => setIsOpen(false)}
      closable
      title={""}
      style={{ top: "3rem" }}
      styles={{
        body: {
          maxHeight: "calc(100vh - 200px)",
          overflowY: "auto",
          paddingTop: 24,
          overflow: "hidden",
        },
      }}
      width={{
        xs: "90%",
        sm: "80%",
        md: "70%",
        lg: "60%",
        xl: "50%",
        xxl: "40%",
      }}
      footer={[
        <>
          {intentType == "wanted" && (
            <Button type="primary" disabled={selectedCardId == null}>
              Ask for the Card
            </Button>
          )}
          {intentType == "offered" && (
            <Button type="primary" disabled={selectedCardId == null}>
              Offer Card
            </Button>
          )}
        </>,
      ]}
    >
      <div className="flex w-full items-center justify-center">
        {intentType == "offered" && (
          <p className="hero-font">The user is searching for these specific cards</p>
        )}
        {intentType == "wanted" && <p className="hero-font">The user is offering these cards</p>}
      </div>
      <ScrollHandler
        className="all-cards-scrollable relative top-[.75em] mx-3 overflow-y-scroll"
        onScrollEnd={() => setRefreshOnScroll((prev) => !prev)}
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
          className={`cardex-grid relative grid place-items-center gap-x-2 !gap-y-4 overflow-x-hidden pb-[12rem] sm:!gap-y-2`}
        >
          {res?.data?.map((e, index) => (
            <div
              key={index}
              className="relative m-auto flex w-auto items-stretch rounded-xl"
              style={{
                ...(selectedCardId == `${e.baseCardId + index}`
                  ? { outline: "2px solid blue" }
                  : {}),
              }}
            >
              {selectedCardId === `${e.baseCardId + index}` && (
                <div className="hero-font absolute z-50 m-auto flex h-full w-full flex-1 items-center justify-center text-xl text-white">
                  1/1
                </div>
              )}
              <CardComponent
                extraClasses={"transition-all duration-100"}
                style={{
                  ...(selectedCardId == `${e.baseCardId + index}`
                    ? { filter: "brightness(0.5)" }
                    : {}),
                }}
                key={e.baseCardId + index}
                url={e.imageUrl}
                canZoom={false}
                onClick={() =>
                  setSelectedCardId((prev) =>
                    prev != `${e.baseCardId + index}` ? `${e.baseCardId + index}` : null,
                  )
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
      {/* <Button type="primary" className="relative top-[-100%] items-center">Offer Card</Button> */}

      {/* {card && (
        <div className="flex flex-col items-center">
          <img
            src={card.imageUrl}
            className="w-full max-w-[300px] rounded-xl shadow-lg transition-all duration-300"
            alt="Card"
          />
          <button
            onClick={() => setShowLanguages(!showLanguages)}
            className="mt-4 rounded-lg bg-blue-100 px-4 py-2 text-blue-700 hover:bg-blue-200"
          >
            {showLanguages ? "Nascondi lingue" : "Mostra lingue disponibili"}
          </button>

          {showLanguages && res.length > 0 && (
            <>
              
            </>
          )}
        </div>
      )} */}
    </Modal>
  );

  return { ModalComponent, isOpen, setIsOpenForCard };
}
