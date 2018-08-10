import { Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import React, { Component } from 'react';
import PropTypes from "prop-types";
import MapStyleOptions from './MapStyleOptions.json';
import * as fourSquareAPI from './APIs/fourSquareAPI.js';

/**
*Map Container is google maps and uses the google-maps-react library
*/
class Mapcontainer extends Component {

  state = {
    bounds: {},
    infoWindowVisible: false,
    likes: '',
    photo: '',
    activeMarker: {}
  }
  //Used to open the infoWindow and load information from square space
  onMarkerClick = (markerProperties, markerReference) =>{
    this.setState({
      activeMarker: markerReference,
      infoWindowVisible: true,
      likes: 'Loading likes',
      photo: 'Loading photo'
    });
    this.getFourSquareInfo(markerProperties.position.lat, markerProperties.position.lng,markerProperties.title)
  }
  //Get information via squarespace API
  getFourSquareInfo = (lat,lng,name) => {
    return fourSquareAPI.getSearchResult(lat, lng, name).then(venueId => {
        fourSquareAPI.getDetails(venueId).then(response => {
            if(response === 'error' || response.meta.code !== 200)
              this.setState({
                likes: 'Error loading content',
                photo: 'error'
              });
            else{
              if('likes' in response.response.venue)
                this.setState({likes: response.response.venue.likes.summary});
              else
                this.setState({likes: 'Error loading content'});
              if('bestPhoto' in response.response.venue)
               this.setState({photo: response.response.venue.bestPhoto.prefix+'150'+response.response.venue.bestPhoto.suffix});
              else
                this.setState({photo:'error'});
            }
          })
        })
      }



  //When used sets google maps to display all markers within the google maps container
  setBounds = () => {
    let bounds = new this.props.google.maps.LatLngBounds();
    for (let i = 0; i < this.props.placesToDisplay.length; i++)
        bounds.extend(this.props.placesToDisplay[i].location);
    this.setState({bounds})
  }

  //Set the bounds upon mounting component
  componentDidMount(){
   this.setBounds();
  }

  getSnapshotBeforeUpdate(){
  //If a place on the side list is selected placeSelected its corresponding marker will open
    if(this.props.placeSelected !== ''){
      this.setState({
        activeMarker:this.refs[this.props.placeSelected].marker,
         infoWindowVisible: true,
         likes:'Loading likes',
         photo:'Loading photo'
      });
      this.getFourSquareInfo(
        this.refs[this.props.placeSelected].props.position.lat,
        this.refs[this.props.placeSelected].props.position.lng,
        this.refs[this.props.placeSelected].props.title
      )
      this.props.selectPlace('')
    }
    return null;
  }

  componentDidUpdate(){
    return null;
  }

render(){
    return (
      <Map
        google={this.props.google}
        bounds={this.state.bounds}
        styles={MapStyleOptions}//load from json file.
        onClick={() => {this.setState({activeMarker: {},infoWindowVisible: false})}}
        ref={'map'}
        style={{width:this.props.mapWidth}}
        center={this.state.centre}
      >
        {this.props.placesToDisplay.map((markerInfo, index) =>
          <Marker
              ref={markerInfo.title}
              position={{lat: markerInfo.location.lat, lng: markerInfo.location.lng}}
              key={index}
              title={markerInfo.title}
              onClick={this.onMarkerClick}
              onMouseout={this.mouseMoveOutOfMarker}
              animation={this.state.activeMarker.title === markerInfo.title ? this.props.google.maps.Animation.BOUNCE : null  }
              icon={{ url: 'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|f01cbc|40|_|%E2%80%A2', scaledSize: new this.props.google.maps.Size(30, 45)}}
           />
        )}
        <InfoWindow
          marker={this.state.activeMarker}
          onClose={() => this.setState({activeMarker: {}, infoWindowVisible: false})}
          visible={this.state.infoWindowVisible} >
            <div
              className="info-window-content"
              aria-label={`InfoWindow on ${this.state.activeMarker.title}`}
             >
              <h2 tabIndex="0" style={{textAlign:'center'}}>
               {this.state.activeMarker.title}
              </h2>
              {this.state.photo ==='Loading photo' ?
                <h3  tabIndex="0" style={{textAlign:'center'}}>Loading photo</h3> :
                this.state.photo ==='error' ?
                <h3  tabIndex="0" style={{textAlign:'center'}}>Photo could not load</h3> :
                <div style={{textAlign:'center'}}>
                  <img  tabIndex="0"   src={this.state.photo}   alt={this.state.activeMarker.title + ' photo'}/>
                </div>}
              <h3 tabIndex="0"  style={{textAlign:'center'}}>{this.state.likes}</h3>
            </div>
        </InfoWindow>
      </Map>
    );
  }
}



//Google API key required to use google maps.
export default  GoogleApiWrapper({
  apiKey:'AIzaSyD-aXEGn4GJvKwwhS6S9YpcjSfOCbDSxc0'
})(Mapcontainer)


Mapcontainer.propTypes = {
  placesToDisplay: PropTypes.array.isRequired,
  placeSelected: PropTypes.string.isRequired,
  selectPlace: PropTypes.func.isRequired
}
