import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import rus from "../assets/rus.webp";
import uzb from "../assets/uzb.webp";

const TranslationCustom = () => {
  const { i18n } = useTranslation();

  useEffect(() => {
    const savedLang = localStorage.getItem("language") || "ru";
    i18n.changeLanguage(savedLang);
  }, [i18n]);

  const handleToggleLanguage = () => {
    const newLang = i18n.language === "uz" ? "ru" : "uz";
    i18n.changeLanguage(newLang);
    localStorage.setItem("language", newLang);
    window.location.reload();
  };

  const otherLang = i18n.language === "uz" ? "ru" : "uz";
  const flag = otherLang === "uz" ? uzb : rus;

  return (
    <button onClick={handleToggleLanguage} className="w-12 h-12 cursor-pointer bg-white/20 flex items-center justify-center rounded-[8px] backdrop-blur-[4] p-2">
      <img
        src={flag}
        alt={otherLang}
        loading="lazy"
        className="w-6 h-4"
      />
    </button>
  );
};

export default TranslationCustom;