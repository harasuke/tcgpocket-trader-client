import React, { useRef, useState } from "react";
import { Modal } from "antd";
import useLanguageIntentCard from "src/hooks/api/UseLanguageIntentCard";
import { Card } from "src/types/api/Card";
import { LanguageButton } from "../components/LanguageButton";

export default function useZoomCardModal() {
  const cardRef = useRef<Card | null>(null);

  const { res, loadingReq } = useLanguageIntentCard(cardRef.current?.id ?? null);

  const [showLanguages, setShowLanguages] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const setIsOpenForCard = (toOpen: boolean, card?: Card) => {
    setIsOpen(toOpen);
    cardRef.current = card ?? null;
  };

  const ModalComponent = (
    <Modal
      open={isOpen}
      onCancel={() => setIsOpen(false)}
      closable
      title={<div className="hero-font text-center text-3xl">{cardRef.current?.name ?? ""}</div>}
      style={{ top: "3rem" }}
      styles={{
        body: {
          maxHeight: "calc(100vh - 200px)",
          overflowY: "auto",
          padding: 24,
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
      footer={[]}
    >
      {cardRef.current && (
        <div className="flex flex-col items-center">
          <img
            src={cardRef.current.imageUrl}
            className="w-full max-w-[300px] rounded-xl shadow-lg transition-all duration-300"
            alt="Card"
          />

          <button
            onClick={() => setShowLanguages(!showLanguages)}
            className="mt-4 rounded-lg bg-blue-100 px-4 py-2 text-blue-700 hover:bg-blue-200"
          >
            {showLanguages ? "Nascondi lingue" : "Mostra lingue disponibili"}
          </button>

          {showLanguages && res.length ? (
            <>
              {res.map((e) => (
                <div className="my-3 flex items-center justify-center">
                  <LanguageButton language={e} loadingReq={loadingReq} card={cardRef.current} />
                </div>
              ))}
            </>
          ) : (
            <></>
          )}
        </div>
      )}
    </Modal>
  );

  return { ModalComponent, isOpen, setIsOpenForCard };
}
