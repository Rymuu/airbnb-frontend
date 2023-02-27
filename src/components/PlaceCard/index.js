import { useContext, useState, useEffect } from "react";
import styles from "./index.module.scss";
import HeartIcon from "../../../public/icons/heart-regular.svg";
import PinkHeartIcon from "../../../public/icons/heart-pink.svg";
import StarIcon from "../../../public/icons/star-solid.svg";
import Carousel from "../Carousel";
import WishlistContext from "../../context/WishlistContext";

import { useRouter } from "next/router";

const Index = ({ place }) => {

  const router = useRouter();
  const { addToWishlist, removeFromWishlist, wishlistData } = useContext(WishlistContext);
  const [isPink, setIsPink] = useState(false);
  const handleClick = (e) => {
    router.push(`/place/${place._id}`);
  }

  useEffect(() => {
    if (wishlistData.filter(wishlistItem => wishlistItem._id !== place._id)) {
      setIsPink(false)
    }
    else {
      setIsPink(true)
    }
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.thumbnail__wrapper}>
        <button
          className={styles.btn__whishlist}
          onClick={
            () => {
              if (wishlistData.indexOf(place) != -1) {
                removeFromWishlist(place);
                setIsPink(false)
              }
              else {
                addToWishlist(place);
                setIsPink(true)
              }
              console.log("état de la wl : ", wishlistData);

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

        <Carousel images={place.images} onClick={(e) => {
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