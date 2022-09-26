import { readSpentFile, writeSpentFile } from "./fs";
import { Command } from "commander";
import chalk from "chalk";
import { argv } from "process";
import prompt from "prompts";

//En este desafío vamos a crear una aplicación CLI para guardar nuestros gastos en un archivo JSON.

export const DB_SPENTS = "spents.json";

interface ISpent {
  type: string;
  amount: number;
}

class Spent {
  static last = 1;
  ID: number;
  type: string;
  amount: number;

  constructor({ type, amount }: ISpent) {
    this.ID = Spent.last;
    this.type = type;
    this.amount = amount;
    Spent.last++;
  }
}
const getSpents = async () => {
  const spents = await readSpentFile();
  return JSON.parse(spents);
};

console.log(getSpents);

const createSpent = async (spent: Spent) => {
  const spents = await getSpents();

  spents.push(spent);
  await writeSpentFile(spent);
  return spent;
};

const getSpent = async (ID: number) => {
  const spents = await getSpents();
  return spents.find((spent: Spent) => spents.id === ID);
};

const deleteSpent = async (ID: number) => {
  const spents = await getSpents();
  return spents.filter((spent: Spent) => spent.ID !== ID);
};

const mycli = new Command();

mycli
  .name("myspentapp")
  .description("CLI 4 SPENTS ADMINISTRATION")
  .version("1.0.0");

mycli
  .command("Spent")
  .description("first command")
  .action(() => {
    console.log(chalk.red("Bienvenido a spent app"));
  });

mycli
  .command("Spents")
  .description("Adminstracion de Spent via CLI")
  .action(async () => {
    const { action } = await prompt({
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
        const { type } = await prompt({
          type: "text",
          name: "type",
          message: "Ingresa el tipo de gasto",
        });
        const { amount } = await prompt({
          type: "text",
          name: "amount",
          message: "Ingresa el gasto en pesos",
        });

        await createSpent(
          new Spent({
            type,
            amount,
          })
        );
        return console.log(chalk.bgGreen("Gasto creado!"));
    }
  });

mycli.parse(argv);
