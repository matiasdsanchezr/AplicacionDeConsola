require("colors");

exports.mostrarMenu = async () => {
	return new Promise((resolve, reject) => {
		console.clear();
		console.log("===============================".green);
		console.log("     Seleccion una opcion".green);
		console.log("===============================\n".green);

		console.log("1. Crear una tarea");
		console.log("2. Listar tareas");
		console.log("3. Listar tareas completadas");
		console.log("4. Listar tareas pendientes.");
		console.log("5. Completar tarea(s)");
		console.log("6. Borrar tareas");
		console.log("0. Salir\n");

		const readline = require("readline").createInterface({
			input: process.stdin,
			output: process.stdout,
		});

		readline.question("Seleccione una opcion: ", (opt) => {
			readline.close();
			resolve(opt);
		});
	});
};

exports.pausa = async () => {
	return new Promise((resolve) => {
		const readline = require("readline").createInterface({
			input: process.stdin,
			output: process.stdout,
		});

		readline.question("Presione una tecla para continuar.", (opt) => {
			readline.close();
			resolve();
		});
	});
};
