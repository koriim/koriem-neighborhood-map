import React, { Component } from 'react';
import PropTypes from "prop-types";
import Mapcontainer from'./Mapcontainer.js';
import Hamburger from'./HamburgerMenu.js';

import './css/Sidebarwithmap.css';
import './css/Inputtextbox.css';
/**
*Component that fits all UI's together, including side bar and google map.
**/
class Sidebarwithmap extends Component {

	state = {
		sideNavStyle: '0',
		hamburgerClassName: 'hamburger hamburger--minus js-hamburger',
		placesToDisplay: [],
		query: '',
		listItemSelected: '',
		hamburgerArialabel: 'Hamburger Menu closed. Click to Open',
		inputTabIndex: -12,

	}

	//Toggles hamburger menu item between open and close
	hamburgerToggle = () => {
		if(this.state.hamburgerClassName === 'hamburger hamburger--minus js-hamburger')
			this.setState({
				sideNavStyle: '270px',
				hamburgerClassName: 'hamburger hamburger--minus is-active',
				hamburgerArialabel: 'Hamburger Menu open. Click to Close',
				inputTabIndex: 3
			})
		else
			this.setState({
				sideNavStyle: '0',
				hamburgerClassName: 'hamburger hamburger--minus js-hamburger',
				hamburgerArialabel: 'Hamburger Menu closed. Click to Open',
				inputTabIndex: -12
			})
	}
	//Query what is written in the search bar and reset listitemselected to nothing
	handleQueryEvent = (query) => {
		this.setState({query: query, listItemSelected: ''})
		//Search the query in the search bar
		this.search(query);
	}

	//Method called from handleQueryEvent.
	search = (thisQuery) => {
		if(thisQuery.length === 0)
			//Do not filter any results if there is no query. Display all places on maps.
			this.setState({placesToDisplay: this.props.activeMarkers});
		else
			//Filters query on the list items and maps places.
			this.setState({placesToDisplay:
				this.props.activeMarkers.filter(p => p.title.toLowerCase().includes(thisQuery.trim().toLowerCase()))})
	}

	//Set the places to display to all places as none have been filtered yet
	componentWillMount() {
		this.setState({placesToDisplay: this.props.activeMarkers})
	}

	onclickOrTouch=() => {
		this.setState({
			sideNavStyle:'0',
			 hamburgerClassName:'hamburger hamburger--minus js-hamburger',
			 hamburgerArialabel:'Hamburger Menu closed. Click to Open',
			 inputTabIndex:-12
		})
	}
	render() {
		return(
			<div>
				<div
					id={'mySidenav'}
					className={'sidenav'}
					style={{width:this.state.sideNavStyle}}
				>
					<label className="inp" tabIndex={this.state.inputTabIndex}>
						<input
							type="text"
							id="inp"
							placeholder="&nbsp;"
							onChange={event => this.handleQueryEvent(event.target.value)}
							value={this.state.query}
							aria-label='Filter places search bar'
							tabIndex={this.state.inputTabIndex}
							className='searchbar'
						/>
						<span className="label">Search...</span>
					  	<svg width="120px" height="26px" viewBox="0 0 120 26">
					    	<path d="M0,25 C21,25 46,25 74,25 C102,25 118,25 120,25"></path>
					  	</svg>
					  <span className="border"></span>
					</label>
					{this.state.placesToDisplay.map((place, index) => (
						<div
							className='placediv'
							tabIndex={this.state.inputTabIndex+index}
							key={index}
							onClick={() => this.setState({listItemSelected: place.title})}
						>
							<a>{place.title}</a>
						</div>
					))}
					<img src="http://icons.iconarchive.com/icons/designbolts/vector-foursquare/128/Foursquare-4-icon.png"
					className="sidelogo"
				 	alt="logo"/>
				</div>
				<div
					id='main'
					style={{marginLeft: '0'}}
					tabIndex='-1'
				>
					<div className={'top-section'} tabIndex='-1'>
						<Hamburger
							hamburgerArialabel={this.state.hamburgerArialabel}
							hamburgerClassName={this.state.hamburgerClassName}
							hamburgerToggle = {this.hamburgerToggle}
						/>
						<h1 className={'mainheading'} tabIndex='1'>MOUNTAINS MAP</h1>
					</div>
					<div
						className={'map-area'}
						onClick={this.onclickOrTouch}
						onTouchMove={this.onclickOrTouch}
						role='application'
						aria-label='Google Maps Internal Window'
						tabIndex='9'
					>
						<Mapcontainer
							tabIndex='10'
							placesToDisplay={this.state.placesToDisplay}
							placeSelected={this.state.listItemSelected}
							selectPlace={(place) => {this.setState({listItemSelected: place})}}
						/>
					</div>
				</div>
			</div>
		)
	}
}

Sidebarwithmap.propTypes = {
  activeMarkers: PropTypes.array.isRequired,
}

export default Sidebarwithmap;
