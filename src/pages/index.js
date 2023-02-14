import TitlePage from "../components/TitlePage";
import PlaceGrid from "../components/PlaceGrid/";
import placeService from "../services/place.service";
import {useEffect, useState} from 'react';

export default function Home() {

  const [placesArray, setPlacesArray] = useState([]);

  useEffect(() => {
    placeService.getPlaces()
      .then((places) => {
        setPlacesArray(places);
        console.log(places);
      })
      .catch(err => console.log(err))
  }, []);

  return (
    <main>
      <TitlePage title="Homepage" />
      <PlaceGrid places={placesArray} />
    </main>
  )
}