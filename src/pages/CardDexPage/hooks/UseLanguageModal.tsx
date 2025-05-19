import React, { useRef, useState } from "react";
import { Modal, Spin } from "antd";
import { CardLanguage } from "src/types/CardLanguage";
import { BsSearchHeart } from "react-icons/bs";
import { PiHandHeartBold } from "react-icons/pi";
import { Card } from "src/types/api/Card";
import useSetCardIntentForLanguage from "src/hooks/api/UseSetCardIntentForLanguage";
import useLanguageIntentCard from "src/hooks/api/UseLanguageIntentCard";
import { LoadingOutlined } from "@ant-design/icons";

export default function useLanguageModal() {
  const [isOpen, setIsOpen] = useState(false);
  const cardRef = useRef<Card | null>(null);

  const { res, loadingReq } = useLanguageIntentCard(cardRef.current?.id ?? null);
  const { setCardIntentForLanguage } = useSetCardIntentForLanguage();

  const setIsOpenForCard = (toOpen: boolean, card?: Card) => {
    setIsOpen(toOpen);
    cardRef.current = card ?? null;
  };

  const ModalComponent = (
    <Modal
      open={isOpen}
      title={<div className="hero-font w-full text-center text-4xl">Languages</div>}
      closable={true}
      onCancel={() => setIsOpen(false)}
      width={{
        xs: "90%",
        sm: "80%",
        md: "70%",
        lg: "60%",
        xl: "50%",
        xxl: "40%",
      }}
      footer={[]}
    >
      <>
        {Object.values(CardLanguage).map((e) => (
          <div className="my-3 flex items-center justify-center">
            <img
              className="mr-2 h-[3ch]"
              src={`/lang-flags/${String(e).toLowerCase()}.svg`}
              alt={`${e} Flag`}
            />
            <span className="hero-font mr-6 w-[3ch] text-xl">{e.toUpperCase()}</span>
            <button
              className="mr-3 cursor-pointer"
              onClick={() =>
                setCardIntentForLanguage({
                  intent: "want",
                  cardId: cardRef?.current?.id ?? "",
                  language: e,
                })
              }
            >
              {loadingReq ? (
                <Spin indicator={<LoadingOutlined spin />} />
              ) : (
                // TODO: icon based on status
                <BsSearchHeart className="text-3xl text-red-600" />
              )}
            </button>
            <button
              className="cursor-pointer"
              onClick={() =>
                setCardIntentForLanguage({
                  intent: "offer",
                  cardId: cardRef?.current?.id ?? "",
                  language: e,
                })
              }
            >
              {loadingReq ? (
                <Spin indicator={<LoadingOutlined spin />} />
              ) : (
                // TODO: icon based on status
                <PiHandHeartBold className="text-3xl text-blue-600" />
              )}
            </button>
          </div>
        ))}
      </>
    </Modal>
  );

  return { isOpen, setIsOpen, setIsOpenForCard, ModalComponent };
}
