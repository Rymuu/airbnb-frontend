import { useEffect, useState } from 'react';
import { useRouter } from "next/router";
import placeService from "../../../services/place.service";
import PlaceGallery from "../../../components/PlaceGallery";
import StarIcon from "../../../../public/icons/star-solid.svg"
import styles from "./index.module.scss"

const Index = () => {

  const router = useRouter();
  const [id, setId] = useState();
  const [place, setPlace] = useState();

  useEffect(() => {
    if (router.isReady) {
      console.log(router.query)
      setId(router.query.id);
    }
  }, [router.isReady])
  useEffect(() => {
    if (!id) {
      return;
    }
    placeService.getPlaceById(id)
      .then((place) => {
        setPlace(place);
        console.log("laplace", place);
      })
      .catch(err => console.log(err));

  }, [id])

  if (!place) return '';


  return (
    <div className={styles.page__details}>
      <div className={styles.content}>
        <h1>{place.title}</h1>
        <div className={styles.metadata}>
          <img src={StarIcon.src} alt="rating" height={10} style={{ marginRight: 5 }} />
          <span style={{ marginRight: 5 }}> {Number(place.rating).toFixed(2)}</span>
          ·
          <p style={{ marginLeft: 5, marginRight: 5, textDecoration: "underline" }}><b>{place.address.city}</b>, <b>{place.address.country}</b></p>
        </div>
        <PlaceGallery place={place} />
      </div>
    </div>
  );
}

export default Index;