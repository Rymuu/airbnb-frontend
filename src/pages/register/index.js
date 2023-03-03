import React, { useState } from 'react';
import AuthService from '../../services/auth.service';
import TitlePage from "../../components/TitlePage";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Notification from "../../components/Notification";
import { useRouter } from 'next/router';

const Index = () => {

  const [message, setMessage] = useState(null);
  const [type, setType] = useState(null);
  const router = useRouter();

  const [userForm, setUserForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  });

  const handleInput = (e) => {
    setUserForm({ ...userForm, [e.target.name]: e.target.value });
  }

  const submitForm = (e) => {
    e.preventDefault();
    AuthService.register(userForm)
      .then((data) => {
        router.push("/login");
      })
      .catch(
        (err) => {
          console.log(err);
          setMessage(err);
        })
  }

  return (
    <div className="p-4 grow flex items-center justify-around bg-[url('https://www.nintendo-master.com/fichiers/news/158130041698/media-1image.jpg')] bg-cover">
      <div className='mb-64 p-10 bg-white border border-solid
        border-gray-300 rounded-3xl shadow-[0_2px_2px_0.2px_rgba(0,0,0,0.4)]'>
        <TitlePage title="Inscription" />
        <form className="max-w-md mx-auto">
          <Input
            divClass="py-2"
            inputClass="shadow-[0_0px_1px_1px_rgba(0,0,0,0.3)]"
            inputType="text"
            inputPlaceholder="firstname"
            inputName="firstName"
            inputValue={userForm.firstName || ""}
            inputOnChange={(e) => {
              handleInput(e);
            }}
          />
          <Input
            divClass="py-2"
            inputClass="shadow-[0_0px_1px_1px_rgba(0,0,0,0.3)]"
            inputType="text"
            inputPlaceholder="lastname"
            inputName="lastName"
            inputValue={userForm.lastName || ""}
            inputOnChange={(e) => {
              handleInput(e);
            }}
          />
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
              title="S'inscrire"
              handleClick={(e) => {
                submitForm(e);
              }}
              type="submit"
              btnClass="primary bg-gradient-to-r from-purple-500 to-primary"
            />
          </div>
          <p className='mt-2'>Vous avez déjà un compte ? <a className='underline text-primary font-semibold' href="/login">Connectez-vous.</a></p>
         
        </form>
      </div>
    </div>
  );
}

export default Index;