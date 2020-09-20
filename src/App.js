import React from 'react';
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import { loadData, saveData } from './components/GS';
import './App.css';

function App() {
  const entry = {
    active: 0,
    id: 'UUID',
    title: 'Title here',
    img: 'img source',
    coordinates: '[lat, long]',
    description: 'Lorem Ipsum'
  }

  //saveData(entry)

  const addMarkers = async () => {
    const rows = await loadData();
    const activemarkers = rows.filter(row => parseInt(row.active))

    console.log(activemarkers)
  }

  addMarkers();

  return (
    <Map center={[45.270340, 25.050310]} zoom={13}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
    </Map>
  );
}

export default App;
