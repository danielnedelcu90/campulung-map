import React from 'react';
import Filters from './Filters';
import ViewControl from './ViewControl';

const ControlBar = ({ filters, onSelect }) => {
    return (
        <section className="ControlBar">
            <div className="ControlBar__filters">
                <Filters filters={filters} onSelect={onSelect} />
            </div>
            <div className="ControlBar__viewControl">
                <ViewControl/>
            </div>
        </section>
    )
}

export default ControlBar;