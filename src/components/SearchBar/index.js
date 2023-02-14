import React from 'react';
import styles from "./index.module.scss";
import SearchIcon from "../../../public/icons/search-icon.svg";
const Index = ({ title, handleClick, type, btnClass }) => {
    return (
        <div className={styles.search_bar}>
            <div className={styles.search_bar__text}><p>N'importe où</p></div>
            <div className={styles.search_bar__text}><p>Une semaine</p></div>
            <div className={styles.search_bar__text}><p>Add Guests</p></div>
            <div className={styles.search_icon_div}>
                <img src={SearchIcon.src} className={styles.search_icon_div__icon} alt="favoris" />
            </div>
        </div>
    );
}

export default Index;