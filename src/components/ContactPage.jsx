import React, { useEffect, useState } from 'react';
import { BsTelephone } from "react-icons/bs";
import { IoMailOutline } from "react-icons/io5";
import { GrLocation } from "react-icons/gr";
import { motion } from 'framer-motion';

const ContactPage = () => {
  const [form, setForm] = useState({ name: '', phone: '', agree: false });
  const [error, setError] = useState('');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setForm({ ...form, agree: checked });
    } else {
      setForm({ ...form, [id]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) {
      setError('Пожалуйста, заполните все поля.');
      return;
    }
    if (!form.agree) {
      setError('Пожалуйста, согласитесь с условиями.');
      return;
    }

    setError('');
    window.scrollTo({ top: 0, behavior: 'smooth' });

    setForm({ name: '', phone: '', agree: false });
  };

  return (
    <div className='container mx-auto px-4'>
      <div className='py-25 flex flex-col lg:flex-row justify-between gap-10'>
        <motion.div 
          initial={{ opacity: 0, y: 50 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6 }}>
          <div>
            <h1 className='font-manrope text-[#1A1A18] font-[600] text-[28px] sm:text-[40px] leading-[100%]'>Контакты</h1>
          </div>
          <div className='my-15'>
            <div className='flex gap-2 my-10'>
              <BsTelephone className='w-[44px] h-[44px] bg-[#E5E4E2] p-[10px] rounded-[8px]' />
              <div>
                <h1 className='text-[#A7A6A1] text-[14px] sm:text-[16px] mb-2'>Номер телефона</h1>
                <h1 className='text-[#1A1A18] text-[18px] sm:text-[24px] font-[500]'>+998-99-536-57-47</h1>
              </div>
            </div>
            <div className='flex gap-2 my-10'>
              <BsTelephone className='w-[44px] h-[44px] bg-[#E5E4E2] p-[10px] rounded-[8px]' />
              <div>
                <h1 className='text-[#A7A6A1] text-[14px] sm:text-[16px] mb-2'>Номер телефона</h1>
                <h1 className='text-[#1A1A18] text-[18px] sm:text-[24px] font-[500]'>+998-90-823-22-32</h1>
              </div>
            </div>
            <div className='flex gap-2 my-8'>
              <IoMailOutline className='w-[44px] h-[44px] bg-[#E5E4E2] p-[10px] rounded-[8px]' />
              <div>
                <h1 className='text-[#A7A6A1] text-[14px] sm:text-[16px] mb-2'>E-mail</h1>
                <h1 className='text-[#1A1A18] text-[18px] sm:text-[24px] font-[500]'>ufdworldservice@gmail.com</h1>
              </div>
            </div>
            <div className='flex gap-2 my-8'>
              <GrLocation className='w-[44px] h-[44px] bg-[#E5E4E2] p-[10px] rounded-[8px]' />
              <div>
                <h1 className='text-[#A7A6A1] text-[14px] sm:text-[16px] mb-2'>Юр. Адрес:</h1>
                <h1 className='text-[#1A1A18] text-[18px] sm:text-[24px] font-[500]'>
                  город Ташкент, Чиланзарский район, 3-ЧАРХ Камолон МФЙ, улица Мукумий, 178
                </h1>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 50 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8 }}
          className='w-full max-w-xl'>

          <h1 className='font-manrope font-[600] text-[24px] sm:text-[40px] leading-[100%] mb-5'>
            Ответим в течение дня, <br />заполните форму
          </h1>

          <form onSubmit={handleSubmit} className='bg-[#F7F7F6] p-6 sm:p-10 rounded-lg'>
            <div className='mb-4'>
              <label htmlFor="name" className="block text-sm sm:text-[16px] font-medium mb-3 font-manrope">
                Имя
              </label>
              <input
                id="name"
                type="text"
                placeholder="Введите ваше имя"
                value={form.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-orange-400 transition border-[#CAC9C5] placeholder:text-[#BDBDBD]"
              />
            </div>

            <div className="py-2">
              <label htmlFor="phone" className="block text-sm sm:text-[16px] font-medium mb-3 font-manrope">
                Номер телефона
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">+998</span>
                <input
                  id="phone"
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  placeholder="XX XXX XX XX"
                  value={form.phone}
                  onChange={(e) => {
                    const onlyNums = e.target.value.replace(/\D/g, '').slice(0, 9);
                    setForm({ ...form, phone: onlyNums });
                  }}
                  className="w-full pl-14 pr-4 py-3 border rounded-md focus:ring-2 focus:ring-orange-400 transition border-[#CAC9C5] placeholder:text-[#BDBDBD]"
                />
              </div>
            </div>

            <div className='flex items-start gap-3 mt-40'>
              <input
                type="checkbox"
                id="agree"
                checked={form.agree}
                onChange={handleChange}
                className="mt-1 scale-[1.8] accent-[#FFDB85]"
              />
              <label htmlFor="agree" className="text-sm sm:text-[16px] font-medium font-manrope">
                Соглашаюсь на обработку персональных данных
              </label>
            </div>

            {error && <p className="text-red-500 mt-4">{error}</p>}

            <button
              type="submit"
              disabled={!form.agree}
              className={`w-full sm:w-[515px] h-[67px] text-[16px] sm:text-[20px] font-[500] font-manrope leading-[100%] rounded-md mt-5 transition 
                ${form.agree 
                  ? 'bg-[#F07C00] text-[#FFFAEA] cursor-pointer' 
                  : 'bg-[#f5c84b] text-[#FFFAEA] opacity-50 cursor-not-allowed'
                }`}>
              Отправить
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactPage;
