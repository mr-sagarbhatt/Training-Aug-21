"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Table = void 0;
const enum_1 = require("../enum");
// * Table
class Table {
    constructor(id, roomId, noOfPersons, status) {
        this.id = id;
        this.roomId = roomId;
        this.noOfPersons = noOfPersons;
        this.status = status;
        console.log("Table constructor invoked!");
    }
    getTable() {
        return {
            id: this.id,
            roomId: this.roomId,
            noOfPersons: this.noOfPersons,
            status: enum_1.eTableStatus[this.status],
        };
    }
}
exports.Table = Table;
