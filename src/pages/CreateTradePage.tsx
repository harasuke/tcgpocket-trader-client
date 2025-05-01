import React from "react";
import { Pagination } from "antd";

interface CreateTradePageProps {}

export const CreateTradePage = ({}: CreateTradePageProps) => {
  return (
    <>
      <Pagination
        total={85}
        showSizeChanger
        showQuickJumper
        showTotal={(total) => `Total ${total} items`}
      />
    </>
  );
};
