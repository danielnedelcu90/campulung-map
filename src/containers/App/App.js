import React, {Component} from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import { loadData } from '../../components/GS';
import Header from '../../components/Header';
import ControlBar from '../../components/ControlBar';
import { NewMarker, NewEntryForm } from '../../components/NewEntry';
import { filterTaskList } from '../../utilities/helper.js';
import './App.scss';

//TODO: https://www.npmjs.com/package/react-leaflet-markercluster

//https://blog.logrocket.com/how-to-use-react-leaflet/
class App extends Component {
  state = {
    markers: [],
    filters: {
      category: {
        active: null,
        placeholder: 'Selecteaza categoria',
        dynamicOptions: true,
        options: []
      },
      title: {
        active: null,
        placeholder: 'Selecteaza prioritatea',
        dynamicOptions: false,
        options: ['Low', 'High']
      }
    },
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

    this.setState({markers})

    this.setFilterOptions();
  }

  handleMapClick(e) {
    const newMarker = {
      coordinates: {
        lat: e.latlng.lat,
        lng: e.latlng.lng
      }
    }

    this.setState({newMarker: null});
    this.setState({newMarker});
  }

  setFilterOptions() {
    const { markers, filters } = this.state;

    const markerKeys = Object.keys(markers[0]);
    const filterKeys = Object.keys(filters);

    const activeFilters = markerKeys.filter(mk => filterKeys.includes(mk));

    activeFilters.forEach(filter => {
      const options = [
        ...new Set(
          markers.map(marker => marker[filter])
        )
      ]
      
      filters[filter].dynamicOptions && this.setState(prevState => {
        return {
          ...prevState,
          filters: {
            ...prevState.filters,
            [filter]: {
              ...prevState.filters[filter],
              options
            }
          }
        }
      })
    })
  }

  handleOnSelect({value}, filter) {
    this.setState(prevState => {
      return {
        ...prevState,
        filters: {
          ...prevState.filters,
          [filter]: {
            ...prevState.filters[filter],
            active: value
          }
        }
      }
    })
  }

  componentDidMount() {
    this.getMarkerData();
  }

  render() {
    const { markers, filters, newMarker } = this.state;
    const filteredMarkers = filterTaskList(markers, filters);

    return (
      <>
        <Header />
        <ControlBar filters={filters} onSelect={(value, filter) => this.handleOnSelect(value, filter)}/>
        <Map center={[45.270340, 25.050310]} zoom={14} minZoom={12} scrollWheelZoom={false} onClick={(e) => {
          this.handleMapClick(e)
        }}>
          { filteredMarkers.map(marker => (
            <Marker
              key={marker.id}
              riseOnHover={true}
              position={marker.coordinates}
            >
              <Popup>
                <div className="marker-view">
                  <span className="marker-view__category">{marker.category}</span>
                  <h3 className="marker-view__title">{marker.title}</h3>
                  <div className="marker-view__img">
                    <img src={marker.img} alt={marker.title} />
                  </div>
                  <p className="marker-view__description">{marker.description}</p>
                </div>
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
      </>
    );
  }
}

export default App;