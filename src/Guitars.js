import React, { useState } from "react";
import "./App.css";
import { guitarData } from "./data";


export const Guitars = () => {

    const [model, setModel] = useState('');
    const [color, setColor] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [sortOrder, setSortOrder] = useState('priceAscending');
    const [theme, setTheme] = useState('dark');

    const sortFunction = (sortProperty) => {
        switch (sortProperty) {
            case 'priceAscending':
                return function (a, b) {
                    let keyA = parseInt(a.price.replace(/[$,]+/g, ""))
                    let keyB = parseInt(b.price.replace(/[$,]+/g, ""))
                    if (keyA < keyB) return -1;
                    if (keyA > keyB) return 1;
                    return 0;
                };
            case 'priceDescending':
                return function (a, b) {
                    let keyA = parseInt(a.price.replace(/[$,]+/g, ""))
                    let keyB = parseInt(b.price.replace(/[$,]+/g, ""))
                    if (keyA > keyB) return -1;
                    if (keyA < keyB) return 1;
                    return 0;
                };
            case 'modelAscending':
                return function (a, b) {
                    let keyA = a.model.trim();
                    let keyB = b.model.trim();
                    if (keyA < keyB) return -1;
                    if (keyA > keyB) return 1;
                    return 0;
                };
            case 'modelDescending':
                return function sortModelDescending(a, b) {
                    let keyA = a.model.trim();
                    let keyB = b.model.trim();
                    if (keyA > keyB) return -1;
                    if (keyA < keyB) return 1;
                    return 0;
                };
            default:
                break;
        }
    };

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light'
        setTheme(newTheme)
    }

    const themeImage = (theme) => {
        const themeImage = theme === 'light' ? 'https://i.ibb.co/pxR5GY4/gibson-Light.jpg' : 'https://i.ibb.co/Fns5NjN/gibson-Dark.jpg'
        return themeImage
    }

    const body = document.body;
    const scrollUp = "scroll-up";
    const scrollDown = "scroll-down";
    let lastScroll = 0;

    window.addEventListener("scroll", () => {
        const currentScroll = window.pageYOffset;
        if (currentScroll <= 0) {
            body.classList.remove(scrollUp);
            return;
        }

        if (currentScroll > lastScroll && !body.classList.contains(scrollDown)) {
            // down
            body.classList.remove(scrollUp);
            body.classList.add(scrollDown);
        } else if (
            currentScroll < lastScroll &&
            body.classList.contains(scrollDown)
        ) {
            // up
            body.classList.remove(scrollDown);
            body.classList.add(scrollUp);
        }
        lastScroll = currentScroll;
    });

    return (
        <div className={theme}>
            <div className="header">
                <div className="titleAndCountAndLightbulb">
                    <div className="title">
                        <img src={themeImage(theme)} alt="gibson logo"></img>
                        <span>Modded Mod Shop</span>
                    </div>
                    <div className="countAndLightbulb">
                        <div className="listCount">{guitarData.sort(sortFunction(sortOrder)).filter(f => (
                            (f.model.toLowerCase().includes(model.toLowerCase()) || model === '')
                            && (f.color.toLowerCase().includes(color.toLowerCase()) || color === '')
                            && (parseFloat(f.price.replace(/[$,]+/g, "")) >= minPrice || minPrice === '')
                            && (parseFloat(f.price.replace(/[$,]+/g, "")) <= maxPrice || maxPrice === '')
                        )
                        ).length + " Results"}</div>
                        <button className="themeButton" onClick={() => toggleTheme()}>
                            <span role="img" aria-label="Lightbulb">💡</span>
                        </button>
                    </div>
                </div>

                <div className="centered">
                    <input id="modelFilter" placeholder="Model" name="filter" type="text" value={model} onChange={event => setModel(event.target.value)}></input>
                    <input id="colorFilter" placeholder="Color" name="filter" type="text" value={color} onChange={event => setColor(event.target.value)}></input>
                    <input id="minPriceFilter" placeholder="💲Min" name="filter" type="text" value={minPrice} onChange={event => setMinPrice(event.target.value)}></input>
                    <input id="maxPriceFilter" placeholder="💲Max" name="filter" type="text" value={maxPrice} onChange={event => setMaxPrice(event.target.value)}></input>
                </div>

                <div className="centered">
                    <button id="priceAscending" className={"sortButton " + (sortOrder === 'priceAscending' ? 'activeButton' : '')} onClick={() => setSortOrder('priceAscending')}><span role="img" aria-label="Money Bag">💰</span><span role="img" aria-label="Index Pointing Up">👆</span></button>
                    <button id="priceDescending" className={"sortButton " + (sortOrder === 'priceDescending' ? 'activeButton' : '')} onClick={() => setSortOrder('priceDescending')}><span role="img" aria-label="Money Bag">💰</span><span role="img" aria-label="Index Pointing Down">👇</span></button>
                    <button id="modelAscending" className={"sortButton " + (sortOrder === 'modelAscending' ? 'activeButton' : '')} onClick={() => setSortOrder('modelAscending')}><span role="img" aria-label="Guitar">🎸</span><span role="img" aria-label="Index Pointing Up">👆</span></button>
                    <button id="modelDescending" className={"sortButton " + (sortOrder === 'modelDescending' ? 'activeButton' : '')} onClick={() => setSortOrder('modelDescending')}><span role="img" aria-label="Guitar">🎸</span><span role="img" aria-label="Index Pointing Down">👇</span></button>
                </div>
            </div>
            <div className="guitar-container">
                <div className="cards">
                    {guitarData.sort(sortFunction(sortOrder)).filter(f => (
                        (f.model.toLowerCase().includes(model.toLowerCase()) || model === '')
                        && (f.color.toLowerCase().includes(color.toLowerCase()) || color === '')
                        && (parseFloat(f.price.replace(/[$,]+/g, "")) >= minPrice || minPrice === '')
                        && (parseFloat(f.price.replace(/[$,]+/g, "")) <= maxPrice || maxPrice === '')
                    )
                    )
                        .map((data, key) => {
                            return (
                                <div key={key} className="card">
                                    <img id={key} src={'./resizedImages' + data.image.substring(data.image.indexOf('/RAM'), data.image.length - 3) + 'jpg'} alt="guitar" />
                                    <div className="cardText">
                                        <div className="model">{data.model.trim()}</div>
                                        <div className="color">{data.color}</div>
                                        <div className="price">{data.price}</div>
                                    </div>
                                </div>
                            );
                        })}
                </div>
            </div>
            <footer>
                <div className="contactLinks">
                    <a href="mailto: ryanleestl@gmail.com">
                        <span role="img" aria-label="Email">📧</span>
                    </a>
                    <a href="https://github.com/clearchaos3/modded-mod-shop">
                        <span role="img" aria-label="Man Technologist">👨‍💻</span>
                    </a>
                </div>
                <div>Made by <strong>Ryan Lee</strong></div>
            </footer>
        </div>
    );
};