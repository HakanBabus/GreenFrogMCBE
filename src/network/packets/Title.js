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
const Titles = require("./types/Titles");

let title = Titles.TITLE;
let text = "";
let fadeintime = -1;
let staytime = -1;
let fadeouttime = -1;
let xuid = "";
let platform_online_id = "";

class Title extends require("./Packet") {
  /**
   * @returns The name of the packet.
   */
  name() {
    return "set_title";
  }

  /**
   * Sets the title.
   * @param {Title} title1
   */
  setTitle(title1) {
    title = title1;
  }

  /**
   * Sets the text.
   * @param {string} text1
   */
  setText(text1) {
    text = text1;
  }

  /**
   * Sets the fade in time.
   * @param {Number} fadein
   */
  setFadeinTime(fadein) {
    fadeintime = fadein;
  }

  /**
   * Sets the stay time
   * @param {Number} staytime1
   */
  setStaytime(staytime1) {
    staytime = staytime1;
  }

  /**
   * Sets the fadeout time
   * @param {Number} fadeout
   */
  setFadeoutTime(fadeout) {
    fadeouttime = fadeout;
  }

  /**
   * Sets the xuid
   * @param {string} xuid1
   */
  setXuid(xuid1) {
    xuid = xuid1;
  }

  /**
   * Gets the title.
   */
  getTitle() {
    return title;
  }

  /**
   * Gets the text.
   */
  getText() {
    return text;
  }

  /**
   * Gets the fade in time.
   */
  getFadeinTime() {
    return fadeintime;
  }

  /**
   * Gets the stay time.
   */
  getStaytime() {
    return staytime;
  }

  /**
   * Gets the fade out time.
   */
  getFadeout() {
    return fadeouttime;
  }

  /**
   * Gets the xuid.
   */
  getXuid() {
    return xuid;
  }

  /**
   * Gets the platform_online_id.
   */
  getPlatformOnlineId() {
    return platform_online_id;
  }

  send(client) {
    if (this.getTitle() === Titles.CLEAR) this.setText("");
    client.write(this.name(), {
      type: this.getTitle(),
      text: this.getText(),
      fade_in_time: this.getFadeinTime(),
      stay_time: this.getStaytime(),
      fade_out_time: this.getFadeout(),
      xuid: this.getXuid(),
      platform_online_id: this.getPlatformOnlineId(),
    });
  }
}

module.exports = Title;