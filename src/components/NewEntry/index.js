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

    saveData(entry)
}


export const NewEntryForm = props => {
    const [entryCategories, setCategories] = useState(0);
    const { lat, lng } = props.position;

    const getMarkerData = async () => {
        const rows = await loadData('categories');
        const categories = rows.map(row => {
            const { categories } = row;
            return categories
        })
        
        setCategories(categories);
    }

    useEffect(() => {getMarkerData()}, [])
    
    return (
        <form onSubmit={(e) => handleSubmit(e)}>
            <select name="category">
                { entryCategories && entryCategories.map((category, index) => {
                    return (
                        <option key={index} value={category}>{category}</option>
                        );
                    }) }
                <option value="Alege categoria">Alege categoria</option>
            </select>
            <input name="title" type="text" placeholder="Subiect"></input>
            <textarea name="description" placeholder="Descriere..."></textarea>
            <input type="hidden" name="lat" value={lat}></input>
            <input type="hidden" name="lng" value={lng}></input>
            <ImageUploader/>
            <button>Submit</button>
        </form>
    )

}