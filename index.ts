#!/usr/bin/env bun

import { Command } from "commander";
import inquirer from "inquirer";

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

		console.log(repoChoice);
		console.log(projectName);
	});

program.parse(process.argv);
