const fs = require("fs");
const path = require("path");

const dbPath = "./db";
const dbName = "database.json";

const guardarDB = (data) => {
	fs.writeFileSync(`${dbPath}/${dbName}`, JSON.stringify(data));
};

const cargarDB = () => {
	// Comprobar si la base de datos existe
	if (!fs.existsSync(`${dbPath}/${dbName}`)) {
		// Comprobar si el directorio existe
		if (!fs.existsSync(`${dbPath}`)) {
			//Crear el directorio si no existe
			fs.mkdir(dbPath, (err) => {
				if (err) return console.error(err);
			});
		}
		return null;
	}

	// Cargar la base de datos
	const json = fs.readFileSync(`${dbPath}/${dbName}`, { encoding: "utf8" });
	const data = JSON.parse(json);
	return data;
};

module.exports = { guardarDB, cargarDB };
