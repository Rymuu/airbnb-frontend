import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import AccountNav from "../../components/AccountNav";
import LongCard from "../../components/LongCard";
import Button from "../../components/Button";
import {AiOutlinePlus} from "react-icons/ai";
import placeService from "../../services/place.service";

const PlacesPage = () => {
    const [placesArray, setPlacesArray] = useState([]);
    const router = useRouter();

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
            <div>
                <div className='text-center max-x-lg mx-auto mb-6'>
                    <Button
                        title="Publier un logement"
                        icon={<AiOutlinePlus/>}
                        handleClick={() => router.push("/places/new")}
                        type="button"
                        btnClass="primary max-w-fit inline-flex gap-1 items-center"
                    />
                </div>
                {placesArray.length > 1 ?
                    (<div className='flex flex-col'>
                        {
                            placesArray && placesArray.map((item) => (
                                <LongCard key={item._id} place={item} />
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

export default PlacesPage;