import { useEffect, useState } from 'react';
import { useRouter } from "next/router";
import placeService from "../../../services/place.service";
import bookingService from "../../../services/booking.service";
import PlaceGallery from "../../../components/PlaceGallery";
import { AiFillStar } from 'react-icons/ai';
import BookingWidget from "../../../components/BookingWidget";


const Index = () => {

  const router = useRouter();
  const [id, setId] = useState();
  const [place, setPlace] = useState();
  const [message, setMessage] = useState(null);
  const [type, setType] = useState(null);
  const [bookingForm, setBookingForm] = useState({
    dates: {
      checkIn: "",
      checkOut: ""
    },
    price: '',
    capacity: "1",
    place: '',
    owner: ''
  });

  const handleInput = (e) => {
    setBookingForm({ ...bookingForm, [e.target.name]: e.target.value });
  }

  useEffect(() => {
    if (router.isReady) {
      setId(router.query.id);
    }
  }, [router.isReady])
  useEffect(() => {
    if (!id) {
      return;
    }
    placeService.getPlaceById(id)
      .then((place) => {
        setPlace(place);
        setBookingForm({
          ...bookingForm,
          price: place.pricing.perDay,
          place: place._id,
          owner: place.owner._id
        });
      })
      .catch(err => console.log(err));

  }, [id])

  if (!place) return '';

  const submitBooking = (e) => {
    const token = localStorage.getItem('token');
    bookingService.createReservation(token, bookingForm)
      .then((data) => {
        if (data.errors) {
          setMessage(data.message);
          setType("error");
          return false;
        }
        router.push("/profil/bookings")
      }
      )
      .catch(err => console.log(err));
  }

  return (
    <div className="mt-8 w-[75%] mx-auto">
      <h1 className='text-2xl font-medium'>{place.title}</h1>
      <div className='flex gap-x-2 items-center'>
        <div className="flex gap-x-1 items-center">
          <AiFillStar className='' />
          <span className='text-sm font-medium'> {Number(place.rating).toFixed(2)}</span>
        </div>
        <span className='font-medium'> · </span>
        <p className='text-sm my-2 block underline font-medium'>62 commentaires</p>
        <span className='font-medium'> · </span>
        <a className='text-sm my-2 block underline font-medium' target="_blank" href={`https://maps.google.com/?q=${place.address.street} ${place.address.zipCode}`}>{place.address.city}, {place.address.country}</a>
      </div>
      <PlaceGallery place={place} />
      <BookingWidget place={place} submitForm={() => submitBooking()} handleChange={(e) => handleInput(e)} 
      capacity={bookingForm.capacity} checkIn={bookingForm.checkIn} 
      checkOut={bookingForm.checkOut} message={message} type={type}/>
    </div>
  );
}

export default Index;