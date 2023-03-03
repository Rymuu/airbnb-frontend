import PlaceCard from "../PlaceCard";
import styles from "./index.module.scss";

const Index = ({ places }) => {
  
  return (
    <div className={"mt-8 mx-auto w-[88%] grid gap-6 gap-y-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 justify-items-center"}>
      {
        places && places.map((item) => (
          <PlaceCard key={item._id} place={item} />
        ))
      }
    </div>
  );
}

export default Index;