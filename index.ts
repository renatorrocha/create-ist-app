#!/usr/bin/env node

import { Command } from "commander";
import inquirer from "inquirer";
import { promisify } from "node:util";
import { exec } from "node:child_process";

const execPromise = promisify(exec);
const program = new Command();

program
	.version("1.0.0")
	.description("CLI para clonar projetos template do ISTEO.")
	.option("-f, --front", "Frontend")
	.option("-b", "--back", "Backend")
	.action(async (options) => {
		// todo: adicionar um texto de introdução com o chalk

		const { repoChoice } = await inquirer.prompt([
			{
				type: "list",
				name: "repoChoice",
				message: "Escolha o tipo do repositório:",
				choices: ["frontend", "backend"],
			},
		]);

		const { projectInitials } = await inquirer.prompt([
			{
				type: "input",
				name: "projectInitials",
				message: "Digite a sigla do projeto:",
				validate: (input) =>
					input.length > 0 || "A sigla do projeto não pode estar vazia.",
			},
		]);

		const { sgtNumber } = await inquirer.prompt([
			{
				type: "input",
				name: "sgtNumber",
				message: "Digite o número do SGT:",
				validate: (input) =>
					/^[0-9]+$/.test(input) ||
					"O número do SGT deve conter apenas dígitos.",
			},
		]);

		const projectName = `${projectInitials}-${sgtNumber}-${repoChoice}`;

		let repoUrl = "";

		if (repoChoice === "frontend") {
			repoUrl = "https://github.com/renatorrocha/vite-tanstack-tailwind.git";
		} else if (repoChoice === "backend") {
			repoUrl = "repo-back.git";
		}

		try {
			console.log(
				`Clonando o repositório ${repoChoice} para ${projectName}...`,
			);
			await execPromise(`git clone ${repoUrl} ${projectName}`);

			await execPromise(`rm -rf ${projectName}/.git`);

			console.log(
				`Repositório ${repoChoice} clonado com sucesso em ${projectName}!`,
			);
		} catch (error) {
			console.error("Erro ao clonar Repositório:", error);
		}
	});

program.parse(process.argv);
