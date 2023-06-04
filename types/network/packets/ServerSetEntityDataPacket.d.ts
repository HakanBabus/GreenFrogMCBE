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
 * @link Github - https://github.com/andriycraft/GreenFrogMCBE
 * @link Discord - https://discord.gg/UFqrnAbqjP
 */
export = ServerSetEntityDataPacket;
declare class ServerSetEntityDataPacket extends PacketConstructor {
	/**
	 * Sets the field value for the player
	 * @param {string} field
	 * @param {boolean} new_value
	 */
	setValue(field: string, new_value: boolean): void;
	/**
	 * Returns the field value
	 * @returns {JSON}
	 */
	getFieldValue(): JSON;
	/**
	 * Sets properties for the packet
	 * @param {JSON} new_properties
	 */
	setProperties(new_properties: JSON): void;
	/**
	 * Returns the properties of the packet
	 * @returns {JSON}
	 */
	getProperties(): JSON;
	/**
	 * Sets the current tick
	 * @param {number} new_tick
	 */
	setTick(new_tick: number): void;
	/**
	 * Returns the current tick
	 * @returns {number}
	 */
	getTick(): number;
	/**
	 * Sets the runtime_entity_id
	 * @param {string} new_runtime_entity_id
	 */
	setRuntimeEntityID(new_runtime_entity_id: string): void;
	/**
	 * Returns the runtime entity ID of the entity.
	 * @returns {string}
	 */
	getRuntimeEntityID(): string;
	writePacket(client: any): void;
}
import PacketConstructor = require("./PacketConstructor");