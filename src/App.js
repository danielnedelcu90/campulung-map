import React, {Component} from 'react';
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import { loadData, saveData } from './components/GS';
import './App.css';

//https://blog.logrocket.com/how-to-use-react-leaflet/

class App extends Component {
  state = {
    markers: []
  }

  async getMarkerData() {
    const rows = await loadData();
    const markers = rows.filter(row => parseInt(row.active)).map(row => {
      const { active, id, title, img, lat, long, description } = row;
      return {
        active,
        id,
        title,
        img,
        coordinates: {
          lat,
          long
        },
        description
      };
    })

    this.setState({
      markers: markers
    })
  }

  handleMarkerClick(marker) {
    console.log(marker)
  }

  componentDidMount() {
    this.getMarkerData();
  }

  // const entry = {
  //   active: 0,
  //   id: 'UUID',
  //   title: 'Title here',
  //   img: 'img source',
  //   coordinates: {
  //     lat: 234,
  //     long: 45678
  //   },
  //   description: 'Lorem Ipsum'
  // }

  //saveData(entry)

  render() {
    const { markers } = this.state;
    return (
      <Map center={[45.270340, 25.050310]} zoom={13}>
        {markers.map(marker => (
          <Marker
            key={marker.id}
            position={[
              marker.coordinates.lat,
              marker.coordinates.long
            ]}
            // onClick={() => {
            //   this.handleMarkerClick(marker);
            // }}
          >
            <Popup>
              <h3>{marker.title}</h3>
              <img src={marker.img} alt={marker.title} />
              <p>{marker.description}</p>
            </Popup>
          </Marker>
        ))}

        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
      </Map>
    );
  }
}

export default App;
