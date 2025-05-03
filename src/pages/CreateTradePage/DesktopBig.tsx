import { CloseOutlined, SearchOutlined } from "@ant-design/icons";
import { Badge, Button, Input } from "antd";
import React, { useContext } from "react";
import Draggable from "react-draggable";
import { FilterIcon } from "src/assets/FilterIcon";
import Card from "src/components/Card";
import SkeletonCard from "src/components/SkeletonCard/SkeletonCard";
import { StoreContext } from "src/stores/StoreContext";
import { Meta } from "src/types/api/Meta";

interface DesktopBigProps {
  filtersAmount: number;
  cardsPerPage: number;
  res: { data: { id: string; imageUrl: string }[]; meta: Meta };
  loadingReq: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
}

export const DesktopBig = ({
  cardsPerPage,
  res,
  loadingReq,
  children,
  setShowModal,
  filtersAmount,
}: DesktopBigProps) => {
  const storeContext = useContext(StoreContext);

  return (
    <div className="flex w-full">
      <div className="trade-builder m-3 w-[30%] outline-1">builder</div>
      <div className="card-searcher sticky m-3 m-auto h-auto w-full outline-1 outline-red-500">
        <div className="flex justify-evenly outline-1 outline-green-500">
          <Badge count={filtersAmount} className="filter-badge" color={storeContext?.navbarColor}>
            <Button className="my-3 ml-1 ml-3 flex outline-1" onClick={() => setShowModal(true)}>
              <FilterIcon />
              Filters
            </Button>
          </Badge>

          <Input
            className="m-3"
            placeholder="Card search... (multiple names must be separated by coma)"
            prefix={<SearchOutlined />}
            suffix={
              <button onClick={() => console.log("hey")}>
                <CloseOutlined />
              </button>
            }
          />
        </div>
        <div className="cardex-grid m-3 grid place-items-center gap-x-2 !gap-y-4 sm:!gap-y-2">
          {loadingReq
            ? Array.from({ length: cardsPerPage }).map((c: any, index: number) => (
                <SkeletonCard key={index} />
              ))
            : res?.data?.length > 0 &&
              res.data.map((c: any, index: number) => (
                <Card key={index} url={c.imageUrl} canZoom={false} isBatchView={true} />
              ))}
        </div>
        {children}
      </div>
    </div>
  );
};
