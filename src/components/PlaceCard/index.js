import { useContext, useState } from "react";
import styles from "./index.module.scss";
import HeartIcon from "../../../public/icons/heart-regular.svg";
import PinkHeartIcon from "../../../public/icons/heart-pink.svg";
import StarIcon from "../../../public/icons/star-solid.svg";

import WishlistContext from "../../context/WishlistContext";

import { useRouter } from "next/router";

const Index = ({ place }) => {

  const router = useRouter();
  const [isPink, setIsPink] = useState(false);
  const { addPlaceWishlist } = useContext(WishlistContext);
  const { removePlaceWishlist } = useContext(WishlistContext);

  const handleClick = (e) => {
    router.push(`/place/${place._id}`);
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.thumbnail__wrapper}>
        <button
          className={styles.btn__whishlist}
          onClick={
            () => {
              addPlaceWishlist(place);
              removePlaceWishlist(place);
              {
                isPink ?
                  (
                    setIsPink(false)
                  )
                  :
                  (
                    setIsPink(true)
                  )
              }
              console.log(!isPink);
            }
          }
        >
          {
            isPink ?
              (
                <img src={PinkHeartIcon.src} alt="favoris" />
              )
              :
              (
                <img src={HeartIcon.src} alt="favoris" />
              )
          }


        </button>
        <img src={place.images[0]} alt={place.title} onClick={(e) => {
          handleClick(e);
        }} />
      </div>
      <div className={styles.content} onClick={(e) => {
        handleClick(e);
      }}>
        <div className={styles.metadata}>
          <p><b>{place.address.city}</b>, <b>{place.address.country}</b></p>
          <p>{place.title}</p>
          <p><b>{place.pricing.perDay} €</b> par nuit</p>
        </div>
        <div className={styles.rate}>
          <img src={StarIcon.src} alt="rating" />
          <span> {Number(place.rating).toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}

export default Index;