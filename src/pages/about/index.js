import TitlePage from "../../components/TitlePage";
import Carousel from "../../components/Carousel"
const Index = () => {
  return (
    <div>
      <TitlePage title="About" />
      <h1 className="text-3xl font-bold underline">
        Hello world!
      </h1>
      <Carousel/>
    </div>
  );
}

export default Index;