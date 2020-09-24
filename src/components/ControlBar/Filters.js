import React from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

const Filters = ({ filters, onSelect }) => {
    const filterElemens = Object.keys(filters).map(filter => {
        const { options, placeholder } = filters[filter];
        return (
            <Dropdown 
                key={filter} 
                options={options} 
                onChange={({value}) => onSelect({value}, filter)} 
                placeholder={placeholder} 
                />
        )
    })

    return filterElemens;
}

export default Filters;