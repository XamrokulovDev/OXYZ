import { useState } from "react";
import { useTranslation } from "react-i18next";
import { CgClose } from "react-icons/cg";

const ModalForm = ({ onClose }) => {
  const { t } = useTranslation();
  const [error, setError] = useState('');
  const [form, setForm] = useState({ name: '', phone: '', agree: false });

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
      setError(t('contact.message_1'));
      return;
    }
    if (!form.agree) {
      setError(t('contact.message_2'));
      return;
    }

    setError('');
    window.scrollTo({ top: 0, behavior: 'smooth' });

    setError('');
    setForm({ name: '', phone: '', agree: false });
    onClose(); 
  };
  return (
    <div 
      className="w-[550px] bg-white rounded-[14px] relative max-md:my-30 p-5 sm:p-10"
      onClick={(e) => e.stopPropagation()}
    >
        <button 
          onClick={onClose}
          className="text-white cursor-pointer rounded-full absolute -top-12 md:-top-10 max-md:right-0 -right-10 p-1"
        >
          <CgClose size={23}/>
        </button>
        <form onSubmit={handleSubmit} className=''>
            <div className='mb-4'>
              <label htmlFor="name" className="block text-[16px] font-[500] font-manrope mb-3">
                {t('form.name')}
              </label>
              <input
                id="name"
                type="text"
                placeholder={t('form.type_name')}
                value={form.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-[8px] focus:ring-2 focus:ring-orange-400 transition border-[#CAC9C5] placeholder:text-[#BDBDBD] outline-none"
              />
            </div>
            <div className="py-2">
              <label htmlFor="phone" className="block text-[16px] font-medium mb-3 font-manrope">
                {t('form.phone')}
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
                  className="w-full pl-14 pr-4 py-3 border rounded-[8px] focus:ring-2 focus:ring-orange-400 transition border-[#CAC9C5] placeholder:text-[#CAC9C5] outline-none"
                />
              </div>
            </div>
            <div className='flex items-start gap-3 mt-5 lg:mt-30'>
              <input
                type="checkbox"
                id="agree"
                checked={form.agree}
                onChange={handleChange}
                className="mt-1 scale-[1.5] accent-[#FFDB85]"
              />
              <label htmlFor="agree" className="text-[14px] font-medium font-manrope cursor-pointer">
                {t('contact.check')}
              </label>
            </div>

            {error && <p className="text-red-500 mt-4">{error}</p>}

            <button
              type="submit"
              disabled={!form.agree}
              className={`w-full text-[16px] sm:text-[20px] font-[400] font-manrope leading-[100%] rounded-md mt-5 transition py-5 
                ${form.agree 
                  ? 'bg-[#F07C00] text-[#FFFAEA] cursor-pointer' 
                  : 'bg-[#f5c84b] text-[#FFFAEA] opacity-50 cursor-not-allowed'
                }`}>
              {t('contact.button')}
            </button>
          </form>
    </div>
  )
}

export default ModalForm;