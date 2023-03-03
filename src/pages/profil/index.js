import { useEffect, useState, useContext } from 'react';
import WithAuth from '../../HOC/withAuth';
import AccountNav from "../../components/AccountNav";
import userService from '../../services/user.service';
import Button from "../../components/Button";
import Modal from "../../components/Modal";
import Input from "../../components/Input";
import UserContext from '../../context/UserContext';
import { useRouter } from 'next/router';

const Index = () => {
  const { pathname } = useRouter();
  const router = useRouter();
  let subpage = pathname.split('/')?.[2];

  const { user, setUser, logOut } = useContext(UserContext);
  const [openModal, setOpenModal] = useState(false);
  const [userForm, setUserForm] = useState();

  const logOutButton = () => {
    logOut();
    localStorage.removeItem('token');
    router.push('/');
  };

  useEffect(() => {

  }, [openModal]);

  const handleInput = (e) => {
    setUserForm({ ...userForm, [e.target.name]: e.target.value });
  }

  const submitUpdate = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    userService.updateUser(token, userForm)
      .then((user) => {
        setOpenModal(false);
        setUser(user);
      }
      )
      .catch(err => console.log(err));
  }

  return (
    <div>
      {
        openModal && (
          <Modal title="Modifier mon profil" closeModal={() => setOpenModal(false)}>
            <form onSubmit={(e) => submitUpdate(e)}>
              <Input
                titleLabel="firstname"
                inputType="text"
                inputPlaceholder="firstname"
                inputName="firstName"
                inputValue={userForm.firstName}
                inputOnChange={(e) => {
                  handleInput(e);
                }}
              />
              <Input
                titleLabel="lastname"
                inputType="text"
                inputPlaceholder="lastname"
                inputName="lastName"
                inputValue={userForm.lastName}
                inputOnChange={(e) => {
                  handleInput(e);
                }}
              />
              <Input
                titleLabel="email"
                inputType="email"
                inputPlaceholder="email"
                inputName="email"
                inputValue={userForm.email}
                inputOnChange={(e) => {
                  handleInput(e);
                }}
              />
              <Button
                title="Modifier"
                type="submit"
                handleClick={() => {
                }}
                btnClass="primary"
              />
            </form>
          </Modal>
        )
      }
      <AccountNav />

      <div className='text-center max-x-lg mx-auto'>
        <div className='flex items-center justify-center'>
          <p>Bonjour <span className='text-primary font-semibold capitalize'>{user && user.firstName}</span> !</p>
          <Button
            title="Déconnexion"
            handleClick={logOutButton}
            type="button"
            btnClass="primary max-w-fit ml-2"
          />
        </div>
        <div className='py-2'>
          <img className='mx-auto rounded-2xl w-72' src={"https://pbs.twimg.com/profile_images/1481028496960884737/0TV2hqEf_400x400.jpg"} />
        </div>
        <div className='mx-auto w-72 text-left'>
          {
            user ? (
              <>
                <p><span className='underline'>Prénom</span> : <span className='capitalize'>{user.firstName}</span></p>
                <p><span className='underline'>Nom</span> : <span className='capitalize'>{user.lastName}</span></p>
                <p><span className='underline'>Email</span> : <span>{user.email}</span></p>
              </>
            ) : <p>...loading</p>
          }
          <Button
            title="Modifier mes informations"
            handleClick={() => {
              setUserForm(user);
              setOpenModal(true);
            }}
            type="button"
            btnClass="primary max-w-sm mt-2"
          />
        </div>
      </div>
    </div>
  );
}

export default WithAuth(Index);