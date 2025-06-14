import ContactPage from '../components/ContactPage'
import  Header  from '../utils/Header'
import HelmetPage from "../utils/Helmet";

const Contact = () => {
  return (
    <>
        <HelmetPage />
        <Header/>
        <ContactPage/>
    </>
  )
}

export default Contact