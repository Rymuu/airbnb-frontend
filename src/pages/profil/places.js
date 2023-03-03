import { useEffect, useState } from 'react';
import WithAuth from '../../HOC/withAuth';
import IsOwner from '../../HOC/IsOwner';
import { useRouter } from 'next/router';
import AccountNav from "../../components/AccountNav";
import LongCard from "../../components/LongCard";
import Button from "../../components/Button";
import { AiOutlinePlus } from "react-icons/ai";
import placeService from "../../services/place.service";


const PlacesPage = () => {
    const [placesArray, setPlacesArray] = useState([]);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');
        placeService.getMyPlaces(token)
            .then((places) => {
                setPlacesArray(places);
            })
            .catch(err => console.log(err));
    }, []);

    const handleUpdatePlace = (updatedPlace) => {
        const updatedPlacesArray = placesArray.map((place) => {
            if (place._id === updatedPlace._id) {
                return updatedPlace;

            }
            return place;
        });
        setPlacesArray(updatedPlacesArray);
    };

    const handleDeletePlace = (deletedPlaceId) => {
        const updatedPlacesArray = placesArray.filter((place) => place._id !== deletedPlaceId);
        setPlacesArray(updatedPlacesArray);
    };

    return (
        <div>
            <AccountNav />
            <div>
                <div className='text-center max-x-lg mx-auto mb-6'>
                    <Button
                        title="Publier un logement"
                        icon={<AiOutlinePlus />}
                        handleClick={() => router.push("/places/new")}
                        type="button"
                        btnClass="primary max-w-fit inline-flex gap-1 items-center"
                    />
                </div>
                {placesArray.length > 1 ?
                    (<div className='flex flex-col'>
                        {
                            placesArray && placesArray.map((item) => (
                                <LongCard key={item._id} place={item} useModal={true} modifyButton={true} 
                                handleUpdatePlace={handleUpdatePlace} handleDeletePlace={handleDeletePlace}/>
                            ))
                        }
                    </div>)
                    :
                    (<p className='text-center'>Vous n'avez pas encore publié de logement.</p>)
                }
            </div>
        </div>
    );
}

export default WithAuth(PlacesPage);