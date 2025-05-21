import { LoadingOutlined } from "@ant-design/icons";
import { Button, Modal, Spin } from "antd";
import React, { useRef, useState } from "react";
import { BsSearchHeart } from "react-icons/bs";
import { PiHandHeartBold } from "react-icons/pi";
import useLanguageIntentCard from "src/hooks/api/UseLanguageIntentCard";
import useSetCardIntentForLanguage from "src/hooks/api/UseSetCardIntentForLanguage";
import { Card } from "src/types/api/Card";
import { CardLanguage } from "src/types/CardLanguage";

export default function useZoomCardModal() {
  const cardRef = useRef<Card | null>(null);

  const { res, loadingReq } = useLanguageIntentCard(cardRef.current?.id ?? null);
  const { setCardIntentForLanguage } = useSetCardIntentForLanguage();

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

          {showLanguages && (
            <div className="mt-6 w-full max-w-md space-y-4">
              {Object.values(CardLanguage).map((lang) => (
                <div
                  key={lang}
                  className="flex items-center justify-between rounded-lg bg-gray-50 px-4 py-3 shadow"
                >
                  <div className="flex items-center gap-3">
                    <img
                      className="h-[2rem]"
                      src={`/lang-flags/${String(lang).toLowerCase()}.svg`}
                      alt={`${lang} Flag`}
                    />
                    <span className="hero-font text-lg">{lang.toUpperCase()}</span>
                  </div>
                  <div className="flex gap-3">
                    {loadingReq ? (
                      <Spin indicator={<LoadingOutlined spin />} />
                    ) : (
                      <BsSearchHeart
                        className="text-3xl text-red-600"
                        onClick={() =>
                          setCardIntentForLanguage("want", {
                            cardId: cardRef?.current?.id ?? "",
                            languageCode: lang,
                          })
                        }
                      />
                    )}
                    {loadingReq ? (
                      <Spin indicator={<LoadingOutlined spin />} />
                    ) : (
                      // TODO: icon based on status
                      <PiHandHeartBold
                        className="cursor-pointer text-2xl text-blue-600"
                        onClick={() =>
                          setCardIntentForLanguage("offer", {
                            cardId: cardRef?.current?.id ?? "",
                            languageCode: lang,
                          })
                        }
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </Modal>

    // <Modal
    //   open={isOpen}
    //   title={
    //     <div className="hero-font w-full text-center text-4xl">{cardRef?.current?.name ?? ""}</div>
    //   }
    //   closable={true}
    //   onCancel={() => setIsOpen(false)}
    //   width={{
    //     xs: "90%",
    //     sm: "80%",
    //     md: "70%",
    //     lg: "60%",
    //     xl: "50%",
    //     xxl: "40%",
    //   }}
    //   style={{
    //     top: 'calc(var(--navbar-height) / 2)'
    //   }}
    //   footer={[
    //     // <div className="flex w-full justify-center gap-3">
    //     //   <button
    //     //     key="back"
    //     //     onClick={() => setIsOpen(false)}
    //     //     className="cursor-pointer rounded-md bg-red-900 px-3 py-1 text-white"
    //     //   >
    //     //     Close
    //     //   </button>
    //     //   <Button
    //     //     key="submit"
    //     //     type="primary"
    //     //     variant="outlined"
    //     //     onClick={() => {
    //     //       setIsOpen(false);
    //     //     }}
    //     //   >
    //     //     Apply Filters
    //     //   </Button>
    //     // </div>,
    //   ]}
    // >
    //   {cardRef.current != null && (
    //     <div className="flex flex-col items-center">
    //       <img
    //         src={cardRef.current.imageUrl}
    //         className="aspect-ratio-2/3 h-auto w-[80%] max-w-[300px]"
    //       />
    //       <div className="flex flex-col">
    //         {Object.values(CardLanguage).map((e) => (
    //           <div className="my-3 flex items-center justify-center">
    //             <img
    //               className="mr-2 h-[3ch]"
    //               src={`/lang-flags/${String(e).toLowerCase()}.svg`}
    //               alt={`${e} Flag`}
    //             />
    //             <span className="hero-font mr-6 w-[3ch] text-xl">{e.toUpperCase()}</span>
    //             <button
    //               className="mr-3 cursor-pointer"
    //               // onClick={() =>
    //               //   setCardIntentForLanguage({
    //               //     intent: "want",
    //               //     cardId: cardRef?.current?.id ?? "",
    //               //     language: e,
    //               //   })
    //               // }
    //             >
    //               {/* {loadingReq ? (
    //                 <Spin indicator={<LoadingOutlined spin />} />
    //               ) : (
    //                 // TODO: icon based on status
    //                 <BsSearchHeart className="text-3xl text-red-600" />
    //                 )} */}
    //               <BsSearchHeart className="text-3xl text-red-600" />
    //             </button>
    //             <button
    //               className="cursor-pointer"
    //               // onClick={() =>
    //               //   setCardIntentForLanguage({
    //               //     intent: "offer",
    //               //     cardId: cardRef?.current?.id ?? "",
    //               //     language: e,
    //               //   })
    //               // }
    //             >
    //               {/* {loadingReq ? (
    //                 <Spin indicator={<LoadingOutlined spin />} />
    //               ) : (
    //                 // TODO: icon based on status
    //                 <PiHandHeartBold className="text-3xl text-blue-600" />
    //                 )} */}
    //               <PiHandHeartBold className="text-3xl text-blue-600" />
    //             </button>
    //           </div>
    //         ))}
    //       </div>
    //     </div>
    //   )}
    // </Modal>
  );

  return { ModalComponent, isOpen, setIsOpenForCard };
}
