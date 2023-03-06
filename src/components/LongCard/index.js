import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Modal from "../Modal";
import Button from "../Button";
import Notification from "../Notification";
import TitlePage from "../TitlePage";
import Input from "../Input";
import { FcCheckmark } from "react-icons/fc";
import { RxCross1 } from 'react-icons/rx';
import { FaStar } from 'react-icons/fa';
import { HiOutlineTrash } from 'react-icons/hi'
import placeService from '../../services/place.service';
import typePlaceService from '../../services/typePlace.service';


const Index = ({ place, cardOnClick, useModal, modifyButton, handleUpdatePlace, handleDeletePlace }) => {

    const router = useRouter();
    const [openModal, setOpenModal] = useState(false);
    const [openUpdateModal, setOpenUpdateModal] = useState(false);
    const [message, setMessage] = useState(null);
    const [type, setType] = useState(null);
    const [typePlaceArray, setTypePlaceArray] = useState([]);

    const [placeForm, setPlaceForm] = useState({
        title: place.title,
        description: place.description,
        pricing: {
            perDay: place.pricing.perDay
        },
        rating: 5,
        capacity: place.capacity,
        types: place.types,
        images: place.images,
        address: {
            city: place.address.city,
            street: place.address.street,
            country: place.address.country,
            zipCode: place.address.zipCode,
            gps: {
                lat: place.address.gps.lat,
                long: place.address.gps.long,
            }
        }
    });

    const submitForm = (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const id = place._id;
        placeService.updatePlace(token, placeForm, id)
            .then((data) => {
                if (data.errors) {
                    setMessage(data.message);
                    setType("error");
                    return false;
                }
                handleUpdatePlace(data.place);
                setOpenUpdateModal(false);
            })
            .catch(
                (err) => {
                    console.log(err);
                    setMessage(err);
                })

    }

    useEffect(() => {
        typePlaceService.getTypePlaces()
            .then((types) => {
                setTypePlaceArray(types);
            })
            .catch(err => console.log(err))
    }, []);



    const handleTrashBinClick = (e) => {
        if (useModal) {
            setOpenModal(true);
        }
        else {
            cardOnClick();
        }
    }

    const deletePlaceButton = (e) => {
        const token = localStorage.getItem('token');
        const id = place._id;
        placeService.deletePlace(token, id)
            .then((data) => {
                if (data.errors) {
                    setMessage(data.message);
                    setType("error");
                    return false;
                }
                handleDeletePlace(data.place._id);
                setOpenModal(false);
            })
            .catch(err => console.log(err))
    }

    const handleClick = (e) => {
        router.push(`/place/${place._id}`);
    }
    return (
        <>
            {
                (openModal && useModal) ? (
                    <Modal 
                    className="overflow-hidden" title={`Es-tu sûr(e) de vouloir supprimer ${place.title} ?`} 
                    closeModal={() => setOpenModal(false)}>
                        <div className='flex justify-around items-center'>
                            <Button
                                icon={<RxCross1 className='h-8 w-8 text-primary' />}
                                handleClick={() => setOpenModal(false)}
                                type="button"
                                btnClass="h-5 w-5"
                            />
                            <Button
                                icon={<FcCheckmark className='h-10 w-10' />}
                                handleClick={() => deletePlaceButton()}
                                type="button"
                                btnClass=""
                            />
                        </div>
                    </Modal>
                ) : (null)
            }
            {
                openUpdateModal && (
                    <Modal className="" title={`Modification de ${place.title}.`} closeModal={() => setOpenUpdateModal(false)}>
                        <form >
                            <Input
                                titleLabel="Titre"
                                description="Le titre doit être concis et attirant"
                                divClass="py-2"
                                inputType="text"
                                inputValue={placeForm.title}
                                inputPlaceholder="Appartement charmant au centre de Paris"
                                inputName="title"
                                inputOnChange={(e) => setPlaceForm({ ...placeForm, title: e.target.value })}
                                inputRequired="required"
                            />
                            <Input
                                titleLabel="Description"
                                description="Décrivez le logement et ses environs"
                                divClass="py-2"
                                inputType="text"
                                inputValue={placeForm.description}
                                inputPlaceholder="Appartement charmant au centre de Paris"
                                inputName="description"
                                inputRequired="required"
                                inputOnChange={(e) => setPlaceForm({ ...placeForm, description: e.target.value })}
                            />
                            <Input
                                titleLabel="Photos"
                                description="5 photos minimum"
                                divClass="py-2"
                                inputType="text"
                                inputValue={placeForm.images}
                                inputPlaceholder="Appartement charmant au centre de Paris"
                                inputName="images"
                                inputRequired="required"
                                inputOnChange={(e) => setPlaceForm({ ...placeForm, images: e.target.value })}
                            />

                            <div className="flex justify-between items-center gap-x-4">
                                <Input
                                    titleLabel="Prix"
                                    description="Montant du prix par nuit"
                                    divClass="py-2"
                                    inputClass='max-w-[150px]'
                                    inputType="number"
                                    inputValue={placeForm.pricing.perDay}
                                    inputPlaceholder="0"
                                    inputName="pricing"
                                    inputRequired="required"
                                    inputOnChange={(e) => setPlaceForm({ ...placeForm, pricing: { ...placeForm.pricing, perDay: e.target.value } })}

                                />
                                <Input
                                    titleLabel="Capacité"
                                    description="Capacité d'accueil"
                                    divClass="py-2"
                                    inputClass='max-w-[150px]'
                                    inputType="number"
                                    inputValue={placeForm.capacity}
                                    inputPlaceholder="0"
                                    inputName="capacity"
                                    inputRequired="required"
                                    inputOnChange={(e) => setPlaceForm({ ...placeForm, capacity: e.target.value })}

                                />
                                <div>
                                    <label className='text-2xl mt-4 font-medium'>Type</label>
                                    <p className='hidden md:block text-gray-500 text-sm'>Type de logement</p>
                                    <select
                                        className="capitalize bg-gray-50 border text-gray-900 
                            text-sm rounded-2xl focus:ring-primary focus:border-primary
                            block w-full p-2.5 placeholder-gray-400 my-1 py-2 px-3 shadow-[0_0px_1px_1px_rgba(0,0,0,0.4)]"
                                        name="types" id="types" value={placeForm.types} onChange={(e) => setPlaceForm({ ...placeForm, types: e.target.value })}>
                                        {
                                            typePlaceArray && typePlaceArray.map((item) => (
                                                <option key={item._id} value={item._id}>{item.name}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                            </div>
                            <Input
                                titleLabel="Adresse"
                                divClass="py-2"
                                inputType="text"
                                inputValue={placeForm.address.street}
                                inputPlaceholder="12 Rue Anatole France"
                                inputName="street"
                                inputRequired="required"
                                inputOnChange={(e) => setPlaceForm({ ...placeForm, address: { ...placeForm.address, street: e.target.value } })}
                            />
                            <div className="flex justify-around">
                                <Input
                                    titleLabel="Code Postal"
                                    divClass="py-2"
                                    inputType="text"
                                    inputValue={placeForm.address.zipCode}
                                    inputPlaceholder="92000"
                                    inputName="zipCode"
                                    inputRequired="required"
                                    inputOnChange={(e) => setPlaceForm({ ...placeForm, address: { ...placeForm.address, zipCode: e.target.value } })}
                                />
                                <Input
                                    titleLabel="Ville"
                                    divClass="py-2"
                                    inputClass="shadow-[0_0px_1px_1px_rgba(0,0,0,0.3)] w-[600px]"
                                    inputType="text"
                                    inputValue={placeForm.address.city}
                                    inputPlaceholder="Nanterre"
                                    inputName="city"
                                    inputRequired="required"
                                    inputOnChange={(e) => setPlaceForm({ ...placeForm, address: { ...placeForm.address, city: e.target.value } })}
                                />
                            </div>
                            <Input
                                titleLabel="Pays"
                                divClass="py-2"
                                inputClass="shadow-[0_0px_1px_1px_rgba(0,0,0,0.3)] w-[600px]"
                                inputType="text"
                                inputValue={placeForm.address.country}
                                inputPlaceholder="France"
                                inputName="country"
                                inputRequired="required"
                                inputOnChange={(e) => setPlaceForm({ ...placeForm, address: { ...placeForm.address, country: e.target.value } })}
                            />
                            <div className="flex justify-around">
                                <Input
                                    titleLabel="Latitude"
                                    divClass="py-2"
                                    inputType="number"
                                    inputValue={placeForm.address.gps.lat}
                                    inputPlaceholder="1.65165"
                                    inputName="lat"
                                    inputRequired="required"
                                    inputOnChange={(e) => setPlaceForm({ ...placeForm, address: { ...placeForm.address, gps: { ...placeForm.address.gps, lat: e.target.value } } })}
                                />
                                <Input
                                    titleLabel="Longitude"
                                    divClass="py-2"
                                    inputType="number"
                                    inputValue={placeForm.address.gps.long}
                                    inputPlaceholder="2.651651"
                                    inputName="long"
                                    inputRequired="required"
                                    inputOnChange={(e) => setPlaceForm({ ...placeForm, address: { ...placeForm.address, gps: { ...placeForm.address.gps, long: e.target.value } } })}
                                />
                            </div>
                            <div className='py-2'>
                                <Button
                                    title="Valider"
                                    handleClick={(e) => {
                                        submitForm(e);
                                    }}
                                    type="submit"
                                    btnClass="primary"
                                />
                            </div>
                            {
                                message && <Notification type={type} message={message} />
                            }
                        </form>
                    </Modal>
                )
            }
            <div className='flex py-7 px-4 min-w-[70%] rounded-xl mx-auto border-b border-solid border-gray-300 cursor-pointer hover:opacity-80 
        hover:shadow-lg transition duration-200 ease-out first:border-t'>

                <div className='relative h-24 w-40 md:h-52 md:w-80 flex-shrink-0'>
                    <img className="rounded-2xl" src={place.images[0]} alt={place.title} onClick={(e) => {
                        handleClick(e);
                    }} />
                </div>

                <div className='flex flex-col flex-grow pl-5'>
                    <div className='flex justify-between'>
                        <p>{place.address.street}, {place.address.city} {place.address.zipCode}, {place.address.country}</p>
                        <HiOutlineTrash className='h-7 w-7 cursor-pointer' onClick={(handleTrashBinClick)} />
                    </div>
                    <h4 className='text-xl font-medium c'>{place.title}</h4>
                    <div className='border-b w-10 pt-2' />
                    <p className='pt-2 text-sm text-gray-500 flex-grow max-w-lg'>{place.description}</p>
                    <div className='flex justify-between items-center pt-5'>
                        <p className='text-xl flex items-center gap-x-1'>
                            <FaStar className='text-[#FF385C] h-7 w-7' />
                            {Number(place.rating).toFixed(2)}
                        </p>
                        {modifyButton && (
                            <Button
                                title="Modifier"
                                handleClick={() => setOpenUpdateModal(true)}
                                type="button"
                                btnClass="primary max-w-fit inline-flex gap-1 items-center"
                            />
                        )

                        }
                        <div>
                            <p className='text-lg lg:text-xl'><span className='font-semibold'>{place.pricing.perDay} €</span> par nuit</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Index;
