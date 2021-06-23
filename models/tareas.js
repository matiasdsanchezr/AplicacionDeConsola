const {cargarDB} = require("../helpers/administrarArchivos")

const Tarea = require("./tarea");

class Tareas {
	_listado = {};
	constructor() {
		this._listado = {};
		const data = cargarDB();

		if(data)
			this.crearTareasFromDB(data);
	}

	get listadoArr() {
		const listado = [];
		Object.keys(this._listado).forEach((key) => listado.push(this._listado[key]));
		return listado;
	}

	borrarTarea(id = "") {
		if (this._listado[id]) {
			delete this._listado[id];
		}
	}

	crearTareasFromDB(tareas = []) {
		if (!tareas) return;

		tareas.forEach((tarea) => {
			this._listado[tarea.id] = tarea;
		});
	}

	crearTarea(desc = "") {
		const tarea = new Tarea(desc);
		this._listado[tarea.id] = tarea;
	}

	listadoCompleto() {
		let response = "\n";

		Object.keys(this._listado).forEach((id, i) => {
			const idx = `${i + 1}`.green;
			const { desc, completadoEn } = this._listado[id];
			const estado = completadoEn ? "Completada".green : "Pendiente".red;

			response += `${idx} ${desc} | ${estado}\n`;
		});

		return response;
	}

	listarPendientesCompletadas(completadas = true) {
		let response = "\n";
		let count = 1;

		Object.keys(this._listado).forEach((id) => {
			const idx = `${count}`.green;
			const { desc, completadoEn } = this._listado[id];

			if (completadoEn && completadas) {
				response += `${idx} ${desc} :: ${completadoEn.toString().green}\n`;
				count++;
			} else if (!completadoEn && !completadas) {
				response += `${idx} ${desc} :: ${"Pendiente".red}\n`;
				count++;
			}
		});

		return response;
	}

	toggleCompletadas(ids = []) {
		ids.forEach((id) => {
			const tarea = this._listado[id];
			if (!tarea.completadoEn) {
				tarea.completadoEn = new Date().toISOString();
			}
		});

		this.listadoArr.forEach((tarea) => {
			if (!ids.includes(tarea.id)) {
				this._listado[tarea.id].completadoEn = null;
			}
		});
	}
}

module.exports = Tareas;
