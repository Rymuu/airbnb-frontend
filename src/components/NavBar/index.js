import React from 'react';
import { BiSearch } from "react-icons/bi";
const Index = (props) => {
    return (
        <div
            className="flex items-center md:border md:border-solid
        md:border-gray-300 rounded-full py-[7px] md:transition md:shadow-[0_2px_2px_0.2px_rgba(0,0,0,0.1)] 
        md:hover:shadow-[0_2px_3px_0.5px_rgba(0,0,0,0.2)]">
            <input
                className='flex-grow pl-5 bg-transparent outline-none
            text-sm text-gray-700 placeholder-gray-500'
                type={props.inputType}
                placeholder={props.inputPlaceholder}
                name={props.inputName}
                value={props.inputValue}
                onChange={props.inputOnChange}
                required={true}
            />
            <BiSearch
                className="hidden md:inline-flex h-8 w-8 bg-[#FF385C]
             text-white rounded-full p-2 cursor-pointer font-extrabold
             md:mx-2"
                onClick={props.submitSearch} />
        </div>
    );
}

export default Index;