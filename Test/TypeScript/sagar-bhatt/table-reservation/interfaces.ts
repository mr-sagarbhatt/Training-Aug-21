import {
  eGender,
  eRoom,
  eMealPlan,
  eTableStatus,
  eBookingStatus,
} from "./enum";

// * Person
interface iPerson {
  id: Number;
  firstName: string;
  lastName: string;
  gender: eGender;
  email: string;
  phone: number;
  nationality: string;
}

// * Customer
interface iCustomer extends iPerson {
  getCustomer?: () => void;
}

// * Employee
// interface iEmployee extends iPerson {
//   restaurantId: number;
//   getEmployee?: () => void;
// }

// * Country
interface iCountry {
  id: number;
  countryName: string;
  getCountry?: () => void;
}

// * Restaurant
interface iRestaurant {
  id: number;
  name: string;
  location: string;
  countryId: number;
  getRestaurant?: () => void;
}

// * Room
interface iRoom {
  id: number;
  restaurantId: number;
  room: eRoom;
  GetRoom?: () => void;
}

// * Table
interface iTable {
  id: number;
  roomId: number;
  type: eMealPlan;
  status: eTableStatus;
  GetDiningTimes?: () => void;
}

// * Booking:
interface iBooking {
  id: number;
  tableId: number;
  customerId: number;
  mealPlan: eMealPlan;
  date: Date;
  fromTime: string;
  toTime: string;
  token: number;
  noOfPersons: number;
  status: eBookingStatus;
  getBookings?: () => void;
}

export {
  iPerson,
  // iEmployee,
  iCustomer,
  iCountry,
  iRestaurant,
  iRoom,
  iTable,
  iBooking,
};
