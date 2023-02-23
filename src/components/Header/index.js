import { useContext, useState } from 'react';
import WishlistContext from '../../context/WishlistContext';
import Link from "next/link";
import styles from "./index.module.scss";
import Logo from "../../../public/logo.png";
import AccountIcon from "../../../public/icons/account-icon.svg";
import MenuIcon from "../../../public/icons/menu-icon.svg";
import WorldIcon from "../../../public/icons/world-icon.svg";
import NavBar from "../NavBar/index.js";
import { useRouter } from "next/router";


const Index = () => {

  const [openDropdown, setOpenDropdown] = useState(false);
  const router = useRouter();
  const { wishlist } = useContext(WishlistContext);
  const [searchQuery, setSearchQuery] = useState("");

  const handleOpen = () => {
    setOpenDropdown(!openDropdown);
  };

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

          <li className={styles.nav__item} style={{ height: 20 + "px" }}>
            <img src={WorldIcon.src} alt="langue" height={20} />
          </li>
          <li className={styles.nav__item__account}>
            <div className={styles.dropdown} onClick={handleOpen}>
              <img src={MenuIcon.src} alt="menu" height={20} />
              <img src={AccountIcon.src} alt="langue" height={35} style={{ paddingLeft: 10 + "px" }} />
            </div>
            {openDropdown ? (
              <div className={styles.dropdown__content}>
                <ul>
                  <li><Link href="/register">Inscription</Link></li>
                  <li><Link href="/login">Connexion</Link></li>
                </ul>
              </div>
            ) : null}
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Index;