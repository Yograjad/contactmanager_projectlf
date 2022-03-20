// const data = {
// 	email: "",
// 	password: "",
// };

// console.log(Object.entries(data));

// for ([key, value] of Object.entries(data)) {
// 	console.log(key, value);
// }

// Object.assign(data).map((item) => {
// 	console.log("iem", item);
// });

let arr = ["el1", "el2", "el3"];

for (let elKey in arr) {
	console.log("in", elKey);
}

// elValue are the property values
for (let elValue of arr) {
	console.log("of", elValue);
}
