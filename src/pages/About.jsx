import { useEffect } from "react";
import FaqSection from "../components/FaqSection";
import Form from "../components/Form";
import Info from "../components/Info";
import Statistics from "../components/Statistics";
import Us from "../components/Us";
import Header from "../utils/Header";
import { useLocation } from "react-router-dom";
import HelmetPage from "../utils/Helmet";

const About = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return (
    <>
        <HelmetPage />
        <Header />
        <Us />
        <Statistics />
        <Info />
        <FaqSection />
        <Form />
    </>
  )
}

export default About;