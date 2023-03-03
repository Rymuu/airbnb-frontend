import { useEffect, useState } from 'react';
import AdminNav from '../../../components/AdminNav';
import bookingService from '../../../services/booking.service';
import placeService from '../../../services/place.service';
import LongCardInfo from '../../../components/LongCardInfo';

const Index = () => {
  const [bookingsArray, setBookingsArray] = useState([]);
  const [placesMap, setPlacesMap] = useState(new Map());

  useEffect(() => {
    const token = localStorage.getItem('token');
    bookingService.getBookings(token)
      .then((data) => {
        setBookingsArray(data);
        console.log(data);
      })
      .catch(err => console.log(err));

    // Fetch all places for bookings
    placeService.getPlaces()
      .then(places => {
        // Convert places array to map for easier lookup
        const map = new Map();
        places.forEach(place => map.set(place._id, place));
        setPlacesMap(map);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div>
      <AdminNav />
      {bookingsArray && bookingsArray.length > 0 ? (
        <div className='flex flex-col'>
          {
            bookingsArray && bookingsArray.map((booking) => (
              <LongCardInfo key={booking._id} title={placesMap.get(booking.place)?.title} image={placesMap.get(booking.place)?.images[0]}>
                < p>Arrivée : {booking.dates.checkIn && new Date(booking.dates.checkIn).toISOString().slice(0, 10)}</p>
                <p>Départ : {booking.dates.checkOut && new Date(booking.dates.checkOut).toISOString().slice(0, 10)}</p>
                <p>Nombre de voyageurs : {booking.capacity}</p>
                <p>Prix : {booking.price} €</p>
                {booking.status === "REFUSED" ? (
                  <p className='text-red-600 mt-2 text-center border border-solid border-orange-600 rounded-xl w-fit p-2 mx-auto'>{booking.status}</p>
                ) : (
                  <p className={`mt-2 text-center border border-solid rounded-xl w-fit p-2 mx-auto ${booking.status === 'ACCEPTED' ? 'text-green-600' : 'text-orange-600'}`}>{booking.status}</p>
                )


                }
              </LongCardInfo>
            ))
          }
        </div>) : (<p className='text-center'>Vous n'avez pas encore de réservation.</p>)}

    </div >
  );
}

export default Index;