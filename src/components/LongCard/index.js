import React from 'react';
import { FaStar } from 'react-icons/fa';
import {RxCross1} from 'react-icons/rx'
import { useRouter } from 'next/router';

const Index = ({ place, cardOnClick }) => {

    const router = useRouter();

    const handleClick = (e) => {
        router.push(`/place/${place._id}`);
    }
    return (
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
                    <RxCross1 className='h7 cursor-pointer' onClick={cardOnClick}/>
                </div>
                <h4 className='text-xl font-medium c'>{place.title}</h4>
                <div className='border-b w-10 pt-2'/>
                <p className='pt-2 text-sm text-gray-500 flex-grow'>{place.description}</p>
                <div className='flex justify-between items-center pt-5'>
                    <p className='text-xl flex items-center gap-x-1'>
                        <FaStar className='text-[#FF385C]'/>
                        {Number(place.rating).toFixed(2)}
                    </p>
                    <div>
                        <p className='text-lg lg:text-xl'><span className='font-semibold'>{place.pricing.perDay} €</span> par nuit</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Index;
