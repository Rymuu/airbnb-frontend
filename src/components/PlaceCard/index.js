import { useContext, useState } from "react";
import styles from "./index.module.scss";
import HeartIcon from "../../../public/icons/heart-regular.svg";
import PinkHeartIcon from "../../../public/icons/heart-pink.svg";
import StarIcon from "../../../public/icons/star-solid.svg";
import WishlistContext from "../../context/WishlistContext";

const Index = ({ place }) => {

  const [isPink, setIsPink] = useState(false);
  const { addPlaceWishlist } = useContext(WishlistContext);
  const { removePlaceWishlist } = useContext(WishlistContext);
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
        <img src={place.images} alt={place.title} />
      </div>
      <div className={styles.content}>
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