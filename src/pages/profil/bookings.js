import { useEffect, useState } from 'react';
import AccountNav from "../../components/AccountNav";
import LongCard from "../../components/LongCard";
import placeService from "../../services/place.service";

const BookingsPage = () => {
    const [placesArray, setPlacesArray] = useState([]);
    useEffect(() => {
        const token = localStorage.getItem('token');
        placeService.getMyPlaces(token)
            .then((places) => {
                setPlacesArray(places);
                console.log(places);
            })
            .catch(err => console.log(err));
    }, []);
    return (
        <div>
            <AccountNav />
            <div className='flex flex-col'>
                {
                    placesArray && placesArray.map((item) => (
                        <LongCard key={item._id} place={item} />
                    ))
                }
            </div>
        </div>
    );
}

export default BookingsPage;