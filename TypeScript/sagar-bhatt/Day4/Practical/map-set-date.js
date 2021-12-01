// * Map:  store data in a key-value pair and remembers the original insertion order
const map = new Map();
map.set("id", 1);
map.set(true, 1);
map.set("", "sagar");
console.log(`map:`, map);
console.log(`map entries:`, map.entries());
console.log(`map keys:`, map.keys());
console.log(`map values:`, map.values());
console.log(`map size:`, map.size);
console.log(`get 1:`, map.get(1));
console.log(`has 1?`, map.has(1));
console.log(map.get(true));
for (let item of map.entries()) {
    console.log(`map entries:`, item, item[0], item[1]);
}
map.delete("");
console.log(`map:`, map);
map.clear();
console.log(`map:`, map);
// * Set: allows us to store distinct data
const set = new Set();
set.add(1);
set.add(2);
set.add("sagar");
set.add(true);
set.add(1);
console.log(`set:`, set);
console.log(`set entries:`, set.entries());
console.log(`set has sagar?:`, set.has("sagar"));
console.log(`set size:`, set.size);
console.log(`set keys:`, set.keys());
console.log(`set values:`, set.values());
for (let item of set.entries()) {
    console.log(item);
}
set.delete(1);
console.log(`set:`, set);
set.clear();
console.log(`set:`, set);
// * Date: Date object represents a date and time functionality in TypeScript
const date1 = new Date();
console.log(date1, date1.getDate(), date1.getDay(), date1.getTime(), date1.getMonth(), date1.toString(), date1.toUTCString(), "\n", date1.toDateString(), date1.toTimeString(), "\n", date1.toLocaleDateString(), date1.toLocaleTimeString());
date1.setDate(11);
date1.setMonth(11);
date1.setFullYear(2011);
date1.setHours(11);
date1.setMinutes(11);
date1.setSeconds(11);
console.log(date1);
