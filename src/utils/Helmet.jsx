import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

const SITE_URL = import.meta.env.VITE_SITE_URL;

const routeToKey = {
  "/": "home",
  "/about": "about",
  "/services": "services",
  "/news": "news",
  "/contact": "contact",
};

export default function HelmetPage({
  overrideTitle,
  overrideDescription,
  overrideKeywords,
  overrideImage,
}) {
  const { t, i18n } = useTranslation();
  const { pathname } = useLocation();

  const pageKey = routeToKey[pathname] || "home";

  const title = overrideTitle || t(`seo.${pageKey}.title`);
  const description = overrideDescription || t(`seo.${pageKey}.description`);
  const keywords = overrideKeywords || t(`seo.${pageKey}.keywords`);
  const image = overrideImage || t(`seo.image`, { defaultValue: `${SITE_URL}/og-image.jpg` });

  const url = `${SITE_URL}${pathname}`;

  return (
    <Helmet prioritizeSeoTags>
      <title>{title || "OXYZ"}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={url} />
      <meta name="robots" content="index, follow" />
      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      {/* JSON-LD schema */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          url,
          name: title,
          description,
          inLanguage: i18n.language,
        })}
      </script>
    </Helmet>
  );
}