import PlaceGrid from "../components/PlaceGrid/";
import Filter from "../components/Filter";
import placeService from "../services/place.service";
import { useEffect, useState } from 'react';
import { useRouter } from "next/router";

export default function Home() {

  const router = useRouter();
  const [placesArray, setPlacesArray] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState(0);
  let queryString = router.asPath;
  queryString = queryString.replace("/","")

  useEffect(() => {

    placeService.filterPlaces(queryString)
      .then((places) => {
        setPlacesArray(places);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <main>
      <Filter
        selectedFilter={selectedFilter}
        setSelectedFilter={setSelectedFilter}
      />
      {placesArray.length > 0 ? (
        <PlaceGrid places={placesArray} />
      ):
      (<p className="text-center">Il n'y a pas de résultat pour vos filtres.</p>)}

    </main>
  )
}

