const express = require("express");

let publications = [];

const server = express();
const JsonErr = {error: "No se recibieron los parámetros necesarios para crear la publicación"};

server.use(express.json());

server.post('/posts', function (req, res) {
	var obj = req.body;
//	console.log(req);
	if (   (!obj.hasOwnProperty('author'))
		|| (!obj.hasOwnProperty('title'))
		|| (!obj.hasOwnProperty('contents'))
		) {	res.status(400);
			return res.end( JSON.stringify(JsonErr));
			};
	miObj = {
		id: obj.id,
		author: obj.author,
		title: obj.title,
		contents: obj.contents
		};
	publications.push(miObj);
	res.send(JSON.stringify(miObj));
});

//NO MODIFICAR EL CODIGO DE ABAJO. SE USA PARA EXPORTAR EL SERVIDOR Y CORRER LOS TESTS
module.exports = { publications, server };
