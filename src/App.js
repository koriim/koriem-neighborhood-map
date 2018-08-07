import React, { Component } from 'react';
import Sidebarwithmap from"./components/Sidebarwithmap.js";

import './App.css';

class App extends Component {

  state ={
    places: [
        {title: 'Giza Necropolis', location: {lat: 29.9772938, lng: 31.132376}},
        {title: 'Salah eldin Citadel', location: {lat: 30.0298808, lng: 31.2610021}},
        {title: 'Cairo Tower', location: {lat: 30.0458856, lng: 31.2241582}},
        {title: 'Cairo Opera House', location: {lat: 30.0424869, lng: 31.2243129}},
        {title: 'The Hanging Church', location: {lat: 30.0052951, lng: 31.2300362}},

    ]


  }

  render(){
    return(<Sidebarwithmap activeMarkers= {this.state.places}/>)
   }

}

export default App;