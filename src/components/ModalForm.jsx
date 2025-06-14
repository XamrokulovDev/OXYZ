import { useState } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { CgClose } from "react-icons/cg";
import { AnimatePresence, motion } from "framer-motion";

const ModalForm = ({ onClose }) => {
  const { t } = useTranslation();
  const _api = import.meta.env.VITE_API;

  const [form, setForm] = useState({ name: "", phone: "", agree: false });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [notification, setNotification] = useState(null);
  const [modalHidden, setModalHidden] = useState(false);

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setForm(type === "checkbox" ? { ...form, agree: checked } : { ...form, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) return setError(t("contact.message_1"));
    if (!form.agree) return setError(t("contact.message_2"));

    setError("");
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

      setTimeout(() => {
        setModalHidden(true);
        setNotification(null);
        onClose();
      }, 2000);
    } catch (err) {
      const msg = err.response?.data?.detail || err.message || t("form.message_error_api");
      setNotification({ type: "error", message: msg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {notification && (
          <motion.div
            className={`fixed top-5 left-1/2 -translate-x-1/2 z-[9999] rounded-lg px-5 py-3 text-white font-medium ${
              notification.type === "success" ? "bg-green-500" : "bg-red-500"
            }`}
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
          >
            {notification.message}
          </motion.div>
        )}
      </AnimatePresence>

      {!modalHidden && (
        <div
          className="w-[550px] bg-white rounded-[14px] relative max-md:my-30 p-5 sm:p-10"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={() => {
              setModalHidden(true);
              onClose();
            }}
            className="text-white cursor-pointer rounded-full absolute -top-12 md:-top-10 max-md:right-0 -right-10 p-1"
          >
            <CgClose size={23} />
          </button>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-[16px] font-[500] font-manrope text-[#1A1A18] mb-3">
                {t("form.name")}
              </label>
              <input
                id="name"
                type="text"
                placeholder={t("form.type_name")}
                value={form.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-[8px] focus:ring-2 focus:ring-orange-400 transition border-[#CAC9C5] placeholder:text-[#BDBDBD] outline-none"
              />
            </div>

            <div className="py-2">
              <label htmlFor="phone" className="block text-[16px] font-medium font-manrope text-[#1A1A18] mb-3">
                {t("form.phone")}
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#1A1A18]">+998</span>
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
                  className="w-full pl-14 pr-4 py-3 border rounded-[8px] focus:ring-2 focus:ring-orange-400 transition border-[#CAC9C5] placeholder:text-[#CAC9C5] outline-none"
                />
              </div>
            </div>

            <div className="flex items-start gap-3 mt-5 lg:mt-30">
              <input
                type="checkbox"
                id="agree"
                checked={form.agree}
                onChange={handleChange}
                className="mt-1 scale-[1.5] accent-[#FFDB85]"
              />
              <label htmlFor="agree" className="text-[14px] font-medium font-manrope cursor-pointer">
                {t("contact.check")}
              </label>
            </div>

            {error && <p className="text-red-500 mt-4">{error}</p>}

            <button
              type="submit"
              disabled={!form.agree || loading}
              className={`w-full text-[16px] sm:text-[20px] font-[400] font-manrope leading-[100%] rounded-md mt-5 transition py-5 ${
                form.agree && !loading
                  ? "bg-[#F07C00] text-[#FFFAEA] cursor-pointer"
                  : "bg-[#f5c84b] text-[#FFFAEA] opacity-50 cursor-not-allowed"
              }`}
            >
              {loading ? t("contact.loading") : t("contact.button")}
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default ModalForm;