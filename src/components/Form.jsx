import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import worldImage from "../assets/world image.svg"
import girlImage from "../assets/Girl manager.svg"

const Form = () => {
  const [step, setStep] = useState(1)
  const [isMobile, setIsMobile] = useState(false)
  const [notification, setNotification] = useState(null)
  
  const [formData, setFormData] = useState({
    from: "",
    to: "",
    cargo: "",
    weight: "",
    transport: "",
    name: "",
    phone: ""
  })
  
  const [errors, setErrors] = useState({})

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => {
      window.removeEventListener("resize", checkMobile)
    }
  }, [])

  const showNotification = (message, type = "success") => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification(null)
    }, 3000) // 3 sekunddan keyin notification yo'qoladi
  }

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
    
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ""
      }))
    }
  }

  const formatPhoneNumber = (value) => {
    const cleaned = value.replace(/[^\d]/g, '')
    let formatted = cleaned
    if (cleaned.length >= 2) {
      formatted = cleaned.slice(0, 2)
      if (cleaned.length >= 3) {
        formatted += ' ' + cleaned.slice(2, 5)
        if (cleaned.length >= 6) {
          formatted += ' ' + cleaned.slice(5, 7)
          if (cleaned.length >= 8) {
            formatted += ' ' + cleaned.slice(7, 9)
          }
        }
      }
    }
    
    return formatted
  }

  const handlePhoneChange = (value) => {
    const formatted = formatPhoneNumber(value)
    const digitsOnly = formatted.replace(/\s/g, '')
    
    if (digitsOnly.length <= 9) {
      handleInputChange('phone', formatted)
    }
  }

  const validateStep1 = () => {
    const newErrors = {}
    
    if (!formData.from.trim()) {
      newErrors.from = "Откуда поле обязательно для заполнения"
    } else if (formData.from.trim().length < 2) {
      newErrors.from = "Минимум 2 символа"
    }
    
    if (!formData.to.trim()) {
      newErrors.to = "Куда поле обязательно для заполнения"
    } else if (formData.to.trim().length < 2) {
      newErrors.to = "Минимум 2 символа"
    }
    
    if (formData.from.trim() && formData.to.trim() && 
        formData.from.trim().toLowerCase() === formData.to.trim().toLowerCase()) {
      newErrors.to = "Место отправления и назначения не могут быть одинаковыми"
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateStep2 = () => {
    const newErrors = {}
    
    if (!formData.cargo.trim()) {
      newErrors.cargo = "Укажите тип груза"
    } else if (formData.cargo.trim().length < 2) {
      newErrors.cargo = "Минимум 2 символа"
    }
    
    if (!formData.weight.trim()) {
      newErrors.weight = "Укажите вес груза"
    } else if (formData.weight.trim().length < 1) {
      newErrors.weight = "Укажите корректный вес"
    }
    
    if (!formData.transport.trim()) {
      newErrors.transport = "Выберите вид транспорта"
    } else if (formData.transport.trim().length < 2) {
      newErrors.transport = "Минимум 2 символа"
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateStep3 = () => {
    const newErrors = {}
    
    if (!formData.name.trim()) {
      newErrors.name = "Введите ваше имя"
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Имя должно содержать минимум 2 символа"
    } else if (formData.name.trim().length > 50) {
      newErrors.name = "Имя слишком длинное (максимум 50 символов)"
    } else if (!/^[а-яё\s\-\.a-z]+$/i.test(formData.name.trim())) {
      newErrors.name = "Имя может содержать только буквы, пробелы, тире и точки"
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = "Введите номер телефона"
    } else {
      const phoneDigits = formData.phone.replace(/\s/g, '')
      if (phoneDigits.length !== 9) {
        newErrors.phone = "Номер телефона должен содержать 9 цифр"
      } else if (!/^\d{9}$/.test(phoneDigits)) {
        newErrors.phone = "Номер телефона должен содержать только цифры"
      } else if (!['90', '91', '93', '94', '95', '97', '98', '99', '33', '71', '77', '88'].includes(phoneDigits.substring(0, 2))) {
        newErrors.phone = "Неверный код оператора"
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
        phone: '+998' + formData.phone.replace(/\s/g, ''), 
        submittedAt: new Date().toISOString()
      }
      
      showNotification("Заявка успешно отправлена!", "success")
      
      setFormData({
        from: "",
        to: "",
        cargo: "",
        weight: "",
        transport: "",
        name: "",
        phone: ""
      })
      setErrors({})
      setStep(1)
    }
  }

  return (
    <>
      <div className="container mx-auto flex flex-col items-center justify-start bg-white md:justify-center my-10 md:px-4">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-center leading-tight mb-10">
          {isMobile ? (
            <h1
              title="Оставьте заявку и получите расчет доставки вашего груза"
              className="md:text-[48px] text-[28px] font-[600] font-manrope leading-[120%]"
            >
              Оставьте заявку и получите расчет доставки вашего груза
            </h1>
          ) : (
            <>
              <h1
                title="Оставьте заявку и получите расчет доставки вашего груза"
                className="md:text-[48px] text-[28px] font-[600] font-manrope leading-[120%]"
              >
                Оставьте заявку и получите расчет <br /> доставки вашего груза
              </h1>
            </>
          )}
        </h1>
        <div
          className={`relative w-full container bg-white rounded-2xl overflow-hidden shadow-md pl-3.5 ${isMobile ? "bg-white flex flex-col h-[calc(100vh-120px)]" : ""}`}
        >
          <img
            src={worldImage || "/placeholder.svg"}
            alt="World Map"
            className={`${isMobile ? "absolute inset-0 w-full h-full object-cover opacity-30 z-0" : "absolute inset-0 w-full h-full object-cover opacity-60 z-0"}`}
          />
          <div
            className={`relative z-10 ${isMobile ? "flex flex-col h-full" : "flex flex-col md:flex-row items-center justify-between py-3"}`}
          >
            {/* Form Area */}
            <div
              className={`${isMobile ? "w-full bg-white flex-1 p-6" : "w-full md:w-1/2 bg-white rounded-2xl p-10 shadow-lg min-h-[525px]"} flex items-start justify-center`}
            >
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 50 }}
                    transition={{ duration: 0.5 }}
                    className="w-full h-[325px] flex flex-col justify-between"
                  >
                    <div className="mb-4">
                      <label htmlFor="from" className="block font-manrope font-[500] text-[16px] leading-[100%] mb-1">
                        Откуда
                      </label>
                      <input
                        id="from"
                        type="text"
                        placeholder="Ташкент"
                        value={formData.from}
                        onChange={(e) => handleInputChange('from', e.target.value)}
                        className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 ${
                          errors.from ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors.from && <p className="text-red-500 text-xs mt-1">{errors.from}</p>}
                    </div>
                    <div className="mb-6">
                      <label htmlFor="to" className="block font-manrope font-[500] text-[16px] leading-[100%] mt-5 mb-1">
                        Куда
                      </label>
                      <input
                        id="to"
                        type="text"
                        placeholder="Москва"
                        value={formData.to}
                        onChange={(e) => handleInputChange('to', e.target.value)}
                        className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 ${
                          errors.to ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors.to && <p className="text-red-500 text-xs mt-1">{errors.to}</p>}
                    </div>
                    <div className="relative inline-block w-full">
                      <motion.button
                        onClick={handleNext}
                        className="relative w-full cursor-pointer bg-[#F07C00] hover:bg-orange-600 text-white font-[400] text-[20px] leading-[100%] font-manrope rounded-md transition-colors mt-25 overflow-hidden p-[20px]"
                      >
                        Далее
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
                    <div className="flex items-center gap-2 mt-4">
                      <div className="flex-1 h-1 rounded bg-[#F07C00]" />
                      <div className="flex-1 h-1 rounded bg-orange-100" />
                      <div className="flex-1 h-1 rounded bg-orange-100" />
                    </div>
                    <div className="flex justify-between text-xs text-gray-400">
                      <span>Локация</span>
                      <span>Груз</span>
                      <span>Заказчик</span>
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
                      <label htmlFor="cargo" className="block text-sm font-medium">
                        Какой груз
                      </label>
                      <input
                        id="cargo"
                        type="text"
                        placeholder="Цемент"
                        value={formData.cargo}
                        onChange={(e) => handleInputChange('cargo', e.target.value)}
                        className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 ${
                          errors.cargo ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors.cargo && <p className="text-red-500 text-xs mt-1">{errors.cargo}</p>}
                    </div>
                    <div className="mb-4">
                      <label htmlFor="weight" className="block text-sm font-medium mb-1">
                        Вес груза
                      </label>
                      <input
                        id="weight"
                        type="text"
                        placeholder="10 тонн"
                        value={formData.weight}
                        onChange={(e) => handleInputChange('weight', e.target.value)}
                        className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 ${
                          errors.weight ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors.weight && <p className="text-red-500 text-xs mt-1">{errors.weight}</p>}
                    </div>
                    <div className="mb-6">
                      <label htmlFor="transport" className="block text-sm font-medium mb-1">
                        Вид транспорта
                      </label>
                      <input
                        id="transport"
                        type="text"
                        placeholder="Фура"
                        value={formData.transport}
                        onChange={(e) => handleInputChange('transport', e.target.value)}
                        className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 ${
                          errors.transport ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors.transport && <p className="text-red-500 text-xs mt-1">{errors.transport}</p>}
                    </div>
                    <div className="flex gap-3 mt-20">
                      <div className="relative inline-block flex-1">
                        <motion.button
                          onClick={handleBack}
                          className="relative w-full cursor-pointer bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 rounded-md transition-colors overflow-hidden"
                        >
                          Назад
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
                          className="relative w-full cursor-pointer bg-[#F07C00] hover:bg-orange-600 text-white font-semibold py-3 rounded-md transition-colors overflow-hidden"
                        >
                          Далее
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
                    <div className="flex items-center gap-2 mt-4">
                      <div className="flex-1 h-1 rounded bg-orange-100" />
                      <div className="flex-1 h-1 rounded bg-[#F07C00]" />
                      <div className="flex-1 h-1 rounded bg-orange-100" />
                    </div>
                    <div className="flex justify-between text-xs text-gray-400 mt-1">
                      <span>Локация</span>
                      <span>Груз</span>
                      <span>Заказчик</span>
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
                    className="w-full"
                  >
                    <div className="mb-4">
                      <label htmlFor="name" className="block text-sm font-medium mb-1">
                        Имя
                      </label>
                      <input
                        id="name"
                        type="text"
                        placeholder="Введите ваше имя"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 ${
                          errors.name ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                    </div>
                    <div className="mb-6">
                      <label htmlFor="phone" className="block text-sm font-medium mb-1">
                        Номер телефона
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
                            errors.phone ? 'border-red-500' : 'border-gray-300'
                          }`}
                        />
                      </div>
                      {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                    </div>
                    <div className="flex gap-3 mt-30">
                      <div className="relative inline-block flex-1">
                        <motion.button
                          onClick={handleBack}
                          className="relative w-full cursor-pointer bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 rounded-md transition-colors overflow-hidden"
                        >
                          Назад
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
                          className="relative w-full cursor-pointer bg-[#F07C00] hover:bg-orange-600 text-white font-semibold py-3 rounded-md transition-colors overflow-hidden"
                        >
                          Рассчитать стоимость
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
                    <div className="flex items-center gap-2 mt-4">
                      <div className="flex-1 h-1 rounded bg-orange-100" />
                      <div className="flex-1 h-1 rounded bg-orange-100" />
                      <div className="flex-1 h-1 rounded bg-[#F07C00]" />
                    </div>
                    <div className="flex justify-between text-xs text-gray-400 mt-1">
                      <span>Локация</span>
                      <span>Груз</span>
                      <span>Заказчик</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Image */}
            <div
              className={`${isMobile ? "w-full mt-auto" : "w-full min-h-[525px] md:w-1/2 flex items-center justify-center mt-6 md:mt-0 relative"}`}
            >
              <img
                src={girlImage || "/placeholder.svg"}
                alt="Girl with headset"
                className={`${isMobile ? "w-full max-h-[40vh] object-contain object-bottom" : "w-[400px] md:w-[500px] h-[500px] object-contain absolute -bottom-3 right-0"}`}
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