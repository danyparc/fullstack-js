const express = require('express');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const Ctrl = require('./controllers/index');
const { Pelicula } = require('./models/Pelicula');
const { Director } = require('./models/Director');
const { Actor } = require('./models/Actor');
const app = express();

app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

//Obteniendo 
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const PORT = process.env.PORT || 3000;


const URL_MONGO = `mongodb+srv://${DB_USER}:${DB_PASS}@cluster0-ijbr8.mongodb.net/test?retryWrites=true`;

console.log(URL_MONGO);


mongoose.connect(URL_MONGO, { useNewUrlParser: true }, (err) => {
	if (err) {
		console.log('Hubo un error', err);
	} else {
		console.log('Conexión exitosa');
	}
});

app.get('/peliculas', (req, res) => {
	Ctrl.pelicula.mostrarPeliculas()
		.then(peliculas => {
			if (!peliculas) {
				console.log('No hay peliculas');
				res.send({ mensaje: 'No hay peliculas' });
			} else {
				console.log('Peliculas: ', peliculas);
				res.send(peliculas).status(200);
			}
		}).catch(err => {
			console.log('Error: ', err)
			res.status(500).send({ mensaje: 'Algo salio mal' });
		})
});

//PARAMS
app.get('/peliculas/:id', (req, res) => {
	Ctrl.pelicula.mostrarPeliculas(req.params.id)
		.then(peli => peli ? res.send(peli) : res.send({}).status(400))
		.catch(err => res.send(err).status(400));
})

app.post('/peliculas', (req, res) => {
	const objPelicula = req.body;
	// Primero debemos ver si existe director:
	if (!objPelicula.directores) {
		res.send('Ingresar director valido').status(406)
		return;
	}
	// Pendiente
	subirDirectores(objPelicula.directores, res).then(dirs => {
		objPelicula.directores = dirs;
		console.log("\n\n***PELI****", objPelicula, "\n\n");
		const nuevaPeli = Pelicula(objPelicula);
		nuevaPeli.save((err, peli) => {
			err ? res.send(err).status(400)
				: res.send(peli).status(201);
		});
	});
});

async function subirDirectores(directores) {
	//Arreglo de ids de directores
	let arrdirs = [];
	for (let i = 0; i < directores.length; i++) {
		arrdirs.push(await new Promise(resolve => {
			// Guardando cada director
			Director(directores[i]).save((err, director) => {
				err ? reject() : resolve(director._id);
			})

		}));
	}
	return arrdirs;
}

//ACTORES
app.get('/actores', (req, res) => {
	console.log(req.query)
	if (!req.query.name) {
		Actor.find().exec((err, actores) => {
			err ? res.status(400).send(err) : res.send(actores);
		})
	} else{
		Actor.fuzzySearch(req.query.name, (err, actores) => {
			err ? res.status(400).send(err) : res.send(actores);
		})
	}
})
app.get('/actores/:id', (req, res) => {
	Ctrl.actor.mostrarActores(req.params.id)
		.then(actores => actores ? res.send(actores) : res.send({}).status(400))
		.catch(err => res.send(err).status(400));
})
app.post('/actores', (req, res) => {
	Actor(req.body).save((err, actor) => {
		err ? res.status(400).send({
			message: 'Checa tu petición dude!',
			errorMongo: err
		}) : res.status(201).send(actor);
	});
});
app.put('/actores/:id', (req, res) => {
	Actor.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, actor) => {
		err ? res.status(400).send(err) : res.status(200).send(actor);
	})
	// Actor.findOneAndUpdate({name: req.params.id}, req.body,{new: true},(err,actor)=>{
	//     err ? res.status(400).send(err) : res.status(200).send(actor);
	// })
});
app.delete('/actores/:id',(req, res)=>{
	Actor.findByIdAndDelete(req.params.id,(err, delres)=>{
		err ? res.status(400).send(err) : res.send(delres);
	})
})



//DIRECTORES
app.get('/directores', (req, res) => {
	Ctrl.director.mostrarDirectores()
		.then(directores => directores ? res.send(directores) : res.send({}).status(400))
		.catch(err => res.send(err).status(400));
})
app.get('/directores/:id', (req, res) => {
	Ctrl.director.mostrarDirectores(req.params.id)
		.then(directores => directores ? res.send(directores) : res.send({}).status(400))
		.catch(err => res.send(err).status(400));
})


app.listen(PORT, () => {
	console.log('App escuchando en el puerto ' + PORT);
})