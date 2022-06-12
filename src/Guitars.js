import React, { useState } from "react";
import "./App.css";
import { guitarData } from "./data";

export const Guitars = () => {
    const [model, setModel] = useState('');
    const [color, setColor] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');

    return (
        <div>
            <div className="guitar-container">
                <div>
                    <input id="modelFilter" placeholder="Model" name="filter" type="text" value={model} onChange={event => setModel(event.target.value)}></input>
                    <input id="colorFilter" placeholder="Color" name="filter" type="text" value={color} onChange={event => setColor(event.target.value)}></input>
                    <input id="minPriceFilter" placeholder="Minimum Price" name="filter" type="text" value={minPrice} onChange={event => setMinPrice(event.target.value)}></input>
                    <input id="maxPriceFilter" placeholder="Maximum Price" name="filter" type="text" value={maxPrice} onChange={event => setMaxPrice(event.target.value)}></input>
                </div>
                {guitarData.filter(f => (
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
    );
};