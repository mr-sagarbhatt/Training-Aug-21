import {
  eGender,
  eRoom,
  eMealPlan,
  eTableStatus,
  eBookingStatus,
} from "./enum";
import { Customer } from "./classes/Customer";
import { Country } from "./classes/Country";
import { Restaurant } from "./classes/Restaurant";
import { Room } from "./classes/Room";

// * Customer
const objCustomer1: Customer = new Customer(
  1,
  "sagar",
  "bhatt",
  eGender.male,
  "bhattsagar112@gmail.com",
  7600608432,
  "Indian"
);
const objCustomer2: Customer = new Customer(
  2,
  "harsh",
  "bhatt",
  eGender.male,
  "bhattharsh19@gmail.com",
  7600608432,
  "Indian"
);

const customer1 = objCustomer1.getCustomer();
const customer2 = objCustomer2.getCustomer();
const arrCustomer = [customer1, customer2];
console.log("List of Customers: ", arrCustomer);

// * Country
const objCountry1: Country = new Country(1, "India");
const objCountry2: Country = new Country(2, "USA");

const country1 = objCountry1.getCountry();
const country2 = objCountry2.getCountry();
const arrCountry = [country1, country2];
console.log("List of Countries: ", arrCountry);

// * Restaurant
const objRestaurant1: Restaurant = new Restaurant(1, "Marutinandan", "RTO", 1);
const objRestaurant2: Restaurant = new Restaurant(
  2,
  "Portobanco",
  "Los Angeles",
  2
);

const restaurant1 = objRestaurant1.getRestaurant();
const restaurant2 = objRestaurant2.getRestaurant();
const arrRestaurant = [restaurant1, restaurant2];
console.log("List of Restaurants: ", arrRestaurant);

// * Room
const objRoom1: Room = new Room(1, 1, eRoom.Meeting);
const objRoom2: Room = new Room(2, 2, eRoom.Casual);

const room1 = objRoom1.getRoom();
const room2 = objRoom2.getRoom();
const arrRoom = [room1, room2];
console.log("List of Rooms: ", arrRoom);
