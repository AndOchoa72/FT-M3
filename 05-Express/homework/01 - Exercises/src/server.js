const express = require("express");

let publications = [];

const server = express();

server.use(express.json());

const JsonErr1 = {error: "No se recibieron los parámetros necesarios para crear la publicación"};
const JsonErr2 = {error: "No existe ninguna publicación con dicho título y autor indicado"};
let id = 1;

server.post('/posts', function (req, res) {
	const p = req.body;
//	console.log(p);
	if (p.author && p.title && p.contents) {
//		console.log('p.ok.');
		const publication = {
			author: p.author,
			title: p.title,
			contents: p.contents,
			id: id++
		}
//		console.log(publication);
		publications.push(publication);
		return res.status(200).json(publication);
	} else {
//		console.log('p.mal.');
		return res.status(400).json(JsonErr1);
		};
});

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

//NO MODIFICAR EL CODIGO DE ABAJO. SE USA PARA EXPORTAR EL SERVIDOR Y CORRER LOS TESTS
module.exports = { publications, server };
