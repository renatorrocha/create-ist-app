#!/usr/bin/env bun

import { Command } from "commander";
import inquirer from "inquirer";
import { promisify } from "node:util";
import { exec } from "node:child_process";

const execPromise = promisify(exec);
const program = new Command();

program
	.version("1.0.0")
	.description("CLI para clonar o projeto template")
	.option("-f, --front", "Frontend")
	.option("-b", "--back", "Backend")
	.action(async (options) => {
		const { repoChoice } = await inquirer.prompt([
			{
				type: "list",
				name: "repoChoice",
				message: "Escolha um repositório para clonar:",
				choices: ["front", "back"],
			},
		]);

		const { projectName } = await inquirer.prompt([
			{
				type: "input",
				name: "projectName",
				message: "Digite o nome do projeto:",
				validate: (input) =>
					input.length > 0 || "O nome do projeto não pode estar vazio.",
			},
		]);

		let repoUrl = "";

		if (repoChoice === "front") {
			repoUrl = "https://github.com/seu_usuario/repo-front.git";
		} else if (repoChoice === "back") {
			repoUrl = "https://github.com/seu_usuario/repo-back.git";
		}

		try {
			console.log(
				`Clonando o repositório ${repoChoice} para ${projectName}...`,
			);
			await execPromise(`git clone ${repoUrl} ${projectName}`);

			console.log(
				`Repositório ${repoChoice} clonado com sucesso em ${projectName}!`,
			);
		} catch (error) {
			console.error("Erro ao clonar Repositório:", error);
		}
	});

program.parse(process.argv);
