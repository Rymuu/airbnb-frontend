import {useEffect, useState} from 'react';
import TitlePage from "../../components/TitlePage";
import userService from '../../services/user.service';
import styles from "./index.module.scss";
import Button from "../../components/Button";
import Modal from "../../components/Modal";
import Input from "../../components/Input";
import WithAuth from '../../HOC/withAuth';

const Index = () => {

  const [user, setUser] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [userForm, setUserForm] = useState();

  useEffect(() => {
    const token = localStorage.getItem('token');
    userService.getMe(token)
      .then((user) => {
        console.log(user);
        setUserForm(user);
        setUser(user);
      })
      .catch(err => console.log(err))
  }, []);

  useEffect(() => {
    console.log(openModal);
  }, [openModal]);

  const handleInput = (e) => {
    setUserForm({ ...userForm, [e.target.name]: e.target.value });
  }

  const submitUpdate = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    userService.updateUser(token, userForm)
      .then((user) => {
        console.log(user);
        setOpenModal(false);
        setUser(user);
      }
      )
      .catch(err => console.log(err));
  }

  return (
    <>
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
                title="modifier" 
                type="submit"
                handleClick={() => {
                  console.log("test")
                }}
                btnClass="btn__primary"
              />
            </form>
          </Modal>
        )
      }
      <TitlePage title="Mon profil" />
      <div className={styles.wrapper}>
        {
          user ? (
            <>
              <p>FirstName : {user.firstName}</p>
              <p>lastName : {user.lastName}</p>
              <p>Email : {user.email}</p>
            </>
          ) : <p>...loading</p>
        }
        <Button
          title="Modifier"
          handleClick={() => {
            setOpenModal(true);
          }}
          type="button"
          btnClass="btn__primary"
        />
      </div>
    </>
  );
}

export default WithAuth(Index);