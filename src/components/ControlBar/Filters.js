import React from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as Icons from '@fortawesome/free-solid-svg-icons';

//https://github.com/FortAwesome/react-fontawesome

const Filters = ({ filters, onSelect }) => {
    const iconList = Object
        .keys(Icons)
        .filter(key => key !== "fas" && key !== "prefix" )
        .map(icon => Icons[icon])

    library.add(...iconList);

    const filterElemens = Object.keys(filters).map(filter => {
        const { options, placeholder, tabs } = filters[filter];
        return (
            tabs ?
            <div key={filter} className="ControlBar__tabs">
                {
                    options.map(option => {
                        const ref = React.createRef();
                        const centerElement = () => {
                            ref.current.scrollIntoView({
                                behavior: 'smooth',
                                block: 'start',
                                inline: 'center'
                            });
                        }
                        const { value, icon } = option;
                        return (
                            <div 
                                key={value} 
                                ref={ref}
                                className={`ControlBar__tab ${filters[filter].active === value ? 'active' : ''}`}
                                onClick={() => {
                                    onSelect(option, filter);
                                    centerElement();
                                }}
                                >
                                {icon && <FontAwesomeIcon  icon={icon} />}
                                <span>{value}</span>
                            </div>
                        )
                    })
                }
            </div>
            :
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