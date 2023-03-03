import { useContext, useState } from 'react';
import { useRouter } from "next/router";
import { GrLanguage } from "react-icons/gr";
import { MdAccountCircle } from "react-icons/md";
import { BiMenu } from "react-icons/bi";
import { FcCheckmark } from "react-icons/fc";
import { RxCross1 } from 'react-icons/rx';
import WishlistContext from '../../context/WishlistContext';
import UserContext from '../../context/UserContext';
import Link from "next/link";
import Airbnb from "../../../public/icons/airbnb.svg";
import NavBar from "../NavBar/index.js";
import Button from "../Button";
import Modal from "../Modal";
import Separator from "../Separator";
import userService from '../../services/user.service';


const Index = () => {

  const [openDropdown, setOpenDropdown] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const router = useRouter();
  const { wishlist } = useContext(WishlistContext);
  const { user, logOut, updateUserType } = useContext(UserContext);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownStatus = () => {
    setOpenDropdown(!openDropdown);
  };

  const logOutButton = () => {
    logOut();
    setOpenDropdown(!openDropdown);
    localStorage.removeItem('token');
    router.push('/');
  };

  const becomeOwner = (e) => {
    const token = localStorage.getItem('token');
    userService.becomeOwner(token)
      .then((data) => {
        if (data.errors) {
          setMessage(data.message);
          setType("error");
          return false;
        }
        updateUserType(data);
        setOpenModal(false);
      })
      .catch(err => console.log(err))
  }
  
  const handleInput = (e) => {
    setSearchQuery(e.target.value);
  }

  const handleClick = (e) => {
    if (!!user && user.type === "OWNER") {
      router.push("places/new");
    }
    if (!!user && user.type === "CUSTOMER") {
      setOpenModal(true);
    }
    else {
      router.push("/login");
    }
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
      {
        openModal && (
          <Modal
            className="overflow-hidden" title={`Veux-tu devenir loueur et publier des logements ?`}
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
                handleClick={() => becomeOwner()}
                type="button"
                btnClass=""
              />
            </div>
          </Modal>
        )
      }
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
          <p className='hidden lg:inline-flex font-medium text-sm mx-3 my-3' onClick={handleClick}>Mettre mon logement sur Airbnb</p>
        </div>
        <div className='hover:bg-gray-100 rounded-full'>
          <GrLanguage className='hidden md:inline-flex h-6 cursor-pointer mx-4 my-3' />
        </div>
        <div className='flex items-center space-x-2 border border-solid
        border-gray-300 p-1 pl-2 rounded-full transition  
        hover:shadow-[0_2px_3px_0.5px_rgba(0,0,0,0.2)] cursor-pointer ml-[5px]'
          onClick={dropdownStatus}>
          <BiMenu className='h-5 w-5' />
          <MdAccountCircle className='h-8 w-8 text-gray-500' />
          {!!user && (
            <p className='capitalize pr-2'>{user && user.firstName} {user && user.lastName}</p>
          )}

        </div>
        {openDropdown ? (
          <div className='absolute z-50 right-0 mr-[80px] top-[90%] bg-white w-[150px] 
          border border-solid border-gray-200 shadow-lg rounded-lg py-[10px]'>
            <ul>
              {!!user ? (
                <>
                  <Link href="/profil"><li className='hover:bg-gray-100 text-sm text-gray-800 pl-[20px] py-[10px] mb-[10px]' onClick={dropdownStatus}>Mon Profil</li></Link>
                  <Separator />
                  <li className='hover:bg-gray-100 text-sm text-gray-800 pl-[20px] py-[10px]' onClick={logOutButton}>Deconnexion</li>
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