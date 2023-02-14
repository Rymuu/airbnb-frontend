import { useContext, useState } from 'react';
import WishlistContext from '../../context/WishlistContext';
import Link from "next/link";
import styles from "./index.module.scss";
import Logo from "../../../public/logo.png";
import AccountIcon from "../../../public/icons/account-icon.svg";
import WorldIcon from "../../../public/icons/world-icon.svg";
import NavBar from "../NavBar/index.js";
import { useRouter } from "next/router";


const Index = () => {

  const router = useRouter();
  const { wishlist } = useContext(WishlistContext);
  const [searchQuery, setSearchQuery] = useState("");

  const handleInput = (e) => {
    setSearchQuery(e.target.value);
  }

  const submitSearch = (e) => {
    router.push({ pathname: "/s/places", query: { "s": `${searchQuery}` } });
  }

  return (
    <header className={styles.header__main}>
      <div className={styles.header__logo}>
        <Link href="/">
          <img src={Logo.src} alt="Airbnb" />
        </Link>
      </div>
      <div>
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
      </div>
      <div className={styles.header__menu}>
        <ul className={styles.nav__list}>
          <li className={styles.nav__item}>
            <Link href="/become-an-owner">
              Mettre mon logement sur Airbnb
            </Link>
          </li>
          <li className={styles.nav__item}>
            <Link href="/profil">
              Profil
            </Link>
          </li>
          <li className={styles.nav__item}>
            <img src={WorldIcon.src} alt="favoris" height={20} />
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Index;