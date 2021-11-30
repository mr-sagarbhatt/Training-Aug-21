"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.monthDiff = exports.generateToken = void 0;
// * GENERATE TOKEN
function generateToken() {
    const token = Math.floor(Math.random() * 100000000);
    return token;
}
exports.generateToken = generateToken;
function monthDiff(dateFrom, dateTo) {
    return (dateTo.getMonth() -
        dateFrom.getMonth() +
        12 * (dateTo.getFullYear() - dateFrom.getFullYear()));
}
exports.monthDiff = monthDiff;
