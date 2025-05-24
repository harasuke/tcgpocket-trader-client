import React, { useState } from "react";
import { HeroCards } from "../../components/HeroSection/HeroCardList";
import { Input, Tabs } from "antd";
import { BsSearchHeart } from "react-icons/bs";
import { PiHandHeartBold } from "react-icons/pi";
import { WantedCardList } from "src/components/WantedCardList/WantedCardList";
import useDebounceInput from "src/hooks/UseDebounceInput";
import { CloseOutlined, SearchOutlined } from "@ant-design/icons";
import { OfferedCardList } from "src/components/OfferedCardList/OfferedCardList";
import "src/pages/TradesPage/TradePage.css";

export const convertedTime = (time: number) => {
    let ms = time % 1000;
    let ss = Math.floor(time / 1000) % 60;
    let mm = Math.floor(time / 1000 / 60) % 60;
    let hh = Math.floor(time / 1000 / 60 / 60);
    let days = Math.floor(time/ 1000 /60 /60 /24);

    if (days != 0)
      return `${days}day ago`
    if (hh != 0)
      return `${hh}hour ago`
    if (mm != 0)
      return `${mm}min ago`
    if (ss != 0)
      return `${ss}sec ago`

    return `just now`
  }

function TradesPage() {

  const [searchByName, setSearchByName] = useState<string | null>(null);
  const { debouncedInput, setDebouncedInput, setRefresh } = useDebounceInput(searchByName, 200);

  const [activeTab, setActiveTab] = useState<number>();
  const [toggleWantUpdate, setToggleWantUpdate] = useState<boolean>(false);
  const [toggleOfferUpdate, setToggleOfferUpdate] = useState<boolean>(false);

  return (
    <>
      <div className="m-3 flex flex-col">
        <Input
          value={searchByName ?? ""}
          className="placeholder:hero-font !rounded-3xl focus:border-red-500"
          placeholder="Card search... (multiple names must be separated by coma)"
          prefix={<SearchOutlined />}
          onChange={(el) => {
            setSearchByName(el.target.value);
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
      </div>

      <Tabs
        centered
        defaultActiveKey="1"
        onChange={(e) => {
          if (e == "1") {
            setToggleWantUpdate((prev) => !prev);
          } else if (e == "2") {
            setToggleOfferUpdate((prev) => !prev);
          }
          console.log("tab changed to :", e);
        }}
        items={[BsSearchHeart, PiHandHeartBold].map((Icon, i) => {
          const id = String(i + 1);

          // Colori differenti per ciascuna tab
          const tabColors = ["#d32f2f", "#1976d2"]; // rosso e blu (esempio)

          return {
            key: id,
            label: (
              <span
                className="hero-font text-xl"
                style={{
                  color: tabColors[i],
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <Icon className="mr-1" />
                {i === 0 ? "What people wants" : "What people offers"}
                {/* {i === 0 ? "Check what people are searching for" : "Check what people are offering"} */}
              </span>
            ),
            children:
              i === 0 ? (
                <WantedCardList cardsPerPage={30} updateToggler={toggleWantUpdate} />
              ) : (
                <OfferedCardList cardsPerPage={30} updateToggler={toggleOfferUpdate} />
              ),
          };
          //   const id = String(i + 1);
          //   return {
          //     key: id,
          //     label: `People are searching for`,
          //     children: `People can offers`,
          //     icon: <Icon className="align-center"/>,
          //   };
        })}
      />

      {/* <div className="flex w-full flex-wrap justify-evenly">
        <NavLink to="/trades/view" className="w-full cursor-pointer">
          <div className="hero-text view-trade-button background-button relative m-3 h-[110px] overflow-hidden rounded-3xl shadow-md">
            <div className="align-center relative block flex h-[100%] w-[100%] items-center justify-center text-white">
              <GiCardPick className="relative z-1 text-6xl text-gray-300" />
              <span className="top-text hero-font align-center text-3xl">View all trades</span>
            </div>
          </div>
        </NavLink>

        <NavLink to="/trades/create-trade" className="w-[50%] cursor-pointer">
          <div className="hero-text create-trade-button background-button relative m-3 h-[110px] overflow-hidden rounded-3xl shadow-md">
            <div className="align-center relative block flex h-[100%] w-[100%] items-center justify-center text-white">
              <GiCardExchange className="relative z-1 text-6xl text-gray-300" />
              <span className="top-text hero-font align-center text-3xl">Create a trade</span>
            </div>
          </div>
        </NavLink>

        <NavLink to="/trades/create-trade" className="w-[50%] cursor-pointer">
          <div className="hero-text favorites-button background-button relative m-3 h-[110px] overflow-hidden rounded-3xl shadow-md">
            <div className="align-center relative block flex h-[100%] w-[100%] items-center justify-center text-white">
              <MdFavorite className="relative z-1 text-6xl text-gray-300" />
              <span className="top-text hero-font align-center text-3xl">Favorites</span>
            </div>
          </div>
        </NavLink>
      </div> */}

      {/* <Trades amountToLoad={5} /> */}
    </>
  );
}

export default TradesPage;
