"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const env_1 = __importDefault(require("./env"));
const middlewares_1 = require("./middlewares");
const router_1 = __importDefault(require("./router"));
const app = express_1.default();
// view engine setup
app.set('views', path_1.default.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
app.use(middlewares_1.cors());
app.use(router_1.default);
app.listen(env_1.default.port, () => {
    console.log(`server started at http://localhost:${env_1.default.port}`);
});
