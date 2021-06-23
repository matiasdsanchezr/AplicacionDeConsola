require("colors");

const Tarea = require("./models/tarea");
const Tareas = require("./models/tareas");
const clearConsole = require("./helpers/console");
const { guardarDB, cargarDB } = require("./helpers/AdministrarArchivos");
const {
	inquirerMenu,
	pausa,
	leerInput,
	listadoTareasBorrar,
	confirmar,
	mostrarListadoCheckList,
} = require("./helpers/inquirer");

const main = async () => {
	clearConsole();

	let opt = "";
	let tareas = new Tareas();

	tareas.crearTareasFromDB(cargarDB());

	do {
		// Mostrar el menu principal y retornar opcion seleccionada
		opt = await inquirerMenu();
		switch (opt) {
			case "1":
				// Crear tarea
				const desc = await leerInput("Descripcion: ");
				tareas.crearTarea(desc);
				break;
			case "2":
				// Listar tareas
				console.log(tareas.listadoCompleto());
				break;
			case "3":
				// Listar tareas completadas
				console.log(tareas.listarPendientesCompletadas(true));
				break;
			case "4":
				// Listar tareas pendientes
				console.log(tareas.listarPendientesCompletadas(false));
				break;
			case "5":
				// Marcar tareas para completar
				const ids = await mostrarListadoCheckList(tareas.listadoArr);
				tareas.toggleCompletadas(ids);
				break;
			case "6":
				// Borrar tareas
				const id = await listadoTareasBorrar(tareas.listadoArr);
				if (id === 0) continue;
				const ok = await confirmar("¿Estas seguro?");
				if (ok) {
					tareas.borrarTarea(id);
					console.log("\nTarea borrada.");
				}
				break;
		}

		guardarDB(tareas.listadoArr);
		if (opt != 0) await pausa();
		clearConsole();
	} while (opt != "0");

	clearConsole();
};

main();
