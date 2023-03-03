import React from 'react';
import { AiFillStar } from 'react-icons/ai';
import Notification from '../Notification';

const Index = ({ place, submitForm, handleChange, checkIn, checkOut, capacity, message, type }) => {
    return (
        <div className='mt-8 gap-8 grid grid-cols-1 md:grid-cols-[2fr__1fr]'>
            <div className=''>
                <p className="flex gap-x-1 items-center ">
                    {place.capacity} voyageurs · 1 chambre · 1 lit · 0 salle de bain
                </p>
                <div className='mt-8 pt-8 border-t border-solid border-t-gray-300 '>
                    {place.description}
                </div>
            </div>

            <div className='bg-white shadow-md shadow-gray-300 border border-solid border-gray-300 p-4 rounded-2xl'>
                <div>
                    <span className='text-xl font-medium'>{place.pricing.perDay} €</span> par nuit
                    <p className='flex items-center gap-x-1'>
                        <AiFillStar className='' />
                        <span className='text-sm font-medium'> {Number(place.rating).toFixed(2)}</span>
                        <span className='font-medium'> · </span>
                        <span className='text-sm my-2 block underline font-normal'>62 commentaires</span>
                    </p>
                </div>
                <div className='border rounded-2xl my-4 border-solid border-gray-400'>
                    <div className='flex'>
                        <div className='py-2 px-4'>
                            <label className='uppercase text-xs font-semibold'>Arrivée</label>
                            <input className='text-sm' type="date" value={checkOut} name='dates.checkIn' onChange={handleChange} />
                        </div>
                        <div className='py-2 px-4 border-l border-solid border-l-gray-400'>
                            <label className='uppercase text-xs font-semibold'>Départ</label>
                            <input className='text-sm' type="date" value={checkIn} name='dates.checkOut' onChange={handleChange} />
                        </div>
                    </div>
                    <div>
                        <div className='py-2 px-4 border-t border-solid border-t-gray-400'>
                            <label className='uppercase text-xs font-semibold'>Nombre de voyageurs</label>
                            <input className='text-sm' type="number" value={capacity} name="capacity" min={1} max={place.capacity} onChange={handleChange} />
                        </div>
                    </div>
                </div>

                <button className='primary bg-gradient-to-r from-primary to-[#da0a80]' onClick={submitForm}>Réserver</button>
                <p className='text-sm text-center mt-4'>Aucun montant ne vous sera débité pour le moment</p>
                {
                    message && <Notification type={type} message={message} />
                }
            </div>

        </div>
    );
}

export default Index;