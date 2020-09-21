import React, {Component} from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import { loadData, saveData } from './components/GS';
import { NewMarker, NewEntryForm } from './components/NewEntry';
import './App.css';

//https://blog.logrocket.com/how-to-use-react-leaflet/
class App extends Component {
  state = {
    markers: [],
    newMarker: null,
    uploading: false,
    images: []
  }

  async getMarkerData() {
    const rows = await loadData('entries');
    const markers = rows.filter(row => parseInt(row.active)).map(row => {
      const { active, id, title, category, img, lat, lng, description } = row;
      return {
        active,
        id,
        title,
        category,
        img,
        coordinates: {
          lat,
          lng
        },
        description
      };
    })

    this.setState({
      markers: markers
    })
  }

  handleMapClick(e) {
    const newMarker = {
      coordinates: {
        lat: e.latlng.lat,
        lng: e.latlng.lng
      }
    }

    this.setState({newMarker});
    
  }

  componentDidMount() {
    this.getMarkerData();
  }

  render() {
    const { markers, newMarker } = this.state;
    return (
      <Map center={[45.270340, 25.050310]} zoom={13} onClick={(e) => {
        this.handleMapClick(e)
      }}>
        { markers.map(marker => (
          <Marker
            key={marker.id}
            position={marker.coordinates}
          >
            <Popup>
              <h3>{marker.title}</h3>
              <h4>{marker.category}</h4>
              <img src={marker.img} alt={marker.title} />
              <p>{marker.description}</p>
            </Popup>
          </Marker>
        )) }

        { newMarker && <NewMarker position={newMarker.coordinates}>
            <Popup position={newMarker.coordinates}>
              <NewEntryForm position={newMarker.coordinates}/>
            </Popup>
          </NewMarker> }

        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
      </Map>
    );
  }
}

export default App;