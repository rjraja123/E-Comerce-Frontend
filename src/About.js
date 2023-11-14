import { useProductContext } from './context/productcontext';
import HeroSection from './components/HeroSection'


const About = () => {
  const {myName} = useProductContext();
  const data = {
    name: "Nova-Shop",
  };
  return (
  <>
  {myName}
  <HeroSection myData={data}/>{" "}
  </>
  );
};

export default About;