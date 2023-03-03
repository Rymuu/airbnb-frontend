import { useEffect, useState, useContext } from 'react';
import WithAuth from '../../HOC/withAuth';
import AccountNav from "../../components/AccountNav";
import LongCard from "../../components/LongCard";
import Button from "../../components/Button";
import { AiFillDelete } from "react-icons/ai";
import WishlistContext from '../../context/WishlistContext';
import placeService from "../../services/place.service";

const FavoritesPage = () => {
  const { deleteWishlist, removeFromWishlist } = useContext(WishlistContext);
  const [placesArray, setPlacesArray] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  const deleteAllWishlist = (e) => {
    deleteWishlist();
    setPlacesArray([]);
    setWishlist([]);
    localStorage.removeItem('wishlist');
  }

  const deleteItemFromWishlist = (item) => {
    removeFromWishlist(item);
    setWishlist(prevWishlist => {
      const updatedWishlist = prevWishlist.filter(place => place._id !== item._id);
      localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
      return updatedWishlist;
    });
  };

  useEffect(() => {
    const wishlistDataString = localStorage.getItem('wishlist');
    if (wishlistDataString) {
      setWishlist(JSON.parse(wishlistDataString));
    }
  }, []);

  useEffect(() => {
    setPlacesArray(wishlist);
  }, [wishlist]);

  return (
    <div>
      <AccountNav />
      {placesArray && placesArray.length > 0 ? (
        <>
          <div className="text-center max-x-lg mx-auto mb-6">
            <Button
              title="Supprimer la liste"
              icon={<AiFillDelete />}
              handleClick={() => deleteAllWishlist()}
              type="button"
              btnClass="primary max-w-fit inline-flex gap-1 items-center"
            />
          </div>
          <div className="flex flex-col">
            {placesArray.map((item) => (
              <LongCard
                key={item._id}
                place={item}
                cardOnClick={() => deleteItemFromWishlist(item)}
                useModal={false}
                modifyButton={false}
              />
            ))}
          </div>
        </>
      ) : (
        <p className="text-center">
          Vous n'avez pas encore de logement en favoris.
        </p>
      )}
    </div>
  );
};

export default WithAuth(FavoritesPage);
