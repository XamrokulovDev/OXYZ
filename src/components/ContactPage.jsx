import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import axios from "axios";
import { BsTelephone } from "react-icons/bs";
import { IoMailOutline } from "react-icons/io5";
import { GrLocation } from "react-icons/gr";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";

const NotificationPortal = ({ notification }) =>
  notification
    ? createPortal(
        <AnimatePresence>
          <motion.div
            className={`fixed top-5 left-1/2 -translate-x-1/2 z-[99999] rounded-lg px-5 py-3 text-white font-medium shadow-xl ${
              notification.type === "success" ? "bg-green-500" : "bg-red-500"
            }`}
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
          >
            {notification.message}
          </motion.div>
        </AnimatePresence>,
        document.body
      )
    : null;

const ContactPage = () => {
  const { t } = useTranslation();
  const _api = import.meta.env.VITE_API;

  const [form, setForm] = useState({ name: "", phone: "", agree: false });
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setForm(type === "checkbox" ? { ...form, agree: checked } : { ...form, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name.trim() || !form.phone.trim()) {
      setNotification({ type: "error", message: t("contact.message_1") });
      return;
    }
    if (!form.agree) {
      setNotification({ type: "error", message: t("contact.message_2") });
      return;
    }

    setLoading(true);
    setNotification(null);

    try {
      await axios.post(
        `${_api}/api/consultations`,
        { username: form.name.trim(), phone_number: `+998${form.phone.trim()}` },
        { headers: { "Content-Type": "application/json" }, timeout: 10000 }
      );

      setNotification({ type: "success", message: t("form.message_success") });
      setForm({ name: "", phone: "", agree: false });

      setTimeout(() => setNotification(null), 3000);
    } catch (err) {
      const msg = err.response?.data?.detail || err.message || t("form.message_error_api");
      setNotification({ type: "error", message: msg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <NotificationPortal notification={notification} />

      <div className="container mx-auto px-4">
        <div className="flex flex-col xl:flex-row justify-between max-xl:items-center my-30 gap-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full xl:w-[50%]"
          >
            <h1 title={t("contact.title")} className="font-manrope text-[#1A1A18] font-[600] text-[28px] sm:text-[40px] leading-[100%]">
              {t("contact.title")}
            </h1>

            <div className="my-15">
              <div className="flex gap-2 my-10">
                <BsTelephone className="w-[44px] h-[44px] bg-[#E5E4E2] p-[10px] rounded-[8px]" />
                <div>
                  <p className="text-[#A7A6A1] text-[14px] sm:text-[16px] mb-1">{t("form.phone")}</p>
                  <p className="text-[#1A1A18] text-[18px] sm:text-[24px] font-[500]">+998-99-536-57-47</p>
                </div>
              </div>

              <div className="flex gap-2 my-10">
                <BsTelephone className="w-[44px] h-[44px] bg-[#E5E4E2] p-[10px] rounded-[8px]" />
                <div>
                  <p className="text-[#A7A6A1] text-[14px] sm:text-[16px] mb-1">{t("form.phone")}</p>
                  <p className="text-[#1A1A18] text-[18px] sm:text-[24px] font-[500]">+998-90-823-22-32</p>
                </div>
              </div>

              <div className="flex gap-2 my-8">
                <IoMailOutline className="w-[44px] h-[44px] bg-[#E5E4E2] p-[10px] rounded-[8px]" />
                <div>
                  <p className="text-[#A7A6A1] text-[14px] sm:text-[16px] mb-1">E-mail</p>
                  <p className="text-[#1A1A18] text-[18px] sm:text-[24px] font-[500]">
                    ufdworldservice@gmail.com
                  </p>
                </div>
              </div>

              <div className="flex gap-2 my-8">
                <GrLocation className="w-[44px] h-[44px] bg-[#E5E4E2] p-[10px] rounded-[8px]" />
                <div>
                  <p className="text-[#A7A6A1] text-[14px] sm:text-[16px] mb-1">{t("contact.location")}</p>
                  <p className="text-[#1A1A18] text-[18px] sm:text-[24px] font-[500]">{t("contact.map")}</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-[615px]"
          >
            <h1 title={t("contact.description_1")} className="font-manrope font-[600] text-[24px] sm:text-[40px] leading-[100%]">
              {t("contact.description_1")} <br /> {t("contact.description_2")}
            </h1>

            <form
              onSubmit={handleSubmit}
              className="w-full bg-[#F7F7F6] rounded-lg sm:p-10 mt-8 p-6"
            >
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-[14px] sm:text-[16px] font-medium mb-3 font-manrope"
                >
                  {t("form.name")}
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder={t("form.type_name")}
                  value={form.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-orange-400 transition border-[#CAC9C5] placeholder:text-[#BDBDBD]"
                />
              </div>

              <div className="py-2">
                <label
                  htmlFor="phone"
                  className="block text-sm sm:text-[16px] font-medium mb-3 font-manrope"
                >
                  {t("form.phone")}
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">+998</span>
                  <input
                    id="phone"
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    placeholder="XX XXX XX XX"
                    value={form.phone}
                    onChange={(e) => {
                      const onlyNums = e.target.value.replace(/\D/g, "").slice(0, 9);
                      setForm({ ...form, phone: onlyNums });
                    }}
                    className="w-full pl-14 pr-4 py-3 border rounded-md focus:ring-2 focus:ring-orange-400 transition border-[#CAC9C5] placeholder:text-[#BDBDBD]"
                  />
                </div>
              </div>

              <div className="flex items-start gap-3 mt-40">
                <input
                  type="checkbox"
                  id="agree"
                  checked={form.agree}
                  onChange={handleChange}
                  className="mt-1 scale-[1.8] accent-[#FFDB85]"
                />
                <label htmlFor="agree" className="text-sm sm:text-[16px] font-medium font-manrope">
                  {t("contact.check")}
                </label>
              </div>

              <button
                type="submit"
                disabled={!form.agree || loading}
                className={`w-full h-[67px] text-[16px] sm:text-[20px] font-[400] font-manrope leading-[100%] rounded-md mt-5 transition ${
                  form.agree && !loading
                    ? "bg-[#F07C00] text-[#FFFAEA] cursor-pointer"
                    : "bg-[#f5c84b] text-[#FFFAEA] opacity-50 cursor-not-allowed"
                }`}
              >
                {loading ? t("contact.loading") : t("contact.button")}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default ContactPage;