const express = require("express");

const publications = [];

const server = express();

server.use(express.json());

const JsonErr1 = {error: "No se recibieron los parámetros necesarios para crear la publicación"};
const JsonErr2 = {error: "No existe ninguna publicación con dicho título y autor indicado"};
const JsonErr3 = {error: "No existe ningun post del autor indicado"};
const JsonErr43 = {error: "No se recibieron los parámetros necesarios para modificar la publicación"};
const JsonErr44 = {error: "No se recibió el id correcto necesario para modificar la publicación"};
const JsonErr51 = {error: "No se recibió el id de la publicación a eliminar"};
const JsonSuc52 = {success: true };
const JsonErr53 = {error: "No se recibió el id correcto necesario para eliminar la publicación"};

let id = 1;

// Ejercicio 1
server.post('/posts', function (req, res) {
	const p = req.body;
	console.log(p);
	if (p.author && p.title && p.contents) {
//		console.log('p.ok.');
		const publication = {
			author: p.author,
			title: p.title,
			contents: p.contents,
			id: id++
		}
		console.log(publication);
		publications.push(publication);
		return res.status(200).json(publication);
	} else {
//gt		console.log('p.mal.');
		return res.status(400).json(JsonErr1);
		};
});

// Ejercicio 2
server.get('/posts', function (req, res) {
	const {reqAuthor, reqTitle} = req.query;
	if(reqAuthor && reqTitle) {
		filtPub = publications.filter(
			pub => pub.author === reqAuthor
				&& pub.title === reqTitle);
		if (filtPub.length) {
			res.status(200);
			return res.json(filtPub);
		} else {
			return res.status(400).json(JsonErr2);
		}
 	} else {
 		return res.status(400).json(JsonErr2);
 	}
});

// Ejercicio 3
server.get('/posts/:author', function (req, res) {
	miauthor = req.params.author;
	if (miauthor && (miauthor !== '')) {
//		console.log('P:' + publications);
		filtPub = publications.filter(
			pub => pub.author === miauthor);
//		console.log('F:' + filtPub);
		if (filtPub.length) {
			res.status(200);
			return res.json(filtPub);
		} else {
			return res.status(400).json(JsonErr3);
		}
	}
});

// Ejercicio 4
server.put('/posts/:id', function (req, res) {
	const nrpi = Number(req.params.id);
//	console.log('nrpi:',nrpi);
	const idx = publications.findIndex(
		pub => {return (Number(pub.id) == nrpi)});
//	console.log('idx:',idx);
//	console.log(publications);
	if(idx >= 0) {
//		console.log('Index:',idx);
//		console.log(req.body);
		const {title, contents} = req.body;
//		console.log('Ti:',title);
//		console.log('Cn:',contents);
		if(title && contents) {
//			console.log('aPub:',JSON.stringify(publications[idx]));
			publications[idx].title = title;
			publications[idx].contents = contents;
//			console.log('aPub:',JSON.stringify(publications[idx]));
			return res.status(200).json(publications[idx]);
			} else {
			return res.status(400).json(JsonErr43);
		}
	} else {
		return res.status(400).json(JsonErr44)
	}
});

// Ejercicio 5
server.delete('/posts/:id', function (req, res) {
	const nrpi = Number(req.params.id);
//	console.log('nrpi:',nrpi);
	if (!nrpi) {return res.status(400).json(JsonErr51)};

	const idx = publications.findIndex(
		pub => {return (Number(pub.id) == nrpi)});
//	console.log(publications);
//	console.log('idx:',idx);
	if(idx >= 0) {
//		console.log('Index:',idx);
		publications.splice(idx, 1);
//		console.log(publications);
		return res.status(200).json(JsonSuc52);
	} else {
		return res.status(400).json(JsonErr53)
	}
});

//NO MODIFICAR EL CODIGO DE ABAJO. SE USA PARA EXPORTAR EL SERVIDOR Y CORRER LOS TESTS
module.exports = { publications, server };
