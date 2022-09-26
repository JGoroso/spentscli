"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readSpentFile = exports.writeSpentFile = void 0;
const promises_1 = require("fs/promises");
const promises_2 = require("fs/promises");
const _1 = require(".");
const writeSpentFile = (data) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, promises_1.writeFile)(_1.DB_SPENTS, JSON.stringify(data));
    return null;
});
exports.writeSpentFile = writeSpentFile;
const readSpentFile = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const spents = (yield (0, promises_2.readFile)(_1.DB_SPENTS)).toString();
        return spents;
    }
    catch (error) {
        yield (0, exports.writeSpentFile)([]);
        return "[]";
    }
});
exports.readSpentFile = readSpentFile;
