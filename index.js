const express = require('express');
const app = express();         
const bodyParser = require('body-parser');
const port = 3000; 
const mysql = require('mysql');
const multer = require('multer');
const path = require('path');
const moment = require('moment');


const storage = multer.diskStorage({
	destination: function(req, file, cb) {
		cb(null, 'public/uploads/');
	},
	filename: function(req, file, cb) {
		cb(null, file.fieldname + '-' +  Date.now() + ".jpg");
	}
})


const connection = mysql.createConnection({
		host: 'spicytracking.com.br',
		user: 'spicytra_admin_c',
		password: 'catersinho2018',
		database: 'spicytra_catersinho'
	});

const upload = multer({storage});


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(express.static('public'));


app.get('/projetos', (req, res) =>{
    execSQLQuery('SELECT * FROM projetos', res);
});

app.get('/projetos/:id', (req, res) => {
	let id = req.params.id;
	execSQLQuery(`SELECT *, SUM(d.valor) AS valor FROM doacoes d RIGHT JOIN projetos p ON d.projeto_id = p.id  WHERE p.id = ${id} GROUP BY p.titulo`, res);
});

app.get('/doar/:id', (req, res) => {
	let id = req.params.id;
	execSQLQuery(`SELECT p.id, p.titulo, SUM(d.valor) AS valor FROM doacoes d RIGHT JOIN projetos p ON d.projeto_id = p.id  WHERE p.id = ${id} GROUP BY p.titulo`, res);
});

app.post('/doar/nova', (req, res) => {
	const projeto_id = req.body.id,
		  valor = req.body.valor;

	connection.query(`INSERT INTO doacoes (valor, projeto_id) VALUES (${valor}, ${projeto_id})`, (error, results, fiedls) => {
		error
		  ? res.json(error)
		  : res.redirect(`/projeto/${projeto_id}`)
	});
});


app.post('/file/upload', upload.single('file'), (req, res) => {
	const titulo = req.body.titulo;
	const descricao = req.body.descricao;
	const imagem = `uploads/${req.file.filename}`;
	const data = moment().format('DD-MM-YYYY');
	const prazo = `${new Date().getDate() + 2}-0${new Date().getMonth() + 1}-${new Date().getFullYear()}`;
	connection.query(`INSERT INTO projetos(titulo, descricao, imagem, data, prazo) VALUES ('${titulo}', '${descricao}', '${imagem}', '${data}', '${prazo}')`, (error, results, fiedls) => {
		error
		  ? res.json(error)
		  : res.redirect(`/projeto/${results.insertId}`)
	});
});


app.post('/edit/project/', upload.single('file'), (req, res) => {
	const id = req.body.id;
	const titulo = req.body.titulo;
	const descricao = req.body.descricao;
	const imagem = !req.file ? req.body.imagem : `uploads/${req.file.filename}`
	connection.query(`UPDATE projetos SET titulo = '${titulo}', descricao = '${descricao}', imagem = '${imagem}' WHERE id = ${id}`, (error, results, fiedls) => {
		error
		  ? res.json(error)
		  : res.redirect(`/projeto/${id}`)
	});
});


function execSQLQuery(sqlQry, res) {
	const connection = mysql.createConnection({
		host: 'spicytracking.com.br',
		user: 'spicytra_admin_c',
		password: 'catersinho2018',
		database: 'spicytra_catersinho'
	});

	connection.query(sqlQry, function(error, results, fields) {
		error 
		  ? res.json(error) 
		  : res.json(results);

		connection.end();
	})
}


app.all('/*', function(req, res) {
    res.sendFile(path.resolve('public/index.html'));
 });

app.listen(port, () => console.log('Servidor rodando na porta 3000'));

