import FaqSection from "../components/FaqSection";
import Form from "../components/Form";
import Info from "../components/Info";
import Statistics from "../components/Statistics";
import Us from "../components/Us";
import Header from "../utils/Header";

const About = () => {
  return (
    <div>
        <Header />
        <Us />
        <Statistics />
        <Info />
        <FaqSection />
        <Form />
    </div>
  )
}

export default About;