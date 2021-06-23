require("colors");
const inquirer = require("inquirer");

const clearConsole = require("./console");

// Lista de opciones y valores del menu principal
const menuOpts = [
	{
		type: "list",
		name: "opcion",
		message: "¿Que desea hacer?",
		pageSize: 10,
		choices: [
			{
				value: "1",
				name: `${"1".bold.green}. Crear una tarea`,
			},
			{
				value: "2",
				name: `${"2".bold.green}. Listar tarea`,
			},
			{
				value: "3",
				name: `${"3".bold.green}. Listar tareas completadas`,
			},
			{
				value: "4",
				name: `${"4".bold.green}. Listar tareas pendientes`,
			},
			{
				value: "5",
				name: `${"5".bold.green}. Completar tarea(s)`,
			},
			{
				value: "6",
				name: `${"6".bold.green}. Borrar tareas`,
			},
			{
				value: "0",
				name: `${"0".bold.green}. Salir\n`,
			},
		],
	},
];

// Retornar opcion del menu principal
const inquirerMenu = async () => {
	clearConsole();

	console.log("===============================".green);
	console.log("     Selecciona una opcion".white);
	console.log("===============================\n".green);

	const { opcion } = await inquirer.prompt(menuOpts);

	return opcion;
};

// Pausar la aplicacion
const pausa = async () => {
	console.log("\n");
	const question = [
		{
			type: "input",
			name: "input",
			message: `Presione ${"Enter".green} para continuar.`,
		},
	];
	return await inquirer.prompt(question);
};

// Mostrar un mensaje y retornar el input
const leerInput = async (message) => {
	const question = [
		{
			type: "input",
			name: "desc",
			message,
			validate(value) {
				if (value.length === 0) {
					return "Por favor ingrese un valor.";
				}
				return true;
			},
		},
	];

	const { desc } = await inquirer.prompt(question);
	return desc;
};

const listadoTareasBorrar = async (tareas = []) => {
	const choices = tareas.map((tarea, i) => {
		const idx = `${i + 1}`.green;

		return {
			value: tarea.id,
			name: `${idx}. ${tarea.desc}`,
		};
	});

	choices.unshift({ value: 0, name: `${"0".green} Cancelar` });

	const preguntas = [
		{
			type: "list",
			name: "id",
			message: "Borrar tarea",
			choices,
		},
	];
	const { id } = await inquirer.prompt(preguntas);
	return id;
};

const confirmar = async (message) => {
	const question = [
		{
			type: "confirm",
			name: "ok",
			message,
		},
	];

	const { ok } = await inquirer.prompt(question);
	return ok;
};

const mostrarListadoCheckList = async (tareas = []) => {
	const choices = tareas.map((tarea, i) => {
		const idx = `${i + 1}`.green;

		return {
			value: tarea.id,
			name: `${idx}. ${tarea.desc}`,
			checked: tarea.completadoEn ? true : false,
		};
	});

	const preguntas = [
		{
			type: "checkbox",
			name: "ids",
			message: "Seleccionar tareas a completar",
			choices,
		},
	];
	const { ids } = await inquirer.prompt(preguntas);
	return ids;
};

module.exports = {
	inquirerMenu,
	pausa,
	leerInput,
	listadoTareasBorrar,
	confirmar,
	mostrarListadoCheckList,
};
