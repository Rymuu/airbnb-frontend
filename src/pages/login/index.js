import React, { useState, useContext } from 'react';
import { useRouter } from 'next/router'
import AuthService from "../../services/auth.service";
import TitlePage from "../../components/TitlePage";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Notification from "../../components/Notification";
import UserContext from '../../context/UserContext';

const Index = () => {
  const router = useRouter();
  const { findUser } = useContext(UserContext);
  const [message, setMessage] = useState(null);
  const [type, setType] = useState(null);
  const [userForm, setUserForm] = useState({
    email: "",
    password: ""
  });

  const handleInput = (e) => {
    setUserForm({ ...userForm, [e.target.name]: e.target.value });
  }

  const submitForm = (e) => {

    e.preventDefault();
    AuthService.login(userForm)
      .then((data) => {
        if (!data.token) {
          setMessage(data.message);
          setType("error");
          return false;
        }
        localStorage.setItem('token', data.token);
        findUser();
        if (data.isAdmin) {
          router.push("/admin");
        }
        else { router.push("/profil"); }
      })
      .catch(
        (err) => {
          console.log(err);
          setMessage(err);
        }
      )
  }

  return (
    <div className="p-4 grow flex items-center justify-around bg-[url('https://cdn.mos.cms.futurecdn.net/uADFzCtHNywQNybmj46dcU.jpg')] bg-cover">
      <div className='mb-64 p-10 bg-white border border-solid
        border-gray-300 rounded-3xl shadow-[0_2px_2px_0.2px_rgba(0,0,0,0.4)]'>
        <TitlePage title="Connexion" />
        <form className="max-w-md mx-auto">
          <Input
            divClass="py-2"
            inputClass="shadow-[0_0px_1px_1px_rgba(0,0,0,0.3)]"
            inputType="email"
            inputPlaceholder="email"
            inputName="email"
            inputValue={userForm.email || ""}
            inputOnChange={(e) => {
              handleInput(e);
            }}
          />
          <Input
            divClass="py-2"
            inputClass="shadow-[0_0px_1px_1px_rgba(0,0,0,0.3)]"
            inputType="password"
            inputPlaceholder="password"
            inputName="password"
            inputValue={userForm.password || ""}
            inputOnChange={(e) => {
              handleInput(e);
            }}
          />
          <div className='py-2'>
            <Button
              className="primary"
              title="Se connecter"
              handleClick={(e) => {
                submitForm(e);
              }}
              type="submit"
              btnClass="primary bg-gradient-to-r from-purple-500 to-primary"
            />
          </div>
          <p className='mt-2'>Vous n'avez pas encore de compte ? <a className='underline text-primary font-semibold' href="/register">Inscrivez-vous.</a></p>
          {
            message && <Notification type={type} message={message} />
          }
        </form>
      </div>
    </div>
  );
}

export default Index;