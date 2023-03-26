const bedrock = require("frog-protocol");

module.exports = {
	async test() {
		console.log("[client] joining...");
		await bedrock.createClient({
			host: "127.0.0.1",
			port: 19132,
			username: "bot",
			offline: true,
			version: "1.19.70",
		});
		console.log("[client] joined");
	},
};