/**
 * ░██████╗░██████╗░███████╗███████╗███╗░░██╗███████╗██████╗░░█████╗░░██████╗░
 * ██╔════╝░██╔══██╗██╔════╝██╔════╝████╗░██║██╔════╝██╔══██╗██╔══██╗██╔════╝░
 * ██║░░██╗░██████╔╝█████╗░░█████╗░░██╔██╗██║█████╗░░██████╔╝██║░░██║██║░░██╗░
 * ██║░░╚██╗██╔══██╗██╔══╝░░██╔══╝░░██║╚████║██╔══╝░░██╔══██╗██║░░██║██║░░╚██╗
 * ╚██████╔╝██║░░██║███████╗███████╗██║░╚███║██║░░░░░██║░░██║╚█████╔╝╚██████╔╝
 * ░╚═════╝░╚═╝░░╚═╝╚══════╝╚══════╝╚═╝░░╚══╝╚═╝░░░░░╚═╝░░╚═╝░╚════╝░░╚═════╝░
 *
 *
 * Copyright 2023 andriycraft
 * Github: https://github.com/andriycraft/GreenFrogMCBE
 */
/* eslint-disable no-unused-vars */
const FailedToHandleEvent = require("./exceptions/FailedToHandleEvent");
const Event = require("./Event");
const fs = require("fs");

class PlayerResourcePacksCompletedEvent extends Event {
  constructor() {
    super();
    this.cancelled = false;
    this.name = "PlayerResourcePacksCompletedEvent";
  }

  cancel() {
    this.cancelled = true;
  }

  execute(server, client) {
    fs.readdir("./plugins", (err, plugins) => {
      plugins.forEach((plugin) => {
        try {
          require(`${__dirname}\\..\\..\\..\\plugins\\${plugin}`).PlayerResourcePacksCompletedEvent(
            server,
            client,
            this
          );
        } catch (e) {
          FailedToHandleEvent.handleEventError(e, plugin, this.name);
        }
      });
    });
    this.postExecute(client);
  }

  isCancelled() {
    return this.cancelled;
  }

  postExecute(client) {
    if (this.isCancelled()) client.kick();
  }
}

module.exports = PlayerResourcePacksCompletedEvent;