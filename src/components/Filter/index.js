import React, { useState, useEffect } from "react";
import { links } from "../../../public/icons/icons-links";
import FilterIcon from "../../../public/icons/filter-icon.svg";
import Modal from "../Modal";
import Button from "../Button";
import Separator from "../Separator";
import styles from "./index.module.scss";
import typePlaceService from "../../services/typePlace.service";


function Filter({ selectedFilter, setSelectedFilter }) {

    const [typePlaceArray, setTypePlaceArray] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [filterForm, setFilterForm] = useState({
        minPrice: 1,
        maxPrice: 1000,
        minCapacity: 1,
        maxCapacity: 8,
    });

    const handleInput = (e) => {
        setFilterForm({ ...filterForm, [e.target.name]: e.target.value });
    }

    const submitFilter = (e) => {
        setOpenModal(false);
    }

    useEffect(() => {
        typePlaceService.getTypePlaces()
            .then((types) => {
                setTypePlaceArray(types);
            })
            .catch(err => console.log(err))
    }, []);

    return (
        <>
            {
                openModal && (
                    <Modal className={styles.modal__content} title="Filtres" closeModal={() => setOpenModal(false)}>
                        <form>

                            <h2>Fourchettes de prix</h2>
                            <h3>Le prix moyen par nuit est de 208 €</h3>
                            <div className={styles.container}>
                                <div className={styles.input__wrapper}>
                                    <label>prix minimum €</label>
                                    <input
                                        required="required"
                                        type="text"
                                        placeholder="0"
                                        name="minPrice"
                                        value={filterForm.minPrice || ""}
                                        onChange={(e) => {
                                            handleInput(e);
                                        }}
                                    />
                                </div>
                                <p> - </p>
                                <div className={styles.input__wrapper}>
                                    <label>prix maximum €</label>
                                    <input
                                        required="required"
                                        type="text"
                                        placeholder="0"
                                        name="maxPrice"
                                        value={filterForm.maxPrice || ""}
                                        onChange={(e) => {
                                            handleInput(e);
                                        }}
                                    />
                                </div>
                            </div>
                            <Separator />
                            <h2>Capacité</h2>
                            <div className={styles.container}>
                                <div className={styles.input__wrapper}>
                                    <label>capacité minimum</label>
                                    <input
                                        required="required"
                                        type="text"
                                        name="minCapacity"
                                        value={filterForm.minCapacity || ""}
                                        onChange={(e) => {
                                            handleInput(e);
                                        }}
                                    />
                                </div>
                                <p> - </p>
                                <div className={styles.input__wrapper}>
                                    <label>capacité maximum</label>
                                    <input
                                        required="required"
                                        type="text"
                                        name="maxCapacity"
                                        value={filterForm.maxCapacity || ""}
                                        onChange={(e) => {
                                            handleInput(e);
                                        }}
                                    />
                                </div>
                            </div>
                            <Separator />
                            <h2>Type de propriété</h2>
                            <select className={styles.select__multiple} name="types" id="types" multiple>
                                {
                                    typePlaceArray && typePlaceArray.map((item) => (
                                        <option key={item._id} value={item._id}>{item.name}</option>
                                    ))
                                }
                            </select>
                            <Separator />
                            <Button
                                title="Afficher les logements"
                                type="submit"
                                onClick={(e) => {
                                    submitFilter(e);
                                }}
                                btnClass="btn__primary"
                            />
                        </form>
                    </Modal>
                )
            }
            <div className={styles.filter__div}>
                <div className={styles.filter__div__icons}>
                    {links.map((item, i) => (
                        <div
                            key={i}
                            className={styles.links__box}
                            onClick={() => {
                                setSelectedFilter(item.label);
                            }}
                        >
                            <img src={item.imgSrc} className={styles.links__img} />
                            <p
                                className={styles.links__label}
                            >
                                {item.label}
                            </p>
                        </div>
                    ))}
                </div>
                <div className={styles.filter__div__button} onClick={() => {
                    setOpenModal(true);
                }}>
                    <img src={FilterIcon.src} alt="filters" height={17} />
                    <a>Filtres</a>
                </div>
            </div>
        </>
    );
}

export default Filter;