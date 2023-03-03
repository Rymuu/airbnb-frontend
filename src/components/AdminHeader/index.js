import { useContext, useState } from 'react';
import { TbLogout } from "react-icons/tb";
import UserContext from '../../context/UserContext';

const Header = ({ mobileNavsidebar, setMobileNavsidebar }) => {
    const { user } = useContext(UserContext);
    return (
        <header className="flex items-center h-20 px-6 sm:px-10 bg-whitebg-white border border-solid
        border-gray-200 py-[15.5px]
        md:px-[80px] shadow-[0_2px_3px_0.5px_rgba(0,0,0,0.2)]">
<div>
    <p className='font-bold'>Admin Panel</p>
</div>
            <div className="flex flex-shrink-0 items-center ml-auto ">
                {!!user && (
                    <p className='capitalize pr-6 border-r border-solid
                    border-gray-300'>{user && user.firstName} {user && user.lastName}</p>
                )}
                <div className="border-l pl-3 ml-3 space-x-1">
                    <TbLogout className='text-gray-500 cursor-pointer'/>
                </div>
            </div>
        </header>
    );
};

export default Header;