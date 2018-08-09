/*Hamburger Menu Component*/
import React from 'react';
import PropTypes from "prop-types";
import './HamburgerMenu.css';


function Hamburger(props) {
	return(
		<div id={"burgerContainer"}>
			<button className={props.hamburgerClassName} tabIndex='2' type={"button"}  aria-label={props.hamburgerArialabel} >
				<span className={"hamburger-box"}  onClick={props.hamburgerToggle} onKeyPress ={props.hamburgerToggle}>
		  			<span className={"hamburger-inner"}> </span>
				</span>
			</button>
		</div>
	);
}

Hamburger.propTypes = {
  hamburgerArialabel: PropTypes.string.isRequired,
  hamburgerClassName: PropTypes.string.isRequired,
  hamburgerToggle: PropTypes.func.isRequired
}

export default Hamburger;

