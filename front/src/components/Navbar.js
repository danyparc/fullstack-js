import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
class Navbar extends Component {
	constructor(props) {
		super(props);
		this.state = {}
	}
	render() {
		console.log(this.props.location);
		return (
				<nav className="navbar navbar-expand-lg navbar-light bg-light">
					<NavLink className="navbar-brand" to="/">Pelischidas</NavLink>
					<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
						<span className="navbar-toggler-icon"></span>
					</button>
					<div className="collapse navbar-collapse" id="navbarNavAltMarkup">
						<div className="navbar-nav">
							<NavLink className="nav-item nav-link" exact activeClassName="active" to="/">Home</NavLink>
							<NavLink className="nav-item nav-link" activeClassName="active" to="#">Actores</NavLink>
							<NavLink className="nav-item nav-link" activeClassName="active" to="/subir-actor">Subir Actor</NavLink>
							<NavLink className="nav-item nav-link" activeClassName="active" to="#">Directores</NavLink>
						</div>
					</div>
				</nav>
		);
	}
}
export default Navbar;