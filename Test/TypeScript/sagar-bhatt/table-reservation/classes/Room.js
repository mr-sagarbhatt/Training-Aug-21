"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Room = void 0;
const enum_1 = require("../enum");
// * Room
class Room {
    constructor(id, restaurantId, room) {
        this.id = id;
        this.restaurantId = restaurantId;
        this.room = room;
        console.log("Room constructor invoked!");
    }
    getRoom() {
        return {
            id: this.id,
            restaurantId: this.restaurantId,
            room: enum_1.eRoom[this.restaurantId],
        };
    }
}
exports.Room = Room;
