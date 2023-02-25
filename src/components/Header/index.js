import { useContext, useState } from 'react';
import { GrLanguage } from "react-icons/gr";
import { MdAccountCircle } from "react-icons/md";
import { BiMenu } from "react-icons/bi";
import WishlistContext from '../../context/WishlistContext';
import UserContext from '../../context/UserContext';
import Link from "next/link";
import Airbnb from "../../../public/icons/airbnb.svg";
import NavBar from "../NavBar/index.js";
import Separator from "../Separator";
import { useRouter } from "next/router";


const Index = () => {

  const [openDropdown, setOpenDropdown] = useState(false);
  const router = useRouter();
  const { wishlist } = useContext(WishlistContext);
  const { user } = useContext(UserContext);
  const [searchQuery, setSearchQuery] = useState("");

  const dropdownStatus = () => {
    setOpenDropdown(!openDropdown);
  };

  const logOut = () => {
    setOpenDropdown(!openDropdown);
    localStorage.removeItem('token');
    router.push('/');
  };

  const handleInput = (e) => {
    setSearchQuery(e.target.value);
  }

  const submitSearch = (e) => {
    searchQuery ? (
      router.push({ pathname: "/s/places", query: { "s": `${searchQuery}` } })
    ) : (null)
  }

  return (
    <header className="sticky top-0 z-50 grid grid-cols-3 bg-white border border-solid
    border-gray-200 py-[15.5px]
    md:px-[80px]">
      {/* Left */}
      <div className='relative flex items-center h-1 cursor-pointer my-auto'>
        <Link href="/">
          <img src={Airbnb.src} alt="logo" />
        </Link>
      </div>
      {/* Middle */}
      <NavBar
        inputType="search"
        inputPlaceholder="Rechercher un logement"
        inputName="search"
        inputValue={searchQuery || ""}
        inputOnChange={(e) => {
          handleInput(e);
        }}
        submitSearch={submitSearch}
      />
      {/* Right */}
      <div className='flex items-center justify-end cursor-pointer'>
        <div className='hover:bg-gray-100 rounded-full'>
          <p className='font-medium text-sm mx-3 my-3'>Mettre mon logement sur Airbnb</p>
        </div>
        <div className='hover:bg-gray-100 rounded-full'>
          <GrLanguage className='h-6 cursor-pointer mx-4 my-3' />
        </div>
        <div className='flex items-center space-x-2 border border-solid
        border-gray-300 p-1 pl-2 rounded-full transition  
        hover:shadow-[0_2px_3px_0.5px_rgba(0,0,0,0.2)] cursor-pointer ml-[5px]'
          onClick={dropdownStatus}>
          <BiMenu className='h-5 w-5' />
          <MdAccountCircle className='h-8 w-8 text-gray-500' />
          {user ? (
            <p>{user.firstName}</p>
          ) : null}

        </div>
        {openDropdown ? (
          <div className='absolute z-50 right-0 mr-[80px] top-[90%] bg-white w-[150px] 
          border border-solid border-gray-200 shadow-lg rounded-lg py-[10px]'>
            <ul>
              {user._id ? (
                <>
                  <Link href="/profil"><li className='hover:bg-gray-100 text-sm text-gray-800 pl-[20px] py-[10px] mb-[10px]' onClick={dropdownStatus}>Mon Profil</li></Link>
                  <Separator />
                  <li className='hover:bg-gray-100 text-sm text-gray-800 pl-[20px] py-[10px]' onClick={logOut}>Deconnexion</li>
                </>
              ) :
                (
                  <>
                    <Link href="/register"><li className='hover:bg-gray-100 text-sm text-gray-800 pl-[20px] py-[10px]' onClick={dropdownStatus}>Inscription</li></Link>
                    <Link href="/login"><li className='hover:bg-gray-100 text-sm text-gray-800 pl-[20px] py-[10px]' onClick={dropdownStatus}>Connexion</li></Link>
                  </>
                )}

            </ul>
          </div>
        ) : null}
      </div >
    </header >
  );
}

export default Index;