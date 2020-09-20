import React, { useEffect, useState } from 'react';
import { Marker } from 'react-leaflet';
import { loadData } from '../GS';

export const NewMarker = props => {
    const initMarker = ref => {
        ref && ref.leafletElement.openPopup()
    }

    return <Marker ref={initMarker} {...props} />
}

export const NewEntryForm = props => {
    const [entryCategories, setCategories] = useState(0);

    const getMarkerData = async () => {
        const rows = await loadData('categories');
        const categories = rows.map(row => {
            const { categories } = row;
            return categories
            // 
        })
        
        setCategories(categories);
    }

    useEffect(() => {getMarkerData()}, [])

    console.log(entryCategories)
    
    return (
        <>
            <select name="category">
                { entryCategories && entryCategories.map((category, index) => {
                    return (
                        <option key={index} value={category}>{category}</option>
                        );
                    }) }
                <option value="Alege categoria">Alege categoria</option>
            </select>
            <input type="text" placeholder="Titlu"></input>
            <textarea placeholder="Descriere..."></textarea>
        </>
    )

}