import { Select } from "antd";
import React, { useContext, useState } from "react";
import { CardLanguage } from "src/types/CardLanguage";

export default function useLanguageSelect(language: CardLanguage) {
  const [currentLanguage, setCurrentLanguage] = useState<CardLanguage>(language);

  const languageOptions = Object.values(CardLanguage).map((e) => ({
    value: e,
    label: (
      <span className="hero-font mr-[3ch] flex w-[4ch] items-center">
        <img className="align-self-center mr-1 !h-[2rem]" src={`/lang-flags/${e}.svg`} />
        {e.toUpperCase()}
      </span>
    ),
  }));

  const LanguageSelect = (
    <Select
      className="language-selection !rounded-3xl"
      options={languageOptions}
      onChange={(value) => {
        setCurrentLanguage(value as unknown as CardLanguage);
      }}
      defaultValue={{
        value: currentLanguage,
        label: (
          <span className="hero-font mr-[3ch] flex w-[4ch] items-center">
            <img
              className="align-self-center mr-1 !h-[2rem]"
              src={`/lang-flags/${currentLanguage.toLowerCase()}.svg`}
            />
            {currentLanguage.toUpperCase()}
          </span>
        ),
      }}
    />
  );

  return { LanguageSelect, currentLanguage, setCurrentLanguage };
}
