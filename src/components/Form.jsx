"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import worldImage from "../assets/world image.svg"
import girlImage from "../assets/Girl manager.svg"
import manager from "../assets/menager.png"
import { useTranslation } from "react-i18next"

const Form = () => {
  const { t } = useTranslation()
  const [step, setStep] = useState(1)
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)
  const [notification, setNotification] = useState(null)

  const [formData, setFormData] = useState({
    from: "",
    to: "",
    cargo: "",
    weight: "",
    transport: "",
    name: "",
    phone: "",
  })

  const [errors, setErrors] = useState({})

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768)
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024)
    }

    checkScreenSize()
    window.addEventListener("resize", checkScreenSize)

    return () => {
      window.removeEventListener("resize", checkScreenSize)
    }
  }, [])

  const showNotification = (message, type = "success") => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))

    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }))
    }
  }

  const formatPhoneNumber = (value) => {
    const cleaned = value.replace(/[^\d]/g, "")
    let formatted = cleaned
    if (cleaned.length >= 2) {
      formatted = cleaned.slice(0, 2)
      if (cleaned.length >= 3) {
        formatted += " " + cleaned.slice(2, 5)
        if (cleaned.length >= 6) {
          formatted += " " + cleaned.slice(5, 7)
          if (cleaned.length >= 8) {
            formatted += " " + cleaned.slice(7, 9)
          }
        }
      }
    }

    return formatted
  }

  const handlePhoneChange = (value) => {
    const formatted = formatPhoneNumber(value)
    const digitsOnly = formatted.replace(/\s/g, "")

    if (digitsOnly.length <= 9) {
      handleInputChange("phone", formatted)
    }
  }

  const validateStep1 = () => {
    const newErrors = {}

    if (!formData.from.trim()) {
      newErrors.from = t("form.message_1")
    } else if (formData.from.trim().length < 2) {
      newErrors.from = t("form.message_2")
    }

    if (!formData.to.trim()) {
      newErrors.to = t("form.message_3")
    } else if (formData.to.trim().length < 2) {
      newErrors.to = t("form.message_4")
    }

    if (
      formData.from.trim() &&
      formData.to.trim() &&
      formData.from.trim().toLowerCase() === formData.to.trim().toLowerCase()
    ) {
      newErrors.to = t("form.message_5")
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateStep2 = () => {
    const newErrors = {}

    if (!formData.cargo.trim()) {
      newErrors.cargo = t("form.message_6")
    } else if (formData.cargo.trim().length < 2) {
      newErrors.cargo = t("form.message_7")
    }

    if (!formData.weight.trim()) {
      newErrors.weight = t("form.message_7")
    } else if (formData.weight.trim().length < 1) {
      newErrors.weight = t("form.message_8")
    }

    if (!formData.transport.trim()) {
      newErrors.transport = t("form.message_9")
    } else if (formData.transport.trim().length < 2) {
      newErrors.transport = t("form.message_10")
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateStep3 = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = t("form.message_11")
    } else if (formData.name.trim().length < 2) {
      newErrors.name = t("form.message_12")
    } else if (formData.name.trim().length > 50) {
      newErrors.name = t("form.message_13")
    } else if (!/^[а-яё\s\-.a-z]+$/i.test(formData.name.trim())) {
      newErrors.name = t("form.message_14")
    }

    if (!formData.phone.trim()) {
      newErrors.phone = t("form.message_15")
    } else {
      const phoneDigits = formData.phone.replace(/\s/g, "")
      if (phoneDigits.length !== 9) {
        newErrors.phone = t("form.message_16")
      } else if (!/^\d{9}$/.test(phoneDigits)) {
        newErrors.phone = t("form.message_17")
      } else if (
        !["90", "91", "93", "94", "95", "97", "98", "99", "33", "71", "77", "88"].includes(phoneDigits.substring(0, 2))
      ) {
        newErrors.phone = t("form.message_18")
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    let isValid = false

    if (step === 1) {
      isValid = validateStep1()
    } else if (step === 2) {
      isValid = validateStep2()
    }

    if (isValid) {
      setStep(step + 1)
    }
  }

  const handleBack = () => {
    setStep(step - 1)
    setErrors({})
  }

  const handleSubmit = () => {
    if (validateStep3()) {
      const submissionData = {
        ...formData,
        phone: "+998" + formData.phone.replace(/\s/g, ""),
        submittedAt: new Date().toISOString(),
      }

      showNotification(t("form.message_19"), "success")

      setFormData({
        from: "",
        to: "",
        cargo: "",
        weight: "",
        transport: "",
        name: "",
        phone: "",
      })
      setErrors({})
      setStep(1)
    }
  }

  return (
    <>
      <div className="container mx-auto flex flex-col items-center justify-start bg-white md:justify-center my-10 md:my-20">
        <div className="text-center mb-8 md:mb-10">
          {isMobile || isTablet ? (
            <h1
              title="Оставьте заявку и получите расчет доставки вашего груза"
              className="text-[28px] md:text-[36px] lg:text-[48px] font-[600] font-manrope leading-[120%] px-4"
            >
              {t("form.media_title")}
            </h1>
          ) : (
            <h1
              title="Оставьте заявку и получите расчет доставки вашего груза"
              className="text-[28px] md:text-[36px] lg:text-[48px] font-[600] font-manrope leading-[120%] px-4"
            >
              {t("form.title_1")} <br /> {t("form.title_2")}
            </h1>
          )}
        </div>
        <div
          className={`relative container bg-white rounded-[14px] overflow-hidden ${
            isMobile || isTablet ? "flex flex-col" : "pl-3.5"
          }`}
        >
          <img
            src={worldImage || "/placeholder.svg"}
            alt="World Map"
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover opacity-80 bg-gray-100 z-0"
          />
          <div
            className={`relative z-10 ${
              isMobile || isTablet ? "flex flex-col" : "flex flex-row items-center justify-between py-3"
            }`}
          >
            {/* Form Area */}
            <div
              className={`${
                isMobile
                  ? "w-full bg-white flex-1 p-6 z-10"
                  : isTablet
                    ? "w-full bg-white flex-1 p-8 z-10"
                    : "w-full lg:w-1/2 xl:w-[50%] bg-white rounded-[14px] min-h-[525px] p-15"
              } flex items-start justify-center`}
            >
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 50 }}
                    transition={{ duration: 0.5 }}
                    className="w-full h-[445px] flex flex-col justify-between"
                  >
                    <div className="">
                    <div className="mb-8">
                      <label htmlFor="from" className="block font-manrope font-[500] text-[16px] leading-[100%] mb-2">
                        {t("form.label_1")}
                      </label>
                      <input
                        id="from"
                        type="text"
                        placeholder={t("form.placeholder_1")}
                        value={formData.from}
                        onChange={(e) => handleInputChange("from", e.target.value)}
                        className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 ${
                          errors.from ? "border-red-500" : "border-gray-300"
                        }`}
                      />
                      {errors.from && <p className="text-red-500 text-xs mt-1">{errors.from}</p>}
                    </div>
                    <div className="mb-6">
                      <label htmlFor="to" className="block font-manrope font-[500] text-[16px] leading-[100%] mb-2">
                        {t("form.label_2")}
                      </label>
                      <input
                        id="to"
                        type="text"
                        placeholder={t("form.placeholder_2")}
                        value={formData.to}
                        onChange={(e) => handleInputChange("to", e.target.value)}
                        className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 ${
                          errors.to ? "border-red-500" : "border-gray-300"
                        }`}
                      />
                      {errors.to && <p className="text-red-500 text-xs mt-1">{errors.to}</p>}
                    </div>
                    </div>
                    <div className="">
                    <div className="relative inline-block w-full">
                      <motion.button
                        onClick={handleNext}
                        className="relative w-full cursor-pointer bg-[#F07C00] hover:bg-orange-600 text-white font-[500] text-[18px] leading-[100%] font-manrope rounded-md transition-colors overflow-hidden py-5"
                      >
                        {t("form.submit")}
                        {/* Shine Effect */}
                        <motion.div
                          className="absolute top-0 left-0 w-full h-full pointer-events-none z-50"
                          initial={{ x: "-100%" }}
                          animate={{ x: ["-100%", "200%"] }}
                          transition={{
                            duration: 2.2,
                            repeat: Number.POSITIVE_INFINITY,
                            repeatDelay: 3,
                            ease: "easeInOut",
                          }}
                        >
                          <div className="w-[30%] h-full bg-gradient-to-r from-transparent via-white/70 to-transparent transform -skew-x-12" />
                        </motion.div>
                      </motion.button>
                    </div>
                    <div className="flex items-center gap-2 mt-6">
                      <div className="w-[33%]">
                        <p className="flex justify-between items-center text-xs text-gray-400">{t("form.location")}</p>
                        <div className="flex-1 h-1 rounded bg-[#F07C00] mt-1"/>
                      </div>
                      <div className="w-[33%] text-center">
                        <p className="flex justify-between items-center text-xs text-gray-400">{t("form.box")}</p>
                        <div className="flex-1 h-1 rounded bg-orange-100 mt-1"/>
                      </div>
                      <div className="w-[33%] text-center">
                        <p className="flex justify-between items-center text-xs text-gray-400">{t("form.saller")}</p>
                        <div className="flex-1 h-1 rounded bg-orange-100 mt-1" />
                      </div>
                    </div>
                    </div>
                  </motion.div>
                )}
                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.5 }}
                    className="w-full h-[325px]"
                  >
                    <div className="mb-4">
                      <label htmlFor="cargo" className="block font-manrope font-[500] text-[16px] leading-[100%] mb-2">
                        {t("form.box_whats")}
                      </label>
                      <input
                        id="cargo"
                        type="text"
                        placeholder={t("form.placeholder_3")}
                        value={formData.cargo}
                        onChange={(e) => handleInputChange("cargo", e.target.value)}
                        className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 ${
                          errors.cargo ? "border-red-500" : "border-gray-300"
                        }`}
                      />
                      {errors.cargo && <p className="text-red-500 text-xs mt-1">{errors.cargo}</p>}
                    </div>
                    <div className="mb-4">
                      <label htmlFor="weight" className="block font-manrope font-[500] text-[16px] leading-[100%] mb-2">
                        {t("form.label_3")}
                      </label>
                      <input
                        id="weight"
                        type="text"
                        placeholder={t("form.placeholder_3")}
                        value={formData.weight}
                        onChange={(e) => handleInputChange("weight", e.target.value)}
                        className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 ${
                          errors.weight ? "border-red-500" : "border-gray-300"
                        }`}
                      />
                      {errors.weight && <p className="text-red-500 text-xs mt-1">{errors.weight}</p>}
                    </div>
                    <div className="mb-6">
                      <label
                        htmlFor="transport"
                        className="block font-manrope font-[500] text-[16px] leading-[100%] mb-2"
                      >
                        {t("form.label_4")}
                      </label>
                      <input
                        id="transport"
                        type="text"
                        placeholder={t("form.placeholder_4")}
                        value={formData.transport}
                        onChange={(e) => handleInputChange("transport", e.target.value)}
                        className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 ${
                          errors.transport ? "border-red-500" : "border-gray-300"
                        }`}
                      />
                      {errors.transport && <p className="text-red-500 text-xs mt-1">{errors.transport}</p>}
                    </div>
                    <div className="flex gap-3 mt-20">
                      <div className="relative inline-block flex-1">
                        <motion.button
                          onClick={handleBack}
                          className="relative w-full cursor-pointer bg-gray-200 hover:bg-gray-300 text-gray-700 font-[500] text-[18px] py-4 rounded-md transition-colors overflow-hidden"
                        >
                          {t("form.cancel")}
                          {/* Shine Effect */}
                          <motion.div
                            className="absolute top-0 left-0 w-full h-full pointer-events-none z-50"
                            initial={{ x: "-100%" }}
                            animate={{ x: ["-100%", "200%"] }}
                            transition={{
                              duration: 2.2,
                              repeat: Number.POSITIVE_INFINITY,
                              repeatDelay: 3,
                              ease: "easeInOut",
                            }}
                          >
                            <div className="w-[30%] h-full bg-gradient-to-r from-transparent via-white/70 to-transparent transform -skew-x-12" />
                          </motion.div>
                        </motion.button>
                      </div>
                      <div className="relative inline-block flex-1">
                        <motion.button
                          onClick={handleNext}
                          className="relative w-full cursor-pointer bg-[#F07C00] hover:bg-orange-600 text-white font-[500] text-[18px] py-4 rounded-md transition-colors overflow-hidden"
                        >
                          {t("form.submit")}
                          {/* Shine Effect */}
                          <motion.div
                            className="absolute top-0 left-0 w-full h-full pointer-events-none z-50"
                            initial={{ x: "-100%" }}
                            animate={{ x: ["-100%", "200%"] }}
                            transition={{
                              duration: 2.2,
                              repeat: Number.POSITIVE_INFINITY,
                              repeatDelay: 3,
                              ease: "easeInOut",
                            }}
                          >
                            <div className="w-[30%] h-full bg-gradient-to-r from-transparent via-white/70 to-transparent transform -skew-x-12" />
                          </motion.div>
                        </motion.button>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-6">
                      <div className="w-[33%]">
                        <p className="flex justify-between items-center text-xs text-gray-400">{t("form.location")}</p>
                        <div className="flex-1 h-1 rounded bg-orange-100 mt-1"/>
                      </div>
                      <div className="w-[33%] text-center">
                        <p className="flex justify-between items-center text-xs text-gray-400">{t("form.box")}</p>
                        <div className="flex-1 h-1 rounded bg-[#F07C00] mt-1"/>
                      </div>
                      <div className="w-[33%] text-center">
                        <p className="flex justify-between items-center text-xs text-gray-400">{t("form.saller")}</p>
                        <div className="flex-1 h-1 rounded bg-orange-100 mt-1" />
                      </div>
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.5 }}
                    className="w-full h-[445px] flex flex-col justify-between"
                  >
                    <div className="">
                    <div className="mb-6">
                      <label htmlFor="name" className="block font-manrope font-[500] text-[16px] leading-[100%] mb-2">
                        {t("form.name")}
                      </label>
                      <input
                        id="name"
                        type="text"
                        placeholder={t("form.type_name")}
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 ${
                          errors.name ? "border-red-500" : "border-gray-300"
                        }`}
                      />
                      {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                    </div>
                    <div className="mb-6">
                      <label htmlFor="phone" className="block font-manrope font-[500] text-[16px] leading-[100%] mb-2">
                        {t("form.phone")}
                      </label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">+998</span>
                        <input
                          id="phone"
                          type="tel"
                          placeholder="XX XXX XX XX"
                          value={formData.phone}
                          onChange={(e) => handlePhoneChange(e.target.value)}
                          className={`w-full pl-16 pr-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 ${
                            errors.phone ? "border-red-500" : "border-gray-300"
                          }`}
                        />
                      </div>
                    </div>
                      {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                    </div>
                    <div className="flex gap-3 mt-30">
                      <div className="relative inline-block flex-1">
                        <motion.button
                          onClick={handleBack}
                          className="relative w-full cursor-pointer bg-gray-200 hover:bg-gray-300 text-gray-700 font-[500] text-[18px] py-4 rounded-md transition-colors overflow-hidden"
                        >
                          {t("form.cancel")}
                          {/* Shine Effect */}
                          <motion.div
                            className="absolute top-0 left-0 w-full h-full pointer-events-none z-50"
                            initial={{ x: "-100%" }}
                            animate={{ x: ["-100%", "200%"] }}
                            transition={{
                              duration: 2.2,
                              repeat: Number.POSITIVE_INFINITY,
                              repeatDelay: 3,
                              ease: "easeInOut",
                            }}
                          >
                            <div className="w-[30%] h-full bg-gradient-to-r from-transparent via-white/70 to-transparent transform -skew-x-12" />
                          </motion.div>
                        </motion.button>
                      </div>
                      <div className="relative inline-block flex-1">
                        <motion.button
                          onClick={handleSubmit}
                          className="relative w-full cursor-pointer bg-[#F07C00] hover:bg-orange-600 text-white font-[500] text-[18px] py-4 rounded-md transition-colors overflow-hidden"
                        >
                          {t("form.message_20")}
                          {/* Shine Effect */}
                          <motion.div
                            className="absolute top-0 left-0 w-full h-full pointer-events-none z-50"
                            initial={{ x: "-100%" }}
                            animate={{ x: ["-100%", "200%"] }}
                            transition={{
                              duration: 2.2,
                              repeat: Number.POSITIVE_INFINITY,
                              repeatDelay: 3,
                              ease: "easeInOut",
                            }}
                          >
                            <div className="w-[30%] h-full bg-gradient-to-r from-transparent via-white/70 to-transparent transform -skew-x-12" />
                          </motion.div>
                        </motion.button>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-6">
                      <div className="w-[33%]">
                        <p className="flex justify-between items-center text-xs text-gray-400">{t("form.location")}</p>
                        <div className="flex-1 h-1 rounded bg-orange-100 mt-1"/>
                      </div>
                      <div className="w-[33%] text-center">
                        <p className="flex justify-between items-center text-xs text-gray-400">{t("form.box")}</p>
                        <div className="flex-1 h-1 rounded bg-orange-100 mt-1"/>
                      </div>
                      <div className="w-[33%] text-center">
                        <p className="flex justify-between items-center text-xs text-gray-400">{t("form.saller")}</p>
                        <div className="flex-1 h-1 rounded bg-[#F07C00] mt-1" />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            {/* Image */}
            <div
              className={`${
                isMobile
                  ? "w-full h-auto"
                  : isTablet
                    ? "w-full h-[400px] relative"
                    : "w-full h-[525px] lg:w-1/2 flex items-center justify-center mt-0 relative"
              }`}
            >
              <img
                src={isMobile ? manager : girlImage}
                alt="Girl with headset"
                loading="lazy"
                className={`${
                  isMobile
                    ? "w-full h-auto max-h-[400px] object-contain mx-auto"
                    : isTablet
                      ? "w-[350px] h-[350px] object-contain absolute -bottom-3 right-0 left-0 mx-auto"
                      : "w-[400px] lg:w-[500px] h-[600px] scale-[1.15] object-contain absolute -bottom-14 right-0"
                }`}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Custom Notification */}
      <AnimatePresence>
        {notification && (
          <motion.div
            className={`fixed top-5 left-[50%] translate-x-[-50%] z-[9999] rounded-lg px-5 py-3 text-white font-medium shadow-xl ${
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
    </>
  )
}

export default Form;