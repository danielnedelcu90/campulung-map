import React, { useEffect, useState } from 'react';
import uuid from 'react-uuid';
import { Marker } from 'react-leaflet';
import { loadData, saveData } from '../GS';
import ImageUploader from '../ImageUploader'

export const NewMarker = props => {
    const initMarker = ref => {
        ref && ref.leafletElement.openPopup()
    }

    return <Marker ref={initMarker} {...props} />
}

export const NewEntryForm = props => {
    const [inputsView, setInputsView] = useState(1);
    const { lat, lng } = props.position;
    const { categories } = props;

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
    
        const entry = {
            active: 0,
            id: uuid(),
            category: formData.get('category'),
            title: formData.get('title'),
            img: formData.get('img'),
            lat: formData.get('lat'),
            lng: formData.get('lng'),
            description: formData.get('description')
        }
    
        saveData(entry);
        setInputsView(0);
    }
    
    return (
        <form onSubmit={(e) => handleSubmit(e)}>
            <div 
                style={{display: inputsView ? 'flex' : 'none'}}
                className="form-view form-view--inputs"
                >
                <select className="form-view__select" name="category">
                    { categories && categories.map(category => {
                        const { name } = category;
                        return (
                            <option key={name} value={name}>{name}</option>
                            );
                        }) }
                    <option value="Alege categoria">Alege categoria</option>
                </select>
                <input className="form-view__input" name="title" type="text" placeholder="Subiect"></input>
                <textarea className="form-view__textarea" name="description" placeholder="Descriere..."></textarea>
                <input type="hidden" name="lat" value={lat}></input>
                <input type="hidden" name="lng" value={lng}></input>
                <ImageUploader/>
                <button className="form-view__btn form-view__btn--submit">Submit</button>
            </div>
            <div 
                style={{display: inputsView ? 'none' : 'flex'}}
                className="form-view form-view--success"
                >
                <strong>Multumim pentru contributia ta!</strong>
            </div>
        </form>
    )

}