import React, { useState } from "react";
import "./App.css";
import { guitarData } from "./data";

export const Guitars = () => {
    const [model, setModel] = useState('');
    const [color, setColor] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [sortOrder, setSortOrder] = useState('priceAscending')

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
                    let keyA = a.model
                    let keyB = b.model
                    if (keyA < keyB) return -1;
                    if (keyA > keyB) return 1;
                    return 0;
                };
            case 'modelDescending':
                return function sortModelDescending(a, b) {
                    let keyA = a.model
                    let keyB = b.model
                    if (keyA > keyB) return -1;
                    if (keyA < keyB) return 1;
                    return 0;
                };
            default:
                break;
        }
    };

    return (
        <div>
            <div className="header">
                <div className="title"><img src="https://images.ctfassets.net/m8onsx4mm13s/72p8qgeqA4UK7FD2MwyA19/cbc4a71ff92b788b791a53fa683dc6f4/gibson__1_.svg" alt="gibson logo"></img>Modded Mod Shop</div>

                <div className="centered">
                    <input id="modelFilter" placeholder="Model" name="filter" type="text" value={model} onChange={event => setModel(event.target.value)}></input>
                    <input id="colorFilter" placeholder="Color" name="filter" type="text" value={color} onChange={event => setColor(event.target.value)}></input>
                    <input id="minPriceFilter" placeholder="Minimum Price" name="filter" type="text" value={minPrice} onChange={event => setMinPrice(event.target.value)}></input>
                    <input id="maxPriceFilter" placeholder="Maximum Price" name="filter" type="text" value={maxPrice} onChange={event => setMaxPrice(event.target.value)}></input>
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
                        && (parseFloat(f.price.replace(/[$,]+/g, "")) > minPrice || minPrice === '')
                        && (parseFloat(f.price.replace(/[$,]+/g, "")) < maxPrice || maxPrice === '')
                    )
                    )
                        .map((data, key) => {
                            return (
                                <div key={key} className="card">
                                    <img src={'./resizedImages' + data.image.substring(data.image.indexOf('/RAM'), data.image.length - 3) + 'jpg'} alt="guitar" />
                                    <div className="cardText">
                                        <div className="model">{data.model}</div>
                                        <div className="color">{data.color}</div>
                                        <div className="price">{data.price}</div>
                                    </div>
                                </div>
                            );
                        })}
                </div>
            </div>
        </div>
    );
};