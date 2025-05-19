import React, { useState } from "react";
import { HeroCards } from "../../components/HeroSection/HeroCardList";
import Trades from "src/components/Trades/Trades";
import { NavLink } from "react-router";
import { GiCardExchange, GiCardPick, GiCardRandom } from "react-icons/gi";
import { MdFavorite } from "react-icons/md";
import "src/pages/TradesPage/TradePage.css";
import { Input, Tabs } from "antd";
import { BsSearchHeart } from "react-icons/bs";
import { PiHandHeartBold } from "react-icons/pi";
import TabPane from "antd/es/tabs/TabPane";
import { Endpoints } from "src/types/Endpoints";
import { AvailableCardList } from "src/components/AvailableCardList/AvailableCardList";
import useDebounceInput from "src/hooks/UseDebounceInput";
import { CloseOutlined, SearchOutlined } from "@ant-design/icons";

function TradesPage() {
  const heroCards = HeroCards;

  const [searchByName, setSearchByName] = useState<string | null>(null);
  const { debouncedInput, setDebouncedInput, setRefresh } = useDebounceInput(searchByName, 200);

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
                {i === 0 ? "Tradable" : "Might interest"}
                {/* {i === 0 ? "Check what people are searching for" : "Check what people are offering"} */}
              </span>
            ),
            children: i === 0 ? <AvailableCardList /> : "Offer content here",
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
