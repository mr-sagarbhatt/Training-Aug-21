import { iRoom } from "../interfaces";
import { eRoom } from "../enum";

// * Room
class Room implements iRoom {
  constructor(
    public id: number,
    public restaurantId: number,
    public room: eRoom
  ) {
    console.log("Room constructor invoked!");
  }

  getRoom() {
    return {
      id: this.id,
      restaurantId: this.restaurantId,
      room: eRoom[this.restaurantId],
    };
  }
}

export { Room };
