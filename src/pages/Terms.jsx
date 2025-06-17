import axios from "axios";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

const Terms = () => {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const [social, setSocial] = useState({});
  const _api = import.meta.env.VITE_API;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${_api}/api/social-media`);
        setSocial(response.data.links);
      } catch (error) {
        console.error("Socials ma’lumotini olishda xatolik:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return (
    <div className="max-w-4xl mx-auto font-manrope text-[#1A1A18] font-[500] flex flex-col items-start md:gap-10 gap-5 md:py-20 p-5">
        <p>{t('terms.date')}</p>
        <p>{t('terms.title_1')}</p>
        <p>{t('terms.title_2')}</p>
        <p>{t('terms.title_3')}</p>
        <p>{t('terms.title_4')}</p>
        <p>{t('terms.title_5')}</p>
        <p>{t('terms.title_6')}</p>
        <p>{t('terms.title_7')}</p>
        <div className="flex flex-col gap-2">
            <a 
              href="https://mail.google.com/mail/?view=cm&fs=1&to=ufdworldservice@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
                ufdworldservice@gmail.com
            </a>
            <a 
                href={`tel:${social?.phone_number1}`} 
                className="block"
            >
                {social?.phone_number1}
            </a>
        </div>
    </div>
  )
}

export default Terms;