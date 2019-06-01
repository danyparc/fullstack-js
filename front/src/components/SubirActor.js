import React, { Component } from 'react';
import axios from 'axios';
import API_URL from '../constants'
class SubirActor extends Component {
	constructor(props) {
		super(props);
		this.state = {}		
	}

	guardar = (e) => {
		e.preventDefault();
		console.log('Guardando...');
		axios.post(API_URL+'actores', this.state)
			.then(actor=>{
				alert('Actor creado');
				console.log(actor);
			}).catch(err=>{
				alert('Algo salió mal!');
				console.log(err);
			})
	}

	cambio = (event) => {
		// const id = event.target.id;
		// const value = event.target.value;
		const { id, value } = event.target;

		if(id==='premios'){
			this.setState({ [id]: value.split(',') })			
		}else{
			this.setState({ [id]: value })
		}
		console.log(this.state);
	}


	render() {
		return (
			<container className="container">
				<h1>Registrar un nuevo actor</h1>
				<div className="row justify-content-md-center">
					<div className="col-md-auto">
						<form onSubmit={this.guardar}>
							<div className="form-group">
								<label htmlFor="name">Nombre</label>
								<input type="text" onChange={this.cambio} className="form-control" id="name" placeholder="John Doe" />
							</div>
							<div className="form-group">
								<label htmlFor="experiencia">Experiencia</label>
								<input type="number" onChange={this.cambio} className="form-control" id="experiencia" placeholder="cuantos años tiene en el medio?" />
							</div>
							<div className="form-group">
								<label htmlFor="premios">Premios</label>
								<input type="text" onChange={this.cambio} className="form-control" id="premios" placeholder="Oscar, Goya, Cannes" />
								<small id="premios" className="form-text text-muted">Ingrese premios separados por comas</small>

							</div>
							<div className="form-group">
								<label htmlFor="nacionalidad">Nacionalidad</label>
								<input type="text" onChange={this.cambio} className="form-control" id="nacionalidad" placeholder="ingrese nacionalidad" />
							</div>
							<div className="form-group">
								<label htmlFor="debut">debut</label>
								<input type="date" onChange={this.cambio} className="form-control" id="debut" placeholder="MM/DD/YYYY" />
							</div>

							<button type="submit" className="btn btn-primary">Guardar</button>
						</form>
					</div>
				</div>
			</container>
		);
	}
}

export default SubirActor;