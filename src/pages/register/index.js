import React, { useState } from 'react';
import AuthService from '../../services/auth.service';
import TitlePage from "../../components/TitlePage";
import Input from "../../components/Input";
import Button from "../../components/Button";
import styles from "./index.module.scss";
const Index = () => {

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
      .then(user => console.log(user))
      .catch(err=>console.log(err))
  }

  return (
    <div className="page__register">
      <TitlePage title="Create your account"/>
      <form className={styles.form__register}>
        <Input
          titleLabel="firstname"
          inputType="text"
          inputPlaceholder="firstname"
          inputName="firstName"
          inputValue={userForm.firstName || ""}
          inputOnChange={(e) => {
            handleInput(e);
          }}
        />
        <Input
          titleLabel="lastname"
          inputType="text"
          inputPlaceholder="lastname"
          inputName="lastName"
          inputValue={userForm.lastName || ""}
          inputOnChange={(e) => {
            handleInput(e);
          }}
        />
        <Input
          titleLabel="email"
          inputType="email"
          inputPlaceholder="email"
          inputName="email"
          inputValue={userForm.email || ""}
          inputOnChange={(e) => {
            handleInput(e);
          }}
        />
        <Input
          titleLabel="password"
          inputType="password"
          inputPlaceholder="password"
          inputName="password"
          inputValue={userForm.password || ""}
          inputOnChange={(e) => {
            handleInput(e);
          }}
        />
        <Button
          title="submit"
          handleClick={(e) => {
            submitForm(e);
          }}
          type="submit"
          btnClass="btn__primary"
        />
      </form>
    </div>
  );
}

export default Index;