import HomeCards from "../components/HomeCards";
import Form from "../components/Form"
import Info from "../components/Info";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import FaqSection from "../components/FaqSection";
import Statistics from "../components/Statistics";
import Services from "../components/Services";
import Us from "../components/Us";

const Home = () => {
  return (
    <div>
        <Header />
        <HeroSection />
        <Form/>
        <Us />
        <Services />
        <Statistics />
        <Info />
        <HomeCards />
        <FaqSection />
        <Form/>
    </div>
  )
}

export default Home;