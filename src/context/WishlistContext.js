import { createContext, useContext, useEffect, useState } from 'react';

const WishlistContext = createContext({
    wishlistData: [],
    addToWishlist: () => { },
    removeFromWishlist: () => { },
    clearWishlist: () => { },
});

export default WishlistContext;

export const WishlistContextProvider = ({ children }) => {

    const [wishlistDataState, setWishlistDataState] = useState([]);

    useEffect(() => {
        const wishlistDataString = localStorage.getItem('wishlist');
        if (wishlistDataString) {
            setWishlistDataState(JSON.parse(wishlistDataString));
        }
    }, []);

    useEffect(() => {
        if (wishlistDataState.length > 0) {
            try {
                localStorage.setItem('wishlist', JSON.stringify(wishlistDataState));
            } catch (e) {
                console.error('Error writing to local storage:', e);
            }
        }
    }, [wishlistDataState]);

    function addToWishlist(item) {
        setWishlistDataState([...wishlistDataState, item]);
    }

    function removeFromWishlist(item) {
        const newWishlistData = wishlistDataState.filter(wishlistItem => wishlistItem._id !== item._id);
        setWishlistDataState(newWishlistData);
    }

    const deleteWishlist = () => {
        localStorage.removeItem('wishlist');
        setWishlistDataState([]);
    }

    const context = {
        addToWishlist,
        removeFromWishlist,
        deleteWishlist,
        wishlistData: wishlistDataState
    }

    return (
        <WishlistContext.Provider value={context}>
            {children}
        </WishlistContext.Provider>
    )

}
