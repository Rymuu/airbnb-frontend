import { useContext, useState, useEffect } from "react";
import styles from "./index.module.scss";
import HeartIcon from "../../../public/icons/heart-regular.svg";
import PinkHeartIcon from "../../../public/icons/heart-pink.svg";
import StarIcon from "../../../public/icons/star-solid.svg";
import Carousel from "../Carousel";
import WishlistContext from "../../context/WishlistContext";
import UserContext from "../../context/UserContext";
import { useRouter } from "next/router";


const Index = ({ place }) => {

  const router = useRouter();
  const { addToWishlist, removeFromWishlist, wishlistData } = useContext(WishlistContext);
  const { user } = useContext(UserContext);
  const [isPink, setIsPink] = useState(false);
  
  const handleClick = (e) => {
    router.push(`/place/${place._id}`);
  }
  const handleHeartClick = (e) => {
    if (user) {
      if (wishlistData.indexOf(place) != -1) {
        removeFromWishlist(place);
        setIsPink(false)
      }
      else {
        addToWishlist(place);
        setIsPink(true)
      }
    }
    else {
      router.push("/login");
    }
  }
  useEffect(() => {
    setIsPink(wishlistData.some(wishlistItem => wishlistItem._id === place._id));
  }, [wishlistData]);


  return (
    <div className={styles.wrapper}>
      <div className={styles.thumbnail__wrapper}>
        <button
          className={styles.btn__whishlist}
          onClick={
            () => {
              handleHeartClick()
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

        <Carousel images={place.images} handleClick={(e) => {
          handleClick()
        }} />


      </div>
      <div className={styles.content} onClick={(e) => {
        handleClick(e);
      }}>
        <div className="flex justify-between">
          <p className="font-semibold">{place.address.city}, {place.address.country}</p>
          <div className="inline-flex">
            <img className="w-4 pb-[3px] mr-1" src={StarIcon.src} alt="rating" />
            <span> {Number(place.rating).toFixed(2)}</span>
          </div>
        </div>
        <div>
          <p className="text-md truncate text-gray-500">Particulier</p>
          <p className="text-md truncate text-gray-500">13-18 août</p>
          <p className="mt-2"><b>{place.pricing.perDay} €</b> par nuit</p>
        </div>
      </div>
    </div>
  );
}

export default Index;