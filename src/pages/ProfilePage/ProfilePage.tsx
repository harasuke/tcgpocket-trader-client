import { useClerk } from "@clerk/clerk-react";
import { Button, Input, Select } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { IoLogOutOutline } from "react-icons/io5";
import { InputFriendcode } from "src/components/AuthForm/InputFriendcode";
import useUserData from "src/hooks/api/UseUserData";
import useDetectDevice from "src/hooks/UseDetectDevice";
import "./ProfilePage.css";
import useLanguageSelect from "src/hooks/useLanguageSelect";
import { StoreContext } from "src/stores/StoreContext";
import { CardLanguage } from "src/types/CardLanguage";

function ProfilePage() {
  const { signOut } = useClerk();
  const { res, loadingReq } = useUserData();
  const { device, screenWidth } = useDetectDevice();

  const storeContext = useContext(StoreContext);

  const { LanguageSelect: AppLanguageSelect, currentLanguage: appLang } = useLanguageSelect(
    storeContext?.favouriteLanguage ?? CardLanguage.IT,
  );
  const { LanguageSelect: CardDexLanguageSelect, currentLanguage: carddexLang } = useLanguageSelect(
    storeContext?.cardDexLanguage ?? CardLanguage.IT,
  );

  useEffect(() => {
    storeContext?.setFavouriteLanguage(appLang);
  }, [appLang]);

  useEffect(() => {
    storeContext?.setCardDexLanguage(carddexLang)
  }, [carddexLang]);

  return (
    <>
      {device === "Desktop" && (
        <div>
          WORK IN PROGRESS: Profile page on desktop view. Please switch to mobile in the meantime
        </div>
      )}
      {device === "Mobile" || device === "Tablet" ? (
        <>
          <div className="m-6 flex flex-col gap-[2.5rem]">
            <div className="flex items-center justify-between">
              <span className="hero-font text-4xl">Profile</span>
              <Button
                className="hero-font !rounded-3xl !bg-red-300 !text-xl !text-red-800"
                onClick={() => signOut({ redirectUrl: "/signin" })}
              >
                <IoLogOutOutline className="text-xl" />
                Log out
              </Button>
            </div>

            <Input disabled={true} value={res.data?.email ?? "TODO show email"} />

            <div className="settings-friendcode-input hero-font">
              <InputFriendcode disabled={(res.data?.friendcode ?? true) != ""} />
            </div>

            <div className="flex justify-between">
              <div className="flex flex-col">
                <span className="hero-font">Application Lang.</span>
                {AppLanguageSelect}
              </div>
              <div className="flex flex-col">
                <span className="hero-font">CardDex Lang.</span>
                {CardDexLanguageSelect}
              </div>
            </div>

            <Button className="hero-font !rounded-3xl !bg-blue-400 !text-white">Save</Button>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
}

export default ProfilePage;
