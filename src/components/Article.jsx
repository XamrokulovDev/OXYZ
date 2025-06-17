import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import DOMPurify from 'dompurify'

const Article = () => {
  const [news, setNews] = useState({})
  const { i18n } = useTranslation()
  const _api = import.meta.env.VITE_API
  const { id } = useParams()

  useEffect(() => {
    axios
      .get(`${_api}/api/news/${id}`)
      .then((res) => setNews(res.data.data))
      .catch((err) => console.error('Xatolik:', err))
  }, [_api, id])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const getCleanDesc = () => {
    const raw =
      i18n.language === 'uz'
        ? news?.description_uz || ''
        : i18n.language === 'ru'
        ? news?.description_ru || ''
        : news?.description_en || ''

    return DOMPurify.sanitize(raw, { FORBID_ATTR: ['style'] })
  }

  return (
    <motion.div
      className="mx-auto container px-[16px] mb-[80px]"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <motion.h1
        className="text-[#1A1A18] font-[600] text-[28px] md:text-[40px] lg:text-[48px] leading-[120%] font-manrope mt-20"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        {i18n.language === 'uz' ? news.title_uz : news.title_ru}
      </motion.h1>
      <motion.img
        src={`${_api}/uploads/${news?.image}`}
        alt={i18n.language === 'uz' ? news.title_uz : news.title_ru}
        loading="lazy"
        className="w-full h-[300px] md:h-[500px] object-cover my-15"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      />

      <motion.div
        className="font-[400] text-[16px] md:text-[20px] text-[#1A1A18] leading-[32px] font-manrope"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        dangerouslySetInnerHTML={{ __html: getCleanDesc() }}
      />
    </motion.div>
  )
}

export default Article;