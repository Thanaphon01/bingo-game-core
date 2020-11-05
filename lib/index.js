"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const game_server_1 = require("./game-server");
// let app = new GameBingo()
// export { app }
let app = new game_server_1.GameServer();
exports.app = app;
