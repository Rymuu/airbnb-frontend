import Input from "../../../components/Input";
import { useState, useEffect } from "react";
import TitlePage from "../../../components/TitlePage";
import typePlaceService from "../../../services/typePlace.service";
import placeService from "../../../services/place.service";
import Button from "../../../components/Button";
import { useRouter } from "next/router";
import Notification from "../../../components/Notification";

const Index = () => {

    const router = useRouter();
    const [message, setMessage] = useState(null);
    const [type, setType] = useState(null);
    const [typePlaceArray, setTypePlaceArray] = useState([]);
    const [placeForm, setPlaceForm] = useState({
        title: "",
        description: "",
        pricing: {
            perDay: ""
        },
        rating: 5,
        capacity: "",
        types: "",
        images: "",
        address: {
            city: "",
            street: "",
            country:"",
            zipCode: "",
            gps: {
                lat: "",
                long: "",
            }
        }
    });

    const submitForm = (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        placeService.createPlace(token, placeForm)
            .then((data) => {
                console.log("c'est la place", placeForm)
                if (data.errors) {
                    setMessage(data.message);
                    setType("error");
                    return false;
                }

                console.log(data);
                router.push("/profil/places");
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

    return (
        <div className="p-4 grow flex items-center justify-around bg-[url('https://i.pinimg.com/originals/31/3f/20/313f20115b9086c2598eaeb05bea833a.png')] bg-cover">

            <form className="max-w-2xl mt-20 m-auto p-10 rounded-2xl shadow-[0_0px_5px_1px_rgba(0,0,0,0.4)] bg-white">
                <TitlePage title="Publier un logement" />
                <Input
                    titleLabel="Titre"
                    description="Le titre doit être concis et attirant"
                    divClass="py-2"
                    inputType="text"
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
                            name="types" id="types" onChange={(e) => setPlaceForm({ ...placeForm, types: e.target.value })}>
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
                        inputPlaceholder="1.65165"
                        inputName="lat"
                        inputRequired="required"
                        inputOnChange={(e) => setPlaceForm({ ...placeForm, address: { ...placeForm.address, gps: { ...placeForm.address.gps, lat: e.target.value } } })}
                    />
                    <Input
                        titleLabel="Longitude"
                        divClass="py-2"
                        inputType="number"
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
        </div>
    );
}

export default Index;