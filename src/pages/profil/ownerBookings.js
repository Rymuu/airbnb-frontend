import { useEffect, useState } from 'react';
import WithAuth from '../../HOC/withAuth';
import AccountNav from "../../components/AccountNav";
import LongCardInfo from "../../components/LongCardInfo";
import Modal from "../../components/Modal";
import bookingService from "../../services/booking.service";
import placeService from '../../services/place.service';
import { AiOutlineCheck } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";

const BookingsPage = () => {
    const [bookingsArray, setBookingsArray] = useState([]);
    const [placesMap, setPlacesMap] = useState(new Map());
    const [openAcceptModal, setOpenAcceptModal] = useState(false);
    const [openRefuseModal, setOpenRefuseModal] = useState(false);


    useEffect(() => {
        const token = localStorage.getItem('token');
        bookingService.getMyOwnerBookings(token)
            .then((data) => {
                setBookingsArray(data);
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
    const acceptBooking = (bookingId) => {
        const token = localStorage.getItem('token');
        bookingService.acceptReservation(token, bookingId)
            .then((data) => {
                setOpenAcceptModal(false);
                // Update the booking status in the state array
                setBookingsArray(prevBookings => prevBookings.map(booking => {
                    if (booking._id === bookingId) {
                        return {
                            ...booking,
                            status: "ACCEPTED"
                        }
                    }
                    return booking;
                }));
            })
            .catch(err => console.log(err))
    }

    const refuseBooking = (bookingId) => {
        const token = localStorage.getItem('token');
        bookingService.refuseReservation(token, bookingId)
            .then((data) => {
                setOpenRefuseModal(false);
                // Update the booking status in the state array
                setBookingsArray(prevBookings => prevBookings.map(booking => {
                    if (booking._id === bookingId) {
                        return {
                            ...booking,
                            status: "REFUSED"
                        }
                    }
                    return booking;
                }));
            })
            .catch(err => console.log(err))
    }


    return (
        <div>
            <AccountNav />
            {bookingsArray && bookingsArray.length > 0 ? (
                <div className='flex flex-col'>
                    {
                        bookingsArray && bookingsArray.map((booking) => (
                            <>
                                {
                                    openAcceptModal && (
                                        <Modal className='' title="Es-tu sûr(e) de vouloir accepter ? " closeModal={() => setOpenAcceptModal(false)}>
                                            <p className='flex justify-around'><RxCross2 className='text-red-600 text-xl' onClick={() => setOpenAcceptModal(false)} /><AiOutlineCheck className='text-green-600 text-xl' onClick={() => acceptBooking(booking._id)} /></p>
                                        </Modal>
                                    )
                                }
                                {
                                    openRefuseModal && (
                                        <Modal className='' title="Es-tu sûr(e) de vouloir refuser ? " closeModal={() => setOpenRefuseModal(false)}>
                                            <p className='flex justify-around'><RxCross2 className='text-red-600 text-xl' onClick={() => setOpenRefuseModal(false)} /><AiOutlineCheck className='text-green-600 text-xl' onClick={() => refuseBooking(booking._id)} /></p>
                                        </Modal>
                                    )
                                }
                                <LongCardInfo key={booking._id} title={placesMap.get(booking.place)?.title} image={placesMap.get(booking.place)?.images[0]}>
                                    < p>Arrivée : {booking.dates.checkIn && new Date(booking.dates.checkIn).toISOString().slice(0, 10)}</p>
                                    <p>Départ : {booking.dates.checkOut && new Date(booking.dates.checkOut).toISOString().slice(0, 10)}</p>
                                    <p>Nombre de voyageurs : {booking.capacity}</p>
                                    <p>Prix : {booking.price} €</p>
                                    {booking.status === "REFUSED" ? (
                                        <p className='text-red-600 mt-2 text-center border border-solid border-red-600 rounded-xl w-fit p-2'>{booking.status}</p>
                                    ) : (
                                        <p className={`mt-2 text-center border border-solid rounded-xl w-fit p-2 ${booking.status === 'ACCEPTED' ? 'text-green-600' : 'text-orange-600'}`}>{booking.status}</p>
                                    )


                                    }
                                    {booking.status === "WAITING" ? (
                                        <p className='flex justify-around'><RxCross2 className='text-red-600 text-xl' onClick={() => setOpenRefuseModal(true)} /><AiOutlineCheck className='text-green-600 text-xl' onClick={() => setOpenAcceptModal(true)} /></p>
                                    ) : (null)}

                                </LongCardInfo>
                            </>
                        ))
                    }
                </div>) : (<p className='text-center'>Vous n'avez pas encore de demande de réservation.</p>)}
        </div>
    );
}

export default WithAuth(BookingsPage);
