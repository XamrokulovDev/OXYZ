import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useTranslation } from "react-i18next";

import Header from "../utils/Header";
import HomeCards from "../components/HomeCards";
import Article from "../components/Article";

const Articles = () => {
  const { id } = useParams();
  const _api = import.meta.env.VITE_API;
  const { i18n } = useTranslation();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    axios
      .get(`${_api}/api/news/${id}`)
      .then((res) => {
        setArticle(res.data.data);
      })
      .catch((err) => console.error("Xatolik:", err));
  }, [id, _api]);

  const articleTitle =
    article &&
    (i18n.language === "uz"
      ? article.title_uz
      : i18n.language === "ru"
      ? article.title_ru
      : article.title_en);

  return (
    <div>
      <Header articleTitle={articleTitle} />
      {article && <Article data={article} />}
      <HomeCards />
    </div>
  );
};

export default Articles;