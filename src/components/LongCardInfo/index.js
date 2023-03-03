import React from 'react';

const Index = ({ children, title, image }) => {


    return (
        <>
            <div className='flex py-7 px-4 min-w-[70%] rounded-xl mx-auto border-b border-solid border-gray-300 cursor-pointer hover:opacity-80 
        hover:shadow-lg transition duration-200 ease-out first:border-t'>

                <div className='relative h-24 w-40 md:h-52 md:w-80 flex-shrink-0'>
                    <img className="rounded-2xl" src={image} alt={title} />
                </div>

                <div className='flex flex-col flex-grow pl-5'>
                    <h4 className='text-xl font-medium c'>{title}</h4>
                    {children}
                </div>
            </div>
        </>
    );
}

export default Index;
