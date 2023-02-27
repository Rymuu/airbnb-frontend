import { createContext, useState, useEffect } from 'react';

const WishlistContext = createContext({
    wishlistData: [],
    addToWishlist: () => { },
    removeFromWishlist: () => { },
    clearWishlist: () => { },
});


export default WishlistContext;

export const WishlistContextProvider = ({ children }) => {

    const [wishlistData, setWishlistData] = useState([]);


    useEffect(() => {
        const wishlistDataString = localStorage.getItem('wishlist');
        if (wishlistDataString) {
            setWishlistData(JSON.parse(wishlistDataString));
        }
    }, []);

    useEffect(() => {
        if (wishlistData.length > 0) {
          try {
            localStorage.setItem('wishlist', JSON.stringify(wishlistData));
          } catch (e) {
            console.error('Error writing to local storage:', e);
          }
        }
      }, [wishlistData]);

    function addToWishlist(item) {
        setWishlistData([...wishlistData, item]);
    }

    function removeFromWishlist(item) {
        const newWishlistData = wishlistData.filter(wishlistItem => wishlistItem._id !== item._id);
        setWishlistData(newWishlistData);
    }

    const deleteWishlist = () => {
        localStorage.removeItem('wishlist');
        setWishlistData([]);
    }

    const context = {
        addToWishlist,
        removeFromWishlist,
        deleteWishlist,
        wishlistData
    }

    return (
        <WishlistContext.Provider value={context}>
            {children}
        </WishlistContext.Provider>
    )

}