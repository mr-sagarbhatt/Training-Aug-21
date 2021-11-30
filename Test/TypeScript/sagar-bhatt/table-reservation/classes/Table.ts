import { iTable } from "../interfaces";
import { eTableStatus } from "../enum";

// * Table
class Table implements iTable {
  constructor(
    public id: number,
    public roomId: number,
    public noOfPersons: number,
    public status: eTableStatus
  ) {
    console.log("Table constructor invoked!");
  }

  getTable() {
    return {
      id: this.id,
      roomId: this.roomId,
      noOfPersons: this.noOfPersons,
      status: eTableStatus[this.status],
    };
  }
}

export { Table };
