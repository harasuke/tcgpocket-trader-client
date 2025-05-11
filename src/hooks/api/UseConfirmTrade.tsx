import React from "react";
import { Card } from "src/types/api/Card";
import { Endpoints } from "src/types/Endpoints";
import usePostAPI from "../UsePostAPI";
import { useNavigate } from "react-router";

export default function useConfirmTrade(messageApi: any, setBlockSubmitTrade: any) {
  const { postRequest: _postRequest } = usePostAPI();
  const navigate = useNavigate();

  const confirmTrade = (wantedCard: Card|null, offeredCards: Card[]|[]) => {
    if (wantedCard == null || offeredCards.length == 0) {
      messageApi.open({
        type: "error",
        content: (
          <>
            There is a problem with your authentication.
            <br />
            Try again or Login
          </>
        ),
      });
      return;
    }

    return _postRequest(Endpoints.POST_CONFIRM_TRADE(), {
      wantedCardId: wantedCard?.id,
      offeredCardIds: offeredCards.map((c) => c.id),
    })
      .then((res) => {
        setBlockSubmitTrade(true);
        messageApi.open({
          type: "success",
          duration: 1,
          content: (
            <>
              Trade created !<br />
              You'll be redirected shortly
            </>
          ),
          onClose: () => {
            navigate("/trades");
          },
        });
      })
      .catch((err) => {
        if (err.status == 401)
          messageApi.open({
            type: "error",
            content: (
              <>
                There is a problem with your authentication.
                <br />
                Try again or Login
              </>
            ),
          });
        else messageApi.open({ type: "error", content: err.statusText });
      });
  };

  return { confirmTrade };
}
