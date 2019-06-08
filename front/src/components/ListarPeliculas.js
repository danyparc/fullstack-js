import React, { Component } from 'react';
import axios from 'axios';
import API_URL from '../constants';

class ListarPeliculas extends Component {

	constructor(props) {
		super(props);
		this.state = {
			request: true, // Verdadero cuando la peticion se esta ejecutando
			peliculas: [],
			error: ''
		}
	}

	componentDidMount() {
		this.getPeliculas();
	}

	getPeliculas = () => {
		axios.get(API_URL + 'peliculas')
			.then(res => {
				console.log(res.data);
				// if (this._isMounted) 
					this.setState({ peliculas: res.data, request: false });
			}).catch(err => {
				// if (this._isMounted) 
					this.setState({ error: err, request: false });
			});
	}

	renderPelis = () => {
		if(this.state.error){
			return (
				<div>
					<p className="text-danger">Hubo un error</p>
					<p>{this.state.error}</p>
				</div>
			);
		}
		return this.state.peliculas.length ? this.state.peliculas.map(peli => {
			return (
				<div className="card" style={{width: "18rem"}} key={peli._id}>
					<img src={peli.portada_url} className="card-img-top" alt="..." />
					<div className="card-body">
						<h5 className="card-title">
						{peli.titulo}
						</h5>
						<p className="card-text">
							{peli.sinopsis}
						</p>
					</div>
				</div>
			);
		}) : <p> Aún no hay nada aquí </p>;
	}

	render() {
		return (
			<div className="row ml-5">
				{this.state.request ? <p>Cargando...</p> : this.renderPelis()}
			</div>
		);
	}

}

export default ListarPeliculas;