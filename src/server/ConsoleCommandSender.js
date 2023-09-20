/**
 * ░██████╗░██████╗░███████╗███████╗███╗░░██╗███████╗██████╗░░█████╗░░██████╗░
 * ██╔════╝░██╔══██╗██╔════╝██╔════╝████╗░██║██╔════╝██╔══██╗██╔══██╗██╔════╝░
 * ██║░░██╗░██████╔╝█████╗░░█████╗░░██╔██╗██║█████╗░░██████╔╝██║░░██║██║░░██╗░
 * ██║░░╚██╗██╔══██╗██╔══╝░░██╔══╝░░██║╚████║██╔══╝░░██╔══██╗██║░░██║██║░░╚██╗
 * ╚██████╔╝██║░░██║███████╗███████╗██║░╚███║██║░░░░░██║░░██║╚█████╔╝╚██████╔╝
 * ░╚═════╝░╚═╝░░╚═╝╚══════╝╚══════╝╚═╝░░╚══╝╚═╝░░░░░╚═╝░░╚═╝░╚════╝░░╚═════╝░
 *
 * The content of this file is licensed using the CC-BY-4.0 license
 * which requires you to agree to its terms if you wish to use or make any changes to it.
 *
 * @license CC-BY-4.0
 * @link Github - https://github.com/GreenFrogMCBE/GreenFrogMCBE
 * @link Discord - https://discord.gg/UFqrnAbqjP
 */
const readline = require("readline");

const CommandVerifier = require("../utils/CommandVerifier");
const Language = require("../utils/Language");
const Logger = require("../utils/Logger");

const CommandProcessException = require("../utils/exceptions/CommandHandlingException");

const CommandManager = require("./CommandManager");

const closed = false;

module.exports = {
	/**
	 * Returns true if the console is closed, false otherwise.
	 *
	 * @returns {boolean}
	 */
	closed,

	/**
	 * Checks if the string is empty
	 *
	 * @param {string} string - The string to check
	 * @returns {boolean} If the string is empty
	 */
	isEmpty(string) {
		return !string.trim();
	},

	/**
	 * Returns the string without the slash
	 *
	 * @param {string} string - The string that you want to remove slash from
	 * @returns {string} - The string without the / character
	 */
	removeSlash(string) {
		return string.replace("/", "");
	},

	/**
	 * Handles possible errors that can occur while executing a command
	 *
	 * @param {Error} error
	 * @param {string} command
	 */
	handleCommandError(error, command) {
		const Frog = require("../Frog");

		Frog.eventEmitter.emit("serverCommandProcessError", {
			command,
			error,
		});

		Logger.error(Language.getKey("commands.errors.internalError").replace("%s", error.stack));
	},

	/**
	 * Finds a command in `CommandManager.commands` and executes it
	 *
	 * @param {string} inputCommand
	 * @param {string[]} args
	 * @returns {boolean}
	 */
	findCommand(inputCommand, args) {
		const Frog = require("../Frog");

		for (const command of CommandManager.commands) {
			if (
				command.name === inputCommand.split(" ")[0] ||
				(
					command.aliases &&
					command.aliases.includes(inputCommand.split(" ")[0])
				)
			) {
				if (command.minArgs !== undefined && command.minArgs > args.length) {
					Logger.info(
						Language.getKey("commands.errors.syntaxError.minArg")
							.replace("%s", command.minArgs)
							.replace("%d", args.length.toString())
					);

					return false;
				}

				if (command.maxArgs !== undefined && command.maxArgs < args.length) {
					Logger.info(
						Language.getKey("commands.errors.syntaxError.maxArg")
							.replace("%s", command.maxArgs)
							.replace("%d", args.length.toString())
					);

					return false;
				}

				command.execute(Frog.asPlayer, Frog, args);

				return true;
			}
		}

		return false;
	},

	/**
	 * Executes a command
	 *
	 * @param {string} command
	 */
	executeCommand(command) {
		const Frog = require("../Frog");
		const args = command?.split(" ")?.slice(1);

		if (this.closed) {
			throw new CommandProcessException("Cannot execute a command when the console is closed");
		}

		let shouldExecuteCommand = true;

		Frog.eventEmitter.emit("serverCommand", {
			args,
			command,
			cancel() {
				shouldExecuteCommand = false;
			},
		});

		if (!shouldExecuteCommand) return;

		try {
			const commandFound = this.findCommand(command, args);

			if (!commandFound) {
				CommandVerifier.throwError(
					{
						sendMessage: (msg) => {
							Logger.info(msg);
						},
					},
					command.split(" ")[0],
				);
			}
		} catch (error) {
			this.handleCommandError(error, command);
		}
	},

	/**
	 * Starts the console.
	 *
	 * @async
	 */
	async start() {
		const commandHandler = readline.createInterface({
			input: process.stdin,
			output: process.stdout
		});

		commandHandler.on("line", (line) => {
			const command = this.removeSlash(line);

			if (this.isEmpty(command)) return;

			this.executeCommand(command);
		});
	}
};
