"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DB_SPENTS = void 0;
const fs_1 = require("./fs");
const commander_1 = require("commander");
const chalk_1 = __importDefault(require("chalk"));
const process_1 = require("process");
const prompts_1 = __importDefault(require("prompts"));
//En este desafío vamos a crear una aplicación CLI para guardar nuestros gastos en un archivo JSON.
exports.DB_SPENTS = "spents.json";
class Spent {
    constructor({ type, amount }) {
        this.ID = Spent.last;
        this.type = type;
        this.amount = amount;
        Spent.last++;
    }
}
Spent.last = 1;
const getSpents = () => __awaiter(void 0, void 0, void 0, function* () {
    const spents = yield (0, fs_1.readSpentFile)();
    return JSON.parse(spents);
});
console.log(getSpents);
const createSpent = (spent) => __awaiter(void 0, void 0, void 0, function* () {
    const spents = yield getSpents();
    spents.push(spent);
    yield (0, fs_1.writeSpentFile)(spent);
    return spent;
});
const getSpent = (ID) => __awaiter(void 0, void 0, void 0, function* () {
    const spents = yield getSpents();
    return spents.find((spent) => spents.id === ID);
});
const deleteSpent = (ID) => __awaiter(void 0, void 0, void 0, function* () {
    const spents = yield getSpents();
    return spents.filter((spent) => spent.ID !== ID);
});
const mycli = new commander_1.Command();
mycli
    .name("myspentapp")
    .description("CLI 4 SPENTS ADMINISTRATION")
    .version("1.0.0");
mycli
    .command("Spent")
    .description("first command")
    .action(() => {
    console.log(chalk_1.default.red("Bienvenido a spent app"));
});
mycli
    .command("Spents")
    .description("Adminstracion de Spent via CLI")
    .action(() => __awaiter(void 0, void 0, void 0, function* () {
    const { action } = yield (0, prompts_1.default)({
        type: "select",
        name: "action",
        message: "¿Como queres gestionar tus gastos?",
        choices: [
            {
                title: "Agregar gasto",
                value: "C",
            },
            {
                title: "Ver listado de gastos",
                value: "R",
            },
            {
                title: "Actualizar dato de gasto",
                value: "U",
            },
            {
                title: "Borrar gasto",
                value: "D",
            },
        ],
    });
    switch (action) {
        case "C":
            const { type } = yield (0, prompts_1.default)({
                type: "text",
                name: "type",
                message: "Ingresa el tipo de gasto",
            });
            const { amount } = yield (0, prompts_1.default)({
                type: "text",
                name: "amount",
                message: "Ingresa el gasto en pesos",
            });
            yield createSpent(new Spent({
                type,
                amount,
            }));
            return console.log(chalk_1.default.bgGreen("Gasto creado!"));
    }
}));
mycli.parse(process_1.argv);
